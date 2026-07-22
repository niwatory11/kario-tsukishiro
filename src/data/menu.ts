export type MenuGroup = {
  title: string
  note?: string
  items: { name: string; price: string }[]
}

export const menuGroups: MenuGroup[] = [
  {
    title: '菓子',
    note: '上生菓子は月替わりです。価格はすべて税込です。',
    items: [
      { name: '季節の上生菓子(一個)', price: '486円' },
      { name: '季節の詰合せ 六個入', price: '2,916円' },
      { name: '季節の詰合せ 十二個入', price: '5,616円' },
      { name: '月白最中 五個入', price: '1,350円' },
      { name: '本蕨粉のわらび餅', price: '972円' },
    ],
  },
  {
    title: '喫茶',
    note: '店内のお席は六席のみ。ゆっくりとお過ごしください。',
    items: [
      { name: '上生菓子と抹茶', price: '1,100円' },
      { name: '上生菓子と煎茶', price: '935円' },
      { name: 'わらび餅とほうじ茶', price: '880円' },
    ],
  },
]
