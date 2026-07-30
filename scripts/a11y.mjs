/**
 * axe-core によるアクセシビリティ自動検査。
 * production build(dist/)を vite preview で配信し、3つの状態を検査する:
 *   1. デスクトップ(1440px)のトップページ全体
 *   2. モバイル(375px)でドロワーを開いた状態
 *   3. 予約フォームを空送信してエラーサマリーが出た状態
 * violation が1件でもあれば exit 1(CIでデプロイを止めるゲート)。
 *
 * 事前に `npm run build` が必要。実行: `npm run test:a11y`
 */
import { existsSync } from 'node:fs'
import { preview } from 'vite'
import { chromium } from 'playwright'
import { AxeBuilder } from '@axe-core/playwright'

const PORT = 4180
const URL = `http://localhost:${PORT}/kario-tsukishiro/`

if (!existsSync(new globalThis.URL('../dist/index.html', import.meta.url).pathname)) {
  console.error('dist/index.html がありません。先に `npm run build` を実行してください。')
  process.exit(1)
}

const server = await preview({ preview: { port: PORT, strictPort: true } })
const browser = await chromium.launch()
const results = []

async function scan(label, setup) {
  const context = await browser.newContext()
  const page = await context.newPage()
  // reduced-motion でスキャンする。リビール前の opacity:0 要素は axe の検査対象から
  // 外れてしまうため、全要素が即時可視になる状態で検査するのが最も網羅的
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await setup(page)
  const { violations } = await new AxeBuilder({ page }).analyze()
  results.push({ label, violations })
  await context.close()
}

try {
  await scan('デスクトップ 1440px', async (page) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL, { waitUntil: 'networkidle' })
  })

  await scan('モバイル 375px + ドロワー開', async (page) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'メニュー' }).click()
    await page.getByRole('dialog').waitFor()
  })

  await scan('予約フォーム エラー表示', async (page) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: '入力内容を確認する' }).click()
    await page.getByRole('alert').waitFor()
  })
} finally {
  await browser.close()
  await new Promise((resolve) => server.httpServer.close(resolve))
}

let total = 0
for (const { label, violations } of results) {
  console.log(`\n■ ${label}: ${violations.length === 0 ? 'OK(violation 0件)' : `violation ${violations.length}件`}`)
  for (const v of violations) {
    total += 1
    console.log(`  [${v.impact}] ${v.id}: ${v.help}`)
    console.log(`    ${v.helpUrl}`)
    for (const node of v.nodes.slice(0, 5)) {
      console.log(`    - ${node.target.join(' ')}`)
    }
  }
}

if (total > 0) {
  console.error(`\naxe: 合計 ${total} 件の violation。上記を修正してください。`)
  process.exit(1)
}
console.log('\naxe: 全状態で violation 0件')
