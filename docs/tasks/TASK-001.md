# TASK-001: CSS-onlyアニメーション強化(docs/animation-spec.md の実装)

## Context

架空の和菓子ブランド「菓寮 月白」の単体商業サイト(React 19 + TypeScript + Vite + CSS Modules)。
現状のモーションは `useReveal` + `.reveal`(フェード+16px上昇)と Hero の keyframes 3種のみ。
アニメーションライブラリは不使用で、これはセールスポイントとして維持する。

**詳細な実装内容・完成形コードはすべて `docs/animation-spec.md` にある。まずそれを読み、Task 0 から順に実装すること。本ファイルは契約(変更可能ファイル・受け入れ条件・テスト)を定める。**

## Objective

`docs/animation-spec.md` の Task 0〜7 を仕様どおりに実装する:

- Task 0: モーショントークン化(`--dur-fast/base/slow` 追加+生値8箇所置換)
- Task 1: Collection カード内の二段リビール(画像→テキスト)
- Task 2: Collection 商品画像の hover 微 zoom
- Task 3: MobileDrawer 開きアニメーション(CSS のみ、閉じは即時のまま)
- Task 4: SkipLink の transition
- Task 5: reduced-motion ブロックのバグ修正(delay リセット2行)
- Task 6: hover / 押下フィードバックの磨き込み
- Task 7: ドキュメント更新(CLAUDE.md / README.md / docs/design-rationale.md)

## Current behavior

- Collection のカードは `Reveal as="li"` でカード全体が一括フェードイン。hover エフェクトなし
- MobileDrawer は開閉とも瞬間表示
- SkipLink はフォーカス時に瞬間移動
- reduced-motion 環境で Hero のリード文が 0.7 秒不可視(animation-delay が潰されないバグ)
- CSS Modules 内の transition duration は生値直書き(0.2s / 0.25s / 0.35s)

## Existing behavior to preserve

- **仕様書に書かれていない変更は一切禁止**(ユーザー指示)
- `npm run test` の全テストが変更なしで通ること(テストファイルの変更禁止)
- Collection: li の構造・`item`/`itemCurrent` クラス・img の src/alt/loading、1024px 以上のジグザグ(`nth-child(even)`)と縦書き菓銘
- MobileDrawer: 閉じるときは即時 unmount(閉じアニメーションを実装しない)
- Hero の演出(bgFade / fadeUp / drift)と delay 値は現状のまま
- 非 hover 時・reduced-motion 時の見た目は現状と同一(Task 0 の置換は値が同一のためregressionゼロ)
- 新規依存の追加禁止(package.json 変更禁止)

## Detailed implementation requirements

`docs/animation-spec.md` の Task 0〜7 を、記載された完成形コードのとおりに実装する。
同ファイルの「禁止事項(全タスク共通)」8項目に必ず従う。設計判断はしない。

## Allowed files (Codex が変更してよいファイル — これがすべて)

- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/components/sections/Collection.tsx`
- `src/components/sections/Collection.module.css`
- `src/components/sections/Menu.module.css`
- `src/components/sections/Shop.module.css`
- `src/components/layout/MobileDrawer.module.css`
- `src/components/layout/SiteHeader.module.css`
- `src/components/layout/SiteFooter.module.css`
- `src/components/layout/SkipLink.module.css`
- `src/components/ui/LinkButton.module.css`
- `src/features/reservation/ReservationForm.module.css`
- `CLAUDE.md`
- `README.md`
- `docs/design-rationale.md`

## Restricted files (変更禁止)

- `src/components/ui/Reveal.tsx`、`src/hooks/useReveal.ts`(既存 API のみ使用。新 prop 追加禁止)
- `src/components/layout/MobileDrawer.tsx`(変更するとテストが壊れる)
- `src/components/sections/Hero.module.css`(L70 の `0.35s` は animation-delay。トークン化対象外)
- `src/**/*.test.tsx`、`src/**/*.test.ts`(テストの変更・追加禁止)
- `package.json`、`package-lock.json`
- 上記 Allowed files に列挙されていないすべてのファイル

## Acceptance criteria

1. `docs/animation-spec.md` の「機械的受け入れ条件」4項目をすべて満たす
2. `grep -rn -E '0\.(2|25|35)s' src/` が `src/components/sections/Hero.module.css:70` の1件のみ
3. `git diff --name-only` が Allowed files のリストと一致する(全ファイル変更が必要)
4. アニメーション対象プロパティが opacity / translate / scale のみ(`will-change` / `filter` / `transition: all` の新規出現なし)

## Required tests

新規テストの追加は不要。既存テストがすべて通ること:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Risks

- Collection.tsx の DOM 変更で `App.test.tsx` が落ちる可能性 → 仕様書の完成形 TSX をそのまま使えば li 構造・alt は不変なので通る
- global.css の `transition-delay: 0s !important` が `.reveal` のスタガーと干渉する懸念 → RM 時は `.reveal` が `transition: none` のため実害なし(仕様書 Task 5 参照)
- keyframes 名(drawerFade / drawerSlide)は CSS Modules によりスコープされるため衝突しない
