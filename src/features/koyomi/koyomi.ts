import type { SweetSeason } from '../../data/sweets'
import { sekkiList } from '../../data/koyomi'

/**
 * 今日の暦: 二十四節気と月の満ち欠けを、日付から求める。
 * どちらも店頭の「いまの菓子」を決める目安で、天文計算の正確さは求めない。
 * - 節気は年によって一日ほど前後するので、毎年ほぼ同じになる日付を「ごろ」として持つ
 * - 月齢は朔望月の平均の長さだけで数える(実際の月とは半日ほどずれることがある)
 */

/** 朔望月(新月から次の新月まで)の平均の長さ(日) */
export const SYNODIC_MONTH = 29.530588853

/** 基準にする新月: 2000年1月6日 18:14 (UTC) */
const REFERENCE_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14)

const DAY_MS = 86_400_000

/** その日の節気が、一覧(立春はじまり)の何番目か */
export function getSekkiIndex(date: Date): number {
  const today = (date.getMonth() + 1) * 100 + date.getDate()
  // 一年のうち、はじまりの日が今日以前でいちばん遅い節気を探す
  let found = -1
  let latest = -1
  sekkiList.forEach((sekki, index) => {
    const start = sekki.month * 100 + sekki.day
    if (start <= today && start > latest) {
      latest = start
      found = index
    }
  })
  // 元日から小寒の前までは、前の年の冬至がつづいている
  if (found === -1) {
    return sekkiList.findIndex((sekki) => sekki.name === '冬至')
  }
  return found
}

/** 節気の並びは立春はじまりで、六つごとに春・夏・秋・冬 */
const seasonOrder: SweetSeason[] = ['spring', 'summer', 'autumn', 'winter']

export function getSeason(date: Date): SweetSeason {
  return seasonOrder[Math.floor(getSekkiIndex(date) / 6)]
}

/** いまの季節を先頭にした、季節の並び(冬なら 冬→春→夏→秋) */
export function seasonsFrom(season: SweetSeason): SweetSeason[] {
  const start = seasonOrder.indexOf(season)
  return seasonOrder.map((_, index) => seasonOrder[(start + index) % 4])
}

/** 月齢(新月からの日数)。0 以上、朔望月の長さ未満 */
export function getMoonAge(date: Date): number {
  const days = (date.getTime() - REFERENCE_NEW_MOON) / DAY_MS
  return ((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH
}

/** 「今宵」の月齢: その日の夜九時で数える */
export function getTonightMoonAge(date: Date): number {
  return getMoonAge(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 21),
  )
}

/** 月の名。平均の月齢で数えているので、一日ずれても名が変わりにくい幅で区切る */
const moonNames: { until: number; name: string }[] = [
  { until: 1.2, name: '新月' },
  { until: 3.6, name: '三日月' },
  { until: 6.2, name: '夕月' },
  { until: 8.6, name: '上弦の月' },
  { until: 11.6, name: '十日夜の月' },
  { until: 13.6, name: '十三夜' },
  { until: 15.6, name: '満月' },
  { until: 17.0, name: '十六夜' },
  { until: 19.6, name: '居待月' },
  { until: 21.3, name: '更待月' },
  { until: 23.6, name: '下弦の月' },
  { until: 27.8, name: '有明の月' },
  { until: SYNODIC_MONTH, name: '新月' },
]

export function getMoonName(age: number): string {
  return (moonNames.find((entry) => age < entry.until) ?? moonNames[0]).name
}

/** 月の、光って見える部分の割合(0=新月、1=満月) */
export function getMoonIllumination(age: number): number {
  return (1 - Math.cos((2 * Math.PI * age) / SYNODIC_MONTH)) / 2
}

/**
 * 月の光っている部分の輪郭(SVGのパス)。中心 (c, c)、半径 r の円の中に描く。
 * 外側は月の縁の半円、内側は明暗の境(半径が cos で伸び縮みする楕円の弧)。
 * 満ちていく月は右が光り、欠けていく月は左が光る(北半球での見え方)。
 */
export function getMoonLitPath(age: number, c: number, r: number): string {
  const angle = (2 * Math.PI * age) / SYNODIC_MONTH
  const waxing = age < SYNODIC_MONTH / 2
  const gibbous = Math.cos(angle) < 0
  const rx = (r * Math.abs(Math.cos(angle))).toFixed(2)
  const outerSweep = waxing ? 1 : 0
  const innerSweep = (waxing ? gibbous : !gibbous) ? 1 : 0
  return [
    `M${c} ${c - r}`,
    `A${r} ${r} 0 0 ${outerSweep} ${c} ${c + r}`,
    `A${rx} ${r} 0 0 ${innerSweep} ${c} ${c - r}Z`,
  ].join('')
}
