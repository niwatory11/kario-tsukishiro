# 菓寮 月白 — AI画像生成プロンプト集

サイトの商品ビジュアル・ヒーロー背景・店舗イメージを AI 画像生成(ChatGPT / DALL-E 系)で
作るためのプロンプト集。英語プロンプトが本体で、内容確認用に日本語訳を併記しています。

## 使い方

1. まず下の「共通スタイル指針」の英文を**毎回プロンプトの先頭に貼る**(世界観のブレを防ぐ)
2. 続けて各項目の English prompt を貼って生成する
3. **同じチャット内で続けて生成する**と画風が揃いやすい
4. 気に入った1枚ができたら、それを参考画像として添付し
   「Match the style, lighting and color palette of the attached image.(添付画像のスタイル・光・配色に合わせて)」を足すとさらに統一される
5. 仕上がりがサイトの色調(下記のパレット)と合っているかを確認してから採用する

### 生成時の注意(このプロジェクトのルール)

- 菓寮 月白は**架空ブランド**。実在の店舗・商品に見える固有の要素(実在の看板・ロゴ・地名表記)が
  写り込んだ画像は使わない
- 採用した画像は「AI生成(生成ツール名)」であることを README に明記する
  (CLAUDE.md「利用条件を確認できる素材だけを使用する」に対応)
- 画像内に**文字を入れない**(文字はサイト側で組む。生成AIの日本語文字は崩れるため)

## 共通スタイル指針(全プロンプト共通の前置き文)

```text
Style guide for all images — "Karyo Tsukishiro", a fictional high-end Japanese
wagashi (traditional confectionery) shop themed around the moon and the 24 solar
terms of the old Japanese calendar:

- Mood: serene, quiet, poetic. Generous negative space. Japanese aesthetics of
  "ma" (emptiness) and understatement.
- Color palette (Japanese traditional colors): pale moonlight white #f3f8fa as
  the base; deep indigo night tones #1c2a38 and #10161f for dark scenes; muted
  azuki bean red #8e4a43 only as a small accent; silver grey #8c99a3 for lines
  and shadows. Low saturation overall — never vivid or colorful.
- Photography look: soft diffused natural light, shallow depth of field,
  high-end product photography for a Japanese confectionery brand.
- Never include: any text, letters, logos, watermarks, human faces,
  recognizable real shops or brands, oversaturated colors.
```

日本語訳(内容):月と二十四節気をテーマにした架空の高級和菓子店「菓寮 月白」の全画像共通の指針。
静謐・余白・控えめな日本的美意識。配色は月白 `#f3f8fa` を基調に、夜の場面は鉄紺 `#1c2a38`・夜空
`#10161f`、小豆色 `#8e4a43` は小さなアクセントのみ、罫線や影に銀鼠 `#8c99a3`。全体に彩度低め。
やわらかい自然光・浅い被写界深度の高級プロダクト写真調。文字・ロゴ・透かし・人の顔・実在店舗や
ブランド・過度な彩度は入れない。

---

## 1. ヒーロー背景(ヘッダー全画面)

現在の実装(`src/components/sections/Hero.tsx`)は「月が昇る直前の夜空」。画面**左に月**、
**右に縦書きの見出し**が重なるため、右側〜中央は暗く静かな空にして文字の可読性を確保する。

### 1-a. デスクトップ用(横長)

**English prompt:**

```text
A full-screen website hero background: a tranquil night sky just before
moonrise, inspired by the Japanese traditional color "geppaku" (moon white).
A softly glowing full moon with a wide misty halo sits in the LEFT third of
the frame, low above a faint horizon. The RIGHT two thirds of the frame are
calm, dark, and empty — a smooth gradient of deep indigo night sky from #10161f
at the top to #1c2a38 at the bottom, with only the subtlest thin clouds.
No stars or only a few very faint ones. No landscape details, no buildings,
no text. Minimal, atmospheric, photographic.
```

**日本語訳:** 月の出直前の静かな夜空のWebヒーロー背景。淡くにじむ暈をまとった満月を画面**左寄り**の
低い位置に置き、**右3分の2**は文字を載せるため何もない静かな空にする。上端 `#10161f` から下端
`#1c2a38` へ滑らかにグラデーションする深い藍の夜空。星はなしかごく淡く。風景・建物・文字なし。

- 推奨サイズ: 1792×1024(DALL-E 3)または 1536×1024(GPT-4o)

### 1-b. モバイル用(縦長)

**English prompt:**

```text
A vertical smartphone-format version of the same scene: a tranquil night sky
just before moonrise. The softly glowing moon with a misty halo sits in the
UPPER third of the frame; the lower two thirds are a calm, empty gradient of
deep indigo (#10161f fading to #1c2a38) where headline text will be placed.
No landscape, no buildings, no text. Minimal, atmospheric, photographic.
```

**日本語訳:** 同じ場面の縦位置版。月は画面**上3分の1**に置き、下3分の2は見出しを載せるための
静かな藍のグラデーション(`#10161f`→`#1c2a38`)。風景・建物・文字なし。

- 推奨サイズ: 1024×1792(DALL-E 3)または 1024×1536(GPT-4o)

---

## 2. 季節の上生菓子(4種・正方形)

`src/data/sweets.ts` の商品説明に対応。4枚とも**同じ舞台設定**で撮ったように見せるため、
以下の共通文を各プロンプトの前に足す。

**共通の舞台設定(菓子4種共通):**

```text
Product photo of a single Japanese jo-namagashi (artisan fresh confection),
centered on a small white porcelain plate, on a pale moon-white background
(#f3f8fa) with soft shadows. Top-front three-quarter angle, shallow depth of
field, soft diffused light from the upper left. Square composition with
generous empty space around the plate.
```

日本語訳: 白磁の小皿にのせた上生菓子1個を中央に、月白 `#f3f8fa` の背景・やわらかい影。
左上からの拡散光、斜め上からの3/4アングル、浅い被写界深度。皿の周りに余白を大きく取った正方形構図。

### 2-a. 花衣(はなごろも)— 春・立春

**English prompt(共通の舞台設定に続けて):**

```text
The confection is "Hanagoromo": a kinton-style wagashi of fine sakura-pink
strands of sweet bean paste, layered like a loosely draping spring robe,
in soft gradations of pale pink (#e8b7c2, #f0c9d3), with a tiny white center
peeking out. It evokes the lightness of a spring morning. Delicate, handmade,
slightly irregular texture.
```

**日本語訳:** 桜色(`#e8b7c2`・`#f0c9d3` 系)のきんとん。ほどけかけた衣のようにそぼろを重ね、
中心に白餡がわずかにのぞく。春の朝の軽さ。手仕事のわずかな不揃い感。

### 2-b. 水面月(みなもづき)— 夏・夏至

**English prompt(共通の舞台設定に続けて):**

```text
The confection is "Minamozuki": a chilled kuzu (arrowroot) jelly sweet,
translucent like still water at night, cool blue-grey tint (#d9e8f0 to
#a9c4d4), with a round white bean-paste "moon" suspended inside, as if the
moon were sunk beneath the water's surface. Faint ripple lines on top.
Glossy, cool, refreshing.
```

**日本語訳:** 夜の水面のように透きとおる葛(青みがかった `#d9e8f0`〜`#a9c4d4`)の中に、
白餡の丸い「月」が沈む冷菓。表面にかすかな波紋。つややかで涼しげ。

### 2-c. 月見兎(つきみうさぎ)— 秋・白露

**English prompt(共通の舞台設定に続けて):**

```text
The confection is "Tsukimi-usagi": a nerikiri wagashi shaped as a small white
rabbit (warm ivory white #f6f2ec), smooth rounded body, with long ears marked
by a delicate branded line and a hint of pink inside one ear, and a tiny dark
red dot for the eye (#8e4a43). Sitting quietly as if watching the harvest
moon. Smooth, matte, hand-formed.
```

**日本語訳:** 薯蕷練切の白兎(温かみのある白 `#f6f2ec`)。丸い胴、焼き印でそっと入れた長い耳
(片耳の内側にほのかな桃色)、小豆色 `#8e4a43` の小さな目。名月を見上げるように静かに座る姿。
なめらかでマットな手仕事の質感。

### 2-d. 初雪(はつゆき)— 冬・冬至

**English prompt(共通の舞台設定に続けて):**

```text
The confection is "Hatsuyuki": a dome of fine snow-white soboro (crumbled
sweet bean paste) piled softly like the first snow of the year settling on a
rooftop, with a single small flake of silver leaf resting on the very top.
Pure white (#f7fafb) with the faintest cool shadows between the crumbs.
Quiet, wintry stillness.
```

**日本語訳:** 初雪が屋根に積もるように、雪白 `#f7fafb` のそぼろ餡を淡くつもらせたドーム。
頂にひとひらの銀箔。そぼろの間にごく淡い冷たい影。年の暮れの静けさ。

---

## 3. お品書きの商品(`src/data/menu.ts` より)

舞台設定は「2. 季節の上生菓子」の共通文を流用する(同じ白磁・月白背景で統一)。

### 3-a. 月白最中(五個入)

**English prompt(共通の舞台設定に続けて。皿は少し大きめの白磁の角皿に変更):**

```text
Five small Japanese monaka wafer sweets arranged in a neat row on a long
white porcelain tray. Each monaka has a crisp pale-beige wafer shell shaped
like a full moon (plain circle, no lettering), filled with dark azuki bean
paste just visible at the seam. Restrained, geometric arrangement with
generous spacing.
```

**日本語訳:** 白磁の長皿に行儀よく並んだ最中5個。満月をかたどった円形の淡いベージュの皮
(文字・刻印なし)、合わせ目から小豆餡がわずかにのぞく。間隔をとった抑制の効いた配置。

### 3-b. 本蕨粉のわらび餅

**English prompt(共通の舞台設定に続けて):**

```text
Japanese warabi-mochi made from real bracken starch: several soft, translucent
amber-grey cubes dusted generously with roasted soybean flour (kinako, muted
warm beige), in a small white porcelain bowl with a tiny wooden pick resting
on the rim. Soft, jiggly, glossy texture under the powder.
```

**日本語訳:** 本蕨粉のわらび餅。半透明で琥珀がかった灰色のやわらかい切り身に、きな粉
(落ち着いたベージュ)をたっぷりまとわせ、白磁の小鉢に。縁に小さな木の菓子楊枝。
粉の下につややかで揺れそうな質感。

---

## 4. 職人のしごと(工程イメージ・4点)

`src/components/sections/Craft.tsx` の四工程「炊く・漉す・包む・かたどる」に対応。
**顔は写さず手元だけ**(共通スタイル指針で顔は除外済み)。4枚の共通舞台:

**共通の舞台設定(工程4点共通):**

```text
Documentary-style photo of a Japanese wagashi artisan's hands at work in a
quiet traditional kitchen before dawn. Only the hands and the work are shown,
no face. Muted, dim ambient light with soft window light, subdued colors
matching a pale indigo-and-white palette. Honest, calm craftsmanship.
```

日本語訳: 夜明け前の静かな厨房で働く和菓子職人の**手元だけ**を写したドキュメンタリー調。
窓からのやわらかい光と控えめな色調(藍と白のパレット)。誠実で静かな手仕事。

### 4-a. 壱・炊く

```text
Hands tending a copper pot of azuki beans simmering gently, wooden paddle in
hand, wisps of steam rising, dark red-brown beans glistening in the pot.
```

**日本語訳:** 銅鍋でことこと炊かれる小豆を木べらで見守る手元。立ちのぼる湯気、鍋の中でつやめく小豆。

### 4-b. 弐・漉す

```text
Hands pressing cooked bean paste through a fine silk sieve into a white bowl,
smooth dark paste emerging silky and uniform.
```

**日本語訳:** 炊きあがった餡を絹漉しで白い鉢へ漉す手元。なめらかに揃って落ちる漉し餡。

### 4-c. 参・包む

```text
Palms gently wrapping a ball of dark bean paste inside soft white nerikiri
dough, the sphere half-closed, showing the delicate pressure of fingertips.
```

**日本語訳:** 白い練切生地で餡玉を包みかける掌。閉じかけの球体に、指先の繊細な力加減がにじむ。

### 4-d. 肆・かたどる

```text
A hand holding a slim wooden wagashi spatula (hera), carving a fine petal
line into a pale pink nerikiri sweet resting on the other palm. Extreme
focus on the tool tip and the confection.
```

**日本語訳:** 掌の上の淡桃色の練切に、木のへら一本で花びらの線を結ぶ手元。へら先と菓子にピントを。

---

## 5. 店舗イメージ(`src/components/sections/Shop.tsx` に対応)

### 5-a. 店構え(谷中の路地奥)

**English prompt:**

```text
A tiny fictional Japanese wagashi shop at dusk, tucked at the end of a narrow
quiet alley in an old Tokyo neighborhood. Small wooden facade, a plain indigo
noren curtain WITHOUT any lettering, warm soft light spilling from a small
window, potted plants by the door. Deep blue evening sky above (#1c2a38).
Nostalgic but tidy. No people, no signs with text, not a real existing shop.
```

**日本語訳:** 夕暮れの路地奥にひっそり佇む小さな架空の和菓子店。木の小さな店構え、
**文字のない**藍の暖簾、小窓からこぼれる暖かい光、戸口の鉢植え。空は鉄紺 `#1c2a38` の宵の色。
人・文字看板なし。実在店舗に見えないこと。

### 5-b. 店内(六席の喫茶)

**English prompt:**

```text
Interior of a tiny Japanese confectionery tearoom with only six seats:
a short wooden counter, low warm lighting, pale plaster walls, a single
alcove with one seasonal flower in a small vase, a cup of matcha and a
wagashi on a tray. Serene, spare, immaculate. No people, no text.
```

**日本語訳:** 六席だけの小さな喫茶の店内。短い木のカウンター、低く暖かい照明、淡い漆喰の壁、
床の間にひと枝の季節の花、盆に抹茶と上生菓子。静謐・簡素・清潔。人・文字なし。

---

## 6. 推奨出力仕様と保存先

| 用途 | 生成サイズ | 表示サイズの目安 | 形式 |
| --- | --- | --- | --- |
| 上生菓子・最中・わらび餅 | 1024×1024(1:1) | 260〜320px 四方(Collection) | WebP に変換して使用 |
| ヒーロー(デスクトップ) | 1792×1024 / 1536×1024 | 全画面(100svh) | WebP(80%程度) |
| ヒーロー(モバイル) | 1024×1792 / 1024×1536 | 全画面縦 | WebP(80%程度) |
| 工程・店舗イメージ | 1024×1024 または横長 | セクション内カード | WebP |

- 保存先は `src/assets/`(組み込み時に Vite が `/kario-tsukishiro/` ベースパスへ解決する)
- 菓子4種の `alt` は `src/data/sweets.ts` の `artAlt` をそのまま流用できる
- **組み込みは別タスク**: `WagashiArt` / `Hero` の置き換え時に、CLAUDE.md・README の
  「現状はすべて自作SVG/CSS」の記述更新と、README への「画像はAI生成」の明記もあわせて行うこと
