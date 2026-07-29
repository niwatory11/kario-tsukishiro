# アニメーション強化 実装仕様書(CSS-only)

実装者への作業指示書。**Task 0 から順に実行し、この仕様書に書かれていない変更は一切行わないこと。**
各タスクには完成形のコードを提示している。設計判断は不要。転記と検証のみを行う。

## 目的と設計原則

- ブランド「菓寮 月白」の世界観は**静けさ・余白**。動きは控えめに、視線の順序付けと所作の滑らかさのためだけに使う
- アニメーション対象プロパティは **opacity / translate / scale のみ**(合成レイヤーで完結し、layout/paint を発生させない)
- duration と easing は必ずデザイントークン(`--dur-*`、`--ease-out`)を参照する
- 新規の動きはすべて `prefers-reduced-motion: reduce` で無効化される設計に乗せる

## 禁止事項(全タスク共通)

1. **新規依存の追加禁止**(package.json 変更禁止)
2. **duration・色の生値直書き禁止**(必ず `var(--dur-*)` / 既存カラートークン)
3. **以下のファイルは変更禁止**: `src/components/ui/Reveal.tsx`、`src/hooks/useReveal.ts`、`src/components/layout/MobileDrawer.tsx`、`src/components/sections/Hero.module.css`
   - 特に `Hero.module.css:70` の `0.35s` は animation-delay(振り付け用)であり**トークン化対象外。触らない**
4. `will-change`・`filter`・`box-shadow` のアニメーション・`transition: all` 禁止
5. `src/styles/global.css` への変更は **Task 5 で指定する2行の追加のみ**
6. Reveal コンポーネントへの新 prop 追加や API 拡張の禁止(既存の `delay` prop だけで実現できる)
7. この仕様書に列挙されていないファイルへの変更禁止

---

## Task 0: モーショントークン化

### 0-a. `src/styles/tokens.css` — モーションセクション(現在 L92-94)を以下に置換

```css
  /* ---- モーション ---- */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 0.2s; /* 下線・リンク色・押下の戻り */
  --dur-base: 0.25s; /* ボタンの背景・文字色 */
  --dur-slow: 0.35s; /* 面の遷移(ヘッダー透過・ドロワー開き) */
  --dur-reveal: 0.7s;
```

### 0-b. 既存生値の置換(見た目のregressionゼロ。値は同一のままトークン参照に変える)

| ファイル | 行 | 現在 | 置換後 |
|---|---|---|---|
| `src/components/layout/SiteHeader.module.css` | 7-9 | `0.35s` ×3 | `var(--dur-slow)` |
| `src/components/layout/SiteHeader.module.css` | 80 | `0.2s` | `var(--dur-fast)` |
| `src/components/layout/SiteHeader.module.css` | 109 | `0.25s` | `var(--dur-base)` |
| `src/components/ui/LinkButton.module.css` | 14-16 | `0.25s` ×3 | `var(--dur-base)` |
| `src/components/layout/MobileDrawer.module.css` | 68 | `0.2s` | `var(--dur-fast)` |
| `src/features/reservation/ReservationForm.module.css` | 138 | `0.25s` | `var(--dur-base)` |

**受け入れ条件**: `grep -rn -E '0\.(2|25|35)s' src/` の結果が、`tokens.css` のトークン定義3件と `src/components/sections/Hero.module.css:70`(animation-delay、対象外)のみ。コンポーネント側の生値はゼロ。

---

## Task 1: Collection カード内の二段リビール(画像 → テキスト)

「先に菓子、後に言葉」の順で視線を順序付ける。既存 Reveal API のみ使用。

### `src/components/sections/Collection.tsx` — `<ul>` 内の map を以下の完成形に置換

`Reveal as="li"` をやめて素の `<li>` に戻し、`artWrap` と `body` をそれぞれ Reveal にする(Reveal 自身が `div.artWrap` / `div.body` になるため DOM の深さは不変)。

```tsx
        <ul className={styles.list}>
          {sweets.map((sweet) => (
            <li
              key={sweet.id}
              className={
                sweet.current
                  ? `${styles.item} ${styles.itemCurrent}`
                  : styles.item
              }
            >
              <Reveal className={styles.artWrap}>
                <img
                  src={sweetImages[sweet.id]}
                  alt={sweet.artAlt}
                  loading="lazy"
                  className={styles.art}
                />
              </Reveal>
              <Reveal className={styles.body} delay={0.12}>
                <h3 className={styles.name}>
                  {sweet.name}
                  <span className={styles.reading}>{sweet.reading}</span>
                </h3>
                <div className={styles.textCol}>
                  <p className={styles.meta}>
                    <span className={styles.sekki}>
                      {sweet.seasonLabel} ・ {sweet.sekki}
                    </span>
                    {sweet.current && (
                      <span className={styles.current}>いまの季節</span>
                    )}
                  </p>
                  <p className={styles.desc}>{sweet.description}</p>
                  <p className={styles.price}>{sweet.price}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
```

- img の `src` / `alt` / `loading` / `className` は現状のまま維持すること
- **reduced-motion**: `useReveal` が即可視化+`.reveal` の RM ブロック(既存機構)で自動対応。追加作業なし

**受け入れ条件**: `.item:nth-child(even)` のジグザグ(1024px以上)と `.itemCurrent .art` の拡大が維持されている(li の構造・クラスが不変のため CSS 変更は不要)。

---

## Task 2: Collection 商品画像の hover 微 zoom

商品写真に「近づいて見る」質感を与える。lift や shadow は付けない。

### `src/components/sections/Collection.module.css` — `.art` に transition を追加し、ファイル末尾ではなく `.art` 定義の直後に hover ブロックを追加

```css
.art {
  width: min(100%, 260px);
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: var(--radius);
  transition: scale var(--dur-reveal) var(--ease-out);
}

/* 触れると菓子へゆっくり寄る(タッチ端末・reduced-motion では発火しない) */
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .artWrap:hover .art {
    scale: 1.03;
  }
}
```

- `overflow: hidden` の追加は**不要**(はみ出しは片側約5pxで、`.artWrap` の padding 24px 内に収まる)
- **reduced-motion**: media query 条件で発火自体を止める

---

## Task 3: MobileDrawer 開きアニメーション

現状唯一の「瞬間表示」。夜色のパネルが静かに滑り込むようにする。
**閉じは即時のまま**(`MobileDrawer.tsx:27` で即 unmount するため。tsx の変更はテストを壊すので禁止)。

### `src/components/layout/MobileDrawer.module.css` — `.overlay` / `.backdrop` / `.panel` を以下に変更し、keyframes をファイル末尾に追加

```css
.overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  justify-content: flex-end;
  overflow: hidden; /* パネルのスライド中のはみ出しを閉じ込める */
}
```

`.backdrop` の既存宣言の末尾に1行追加:

```css
  animation: drawerFade var(--dur-slow) var(--ease-out) both;
```

`.panel` の既存宣言の末尾に1行追加:

```css
  animation: drawerSlide var(--dur-slow) var(--ease-out) both;
```

ファイル末尾に追加:

```css
/* 開くときだけアニメーション。閉じは即 unmount のため即時 */
@keyframes drawerFade {
  from {
    opacity: 0;
  }
}

@keyframes drawerSlide {
  from {
    translate: 100% 0;
  }
}
```

- **reduced-motion**: global.css の RM ブロック(animation-duration 0.01ms 強制+Task 5 の delay リセット)で瞬間表示になる

---

## Task 4: SkipLink の transition

フォーカス時に上から滑り込む所作。

### `src/components/layout/SkipLink.module.css` — `.skipLink` の宣言末尾に1行追加

```css
  transition: translate var(--dur-fast) var(--ease-out);
```

- **reduced-motion**: global RM ブロックで即時化(スキップリンクは即時表示が望ましいため好都合)

---

## Task 5: reduced-motion ブロックの既存バグ修正

現状、RM ブロックは `animation-duration` を潰すが **delay を残す**ため、Hero のリード文(`fadeUp 1.2s ... 0.7s both`)が RM 環境で 0.7 秒間不可視のままになる実バグがある。

### `src/styles/global.css` — L109-115 の `*` ブロックに2行追加(**global.css への変更はこの2行のみ**)

```css
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0s !important;
  }
```

- `Hero.module.css` 側の delay 値(0.35s / 0.7s)は通常表示の振り付けなので**変更しない**

---

## Task 6: hover / 押下フィードバックの磨き込み

hover で変化するのに transition が無い箇所の唐突さを解消し、`:active { scale }` の戻りを滑らかにする。
**transition には実際に変化するプロパティのみ列挙**(`transition: all` 禁止)。

### 6-a. `src/components/layout/SiteFooter.module.css` — `.navLink` / `.navLink:hover` を以下に置換

下線の on/off は二値でアニメーションできないため、常時 underline+透明色にして**色だけ**を遷移させる(非 hover 時の見た目は不変)。

```css
.navLink {
  display: inline-flex;
  align-items: center;
  min-height: var(--tap-min);
  font-size: var(--fs-small);
  letter-spacing: 0.1em;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 0.3em;
  transition: text-decoration-color var(--dur-fast) var(--ease-out);
}

.navLink:hover {
  text-decoration-color: currentColor;
}
```

### 6-b. `src/components/sections/Menu.module.css` — `.closing a` の宣言末尾に1行追加

```css
  transition: color var(--dur-fast) var(--ease-out);
```

### 6-c. `src/components/sections/Shop.module.css` — `.note a` の宣言末尾に1行追加

```css
  transition: color var(--dur-fast) var(--ease-out);
```

### 6-d. `:active { scale }` を持つ要素の transition に scale を追加

`src/components/ui/LinkButton.module.css` — `.button` の transition を以下に置換:

```css
  transition:
    background-color var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out),
    color var(--dur-base) var(--ease-out),
    scale var(--dur-fast) var(--ease-out);
```

`src/components/layout/SiteHeader.module.css` — `.reserveButton` の transition を以下に置換:

```css
  transition:
    background-color var(--dur-base) var(--ease-out),
    scale var(--dur-fast) var(--ease-out);
```

同ファイル `.menuButton` の宣言末尾に1行追加:

```css
  transition: scale var(--dur-fast) var(--ease-out);
```

`src/components/layout/MobileDrawer.module.css` — `.close` の宣言末尾に1行追加:

```css
  transition: scale var(--dur-fast) var(--ease-out);
```

`src/features/reservation/ReservationForm.module.css` — `.submit` の transition を以下に置換:

```css
  transition:
    background-color var(--dur-base) var(--ease-out),
    scale var(--dur-fast) var(--ease-out);
```

- **reduced-motion**: すべて global RM ブロックで自動即時化

---

## Task 7: ドキュメント更新

### 7-a. `CLAUDE.md` — 実装規約の「スクロール演出は〜」の行(L36)を以下に置換

```markdown
- スクロール演出は `useReveal` + `.reveal` の「フェード+16px上昇」のみ。hover・押下・ドロワー開閉などのマイクロインタラクションは opacity / translate / scale をモーショントークン(`--dur-fast/base/slow/reveal` + `--ease-out`)で動かす範囲に限定。新しい動きを足すときは reduced-motion での無効化を必ず確認
```

### 7-b. `README.md` — L47 を以下に置換

```markdown
アニメーションライブラリ・CSSフレームワークは使用していません(依存は最小限)。動きはすべて素の CSS(opacity / translate / scale)で実装しています。
```

### 7-c. `docs/design-rationale.md` — L51 の段落を以下に置換

```markdown
没入型演出は「世界観を体感させる」目的がある時だけ価値を持つ、という調査結論に従い、スクロール演出は3種に限定しています: フェードイン(視線の順序付け)、青海波のゆらぎ(水面=世界観)、ヘッダーの透過遷移(夜→昼の追体験)。加えて hover・押下・ドロワー開閉のマイクロインタラクションを opacity / translate / scale のみ・モーショントークン基準で統一しています。すべて `prefers-reduced-motion` で停止します。
```

---

## やらないこと(検討済み・却下)

- Hero の青海波・月の演出増強(drift はサイト内唯一の常時動作。増やすと静けさを壊す)
- CtaBand への追加演出(Reveal 適用済み。夜色の帯は静止でよい)
- parallax / scroll-snap / scroll-driven animation(規約・世界観・互換性の三重の理由で不採用)
- ドロワーの閉じアニメーション(JS 変更が必須になりテスト前提を壊す)
- `will-change`(対象は合成プロパティのみで恩恵がなく、メモリコストだけ増える)

## 機械的受け入れ条件(実装完了の定義)

1. `npm run lint && npm run typecheck && npm run test && npm run build` がすべて成功する
2. `grep -rn -E '0\.(2|25|35)s' src/` が `tokens.css` のトークン定義3件+ `Hero.module.css:70` のみ(コンポーネント側の生値ゼロ)
3. `git diff --name-only` が以下と完全一致する:
   - `CLAUDE.md`
   - `README.md`
   - `docs/design-rationale.md`
   - `src/components/layout/MobileDrawer.module.css`
   - `src/components/layout/SiteFooter.module.css`
   - `src/components/layout/SiteHeader.module.css`
   - `src/components/layout/SkipLink.module.css`
   - `src/components/sections/Collection.module.css`
   - `src/components/sections/Collection.tsx`
   - `src/components/sections/Menu.module.css`
   - `src/components/sections/Shop.module.css`
   - `src/components/ui/LinkButton.module.css`
   - `src/features/reservation/ReservationForm.module.css`
   - `src/styles/global.css`
   - `src/styles/tokens.css`
4. `Reveal.tsx` / `useReveal.ts` / `MobileDrawer.tsx` / `Hero.module.css` が無変更
