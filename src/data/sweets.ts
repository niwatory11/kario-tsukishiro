export type SweetSeason = 'spring' | 'summer' | 'autumn' | 'winter'

export type Sweet = {
  id: SweetSeason
  /** 菓銘(縦書きで表示) */
  name: string
  reading: string
  /** 対応する節気 */
  sekki: string
  seasonLabel: string
  description: string
  /** 商品写真の代替テキスト */
  artAlt: string
  price: string
  /** いま提供中の菓子か */
  current?: boolean
}

export const sweets: Sweet[] = [
  {
    id: 'spring',
    name: '花衣',
    reading: 'はなごろも',
    sekki: '立春',
    seasonLabel: '春',
    description:
      '桜色のきんとんを、ほどけかけた衣に見立てて。中は白餡に刻んだ道明寺を合わせ、春の朝の軽さを写します。',
    artAlt: '白磁の皿にのせた、桜色のきんとんの上生菓子',
    price: '486円(税込)',
  },
  {
    id: 'summer',
    name: '水面月',
    reading: 'みなもづき',
    sekki: '夏至',
    seasonLabel: '夏',
    description:
      '葛の透きとおる生地に白餡の月を沈めて。冷やしてお召し上がりいただくと、夜の水面をすくったような涼が立ちます。',
    artAlt: '透きとおる葛のなかに白餡の月が沈む上生菓子',
    price: '540円(税込)',
    current: true,
  },
  {
    id: 'autumn',
    name: '月見兎',
    reading: 'つきみうさぎ',
    sekki: '白露',
    seasonLabel: '秋',
    description:
      '薯蕷練切の白い兎に、焼き印でそっと耳を。こし餡は名月の夜にあわせて、やや濃いめに炊き上げます。',
    artAlt: '白い兎をかたどった練切の上生菓子',
    price: '486円(税込)',
  },
  {
    id: 'winter',
    name: '初雪',
    reading: 'はつゆき',
    sekki: '冬至',
    seasonLabel: '冬',
    description:
      'そぼろ状の白餡を淡くつもらせ、頂にひとひらの銀箔を。年の暮れ、最初の雪が屋根にとどまる静けさを象ります。',
    artAlt: '白いそぼろ餡を雪のようにつもらせ、頂に銀箔をのせた上生菓子',
    price: '486円(税込)',
  },
]
