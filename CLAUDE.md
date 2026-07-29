# 菓寮 月白 — プロジェクトルール

架空の和菓子ブランド「菓寮 月白(かりょう つきしろ)」の単体商業Webサイト。
フロントエンド制作実績(Concept Project)としてGitHub・ライブデモで公開する。

## 成果物の定義

- 最終成果物は**単体の商業Webサイト**である
- Instagram分析サイト・ダッシュボード・スクレイピング管理画面は作らない
- 特定の実在サイトのコピーをしない
- ReelsやSNSの画像・動画・スクリーンショットを転載しない
- 利用条件を確認できる素材だけを使用する(自作SVG/CSSとAI生成画像。生成画像である旨はREADMEに明記し、プロンプトは `docs/image-prompts.md` に置く)

## 品質基準

- レスポンシブ必須。360 / 375 / 768 / 1024 / 1440px で横スクロールが出ないこと
- アクセシビリティ必須(セマンティックHTML、キーボード操作、フォーカス表示、alt、`prefers-reduced-motion`)
- TypeScriptエラーを残さない(`npm run typecheck`)
- `npm run lint` と `npm run build` を通す
- 変更後は必ずブラウザ表示を確認する(`.claude/skills/visual-quality-review` 参照)
- 作業を計画だけで終了しない

## コンテンツのルール

- 架空ブランドである旨をヒーロー・フッター・READMEに明記し続ける
- 実在しない受賞歴・顧客数・売上・口コミ・導入実績を事実のように書かない
- Lorem ipsum等の仮テキストを置かない
- 秘密情報・Cookie・個人情報・Instagramの生データをコミットしない(`research/` は .gitignore 済み)

## 実装規約

- デザイントークンは `src/styles/tokens.css` が単一情報源。色値の直書き禁止(自作SVGイラスト内のみ例外)
- 角丸は `--radius`(2px)以外使わない(円形の意匠・SVG内は例外)
- ブレークポイントは 480 / 768 / 1024 / 1280px の生値をモバイルファースト(`min-width`)で統一
- 共通レイアウトは `global.css` の `.container` / `.section`、装飾はCSS Modules側に書く
- スクロール演出は `useReveal` + `.reveal` の「フェード+16px上昇」のみ。新しい動きを足すときは reduced-motion での無効化を必ず確認
- コピー(文言・価格)は `src/data/` に置き、コンポーネントに直書きしない

## コマンド

```bash
npm run dev        # 開発サーバー
npm run lint       # oxlint
npm run typecheck  # tsc -b
npm run test       # vitest
npm run build      # 型チェック + production build
npm run preview    # buildの確認
```

## 禁止事項

- `git push`・公開デプロイ・外部サービスへの送信は、ユーザーの明示的な許可なしに行わない
