/** 二十四節気。立春はじまりで、六つごとに春・夏・秋・冬 */
export type Sekki = {
  name: string
  reading: string
  /** はじまりの日(年によって一日ほど前後するので、表示では「ごろ」を付ける) */
  month: number
  day: number
}

export const sekkiList: Sekki[] = [
  { name: '立春', reading: 'りっしゅん', month: 2, day: 4 },
  { name: '雨水', reading: 'うすい', month: 2, day: 19 },
  { name: '啓蟄', reading: 'けいちつ', month: 3, day: 5 },
  { name: '春分', reading: 'しゅんぶん', month: 3, day: 20 },
  { name: '清明', reading: 'せいめい', month: 4, day: 5 },
  { name: '穀雨', reading: 'こくう', month: 4, day: 20 },
  { name: '立夏', reading: 'りっか', month: 5, day: 5 },
  { name: '小満', reading: 'しょうまん', month: 5, day: 21 },
  { name: '芒種', reading: 'ぼうしゅ', month: 6, day: 6 },
  { name: '夏至', reading: 'げし', month: 6, day: 21 },
  { name: '小暑', reading: 'しょうしょ', month: 7, day: 7 },
  { name: '大暑', reading: 'たいしょ', month: 7, day: 23 },
  { name: '立秋', reading: 'りっしゅう', month: 8, day: 7 },
  { name: '処暑', reading: 'しょしょ', month: 8, day: 23 },
  { name: '白露', reading: 'はくろ', month: 9, day: 8 },
  { name: '秋分', reading: 'しゅうぶん', month: 9, day: 23 },
  { name: '寒露', reading: 'かんろ', month: 10, day: 8 },
  { name: '霜降', reading: 'そうこう', month: 10, day: 23 },
  { name: '立冬', reading: 'りっとう', month: 11, day: 7 },
  { name: '小雪', reading: 'しょうせつ', month: 11, day: 22 },
  { name: '大雪', reading: 'たいせつ', month: 12, day: 7 },
  { name: '冬至', reading: 'とうじ', month: 12, day: 22 },
  { name: '小寒', reading: 'しょうかん', month: 1, day: 5 },
  { name: '大寒', reading: 'だいかん', month: 1, day: 20 },
]

export const seasonNames = ['春', '夏', '秋', '冬'] as const

/** 「今日の暦」の文言 */
export const koyomiCopy = {
  title: '今日の暦',
  sekkiSince: 'ごろから',
  tonight: '今宵は',
  moonAge: '月齢',
  about: 'およそ',
  /** 節気と月齢はどちらも目安であることの注記 */
  note: '節気の日付と月齢は目安です。年や場所によって一日ほど前後します。',
  /** 節気の目盛り(装飾)の代わりに読み上げる文。{n} に何番目かが入る */
  position: '二十四節気の{n}番目',
}
