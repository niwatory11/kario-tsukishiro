import { useState } from 'react'
import type { Sweet, SweetSeason } from '../../data/sweets'
import { collectionLede, currentLabel, sweets } from '../../data/sweets'
import { TodayKoyomi } from '../../features/koyomi/TodayKoyomi'
import { getSeason, seasonsFrom } from '../../features/koyomi/koyomi'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import sweetSpring from '../../assets/sweet-spring.webp'
import sweetSpring480 from '../../assets/sweet-spring-480.webp'
import sweetSpring320 from '../../assets/sweet-spring-320.webp'
import sweetSummer from '../../assets/sweet-summer.webp'
import sweetSummer480 from '../../assets/sweet-summer-480.webp'
import sweetSummer320 from '../../assets/sweet-summer-320.webp'
import sweetAutumn from '../../assets/sweet-autumn.webp'
import sweetAutumn480 from '../../assets/sweet-autumn-480.webp'
import sweetAutumn320 from '../../assets/sweet-autumn-320.webp'
import sweetWinter from '../../assets/sweet-winter.webp'
import sweetWinter480 from '../../assets/sweet-winter-480.webp'
import sweetWinter320 from '../../assets/sweet-winter-320.webp'
import styles from './Collection.module.css'

/* 商品写真はAI生成(プロンプト: docs/image-prompts.md)。
   原寸720pxに加え320/480pxを用意し、表示幅に見合う一枚だけを読み込ませる */
const sweetImages: Record<SweetSeason, { src: string; srcSet: string }> = {
  spring: {
    src: sweetSpring,
    srcSet: `${sweetSpring320} 320w, ${sweetSpring480} 480w, ${sweetSpring} 720w`,
  },
  summer: {
    src: sweetSummer,
    srcSet: `${sweetSummer320} 320w, ${sweetSummer480} 480w, ${sweetSummer} 720w`,
  },
  autumn: {
    src: sweetAutumn,
    srcSet: `${sweetAutumn320} 320w, ${sweetAutumn480} 480w, ${sweetAutumn} 720w`,
  },
  winter: {
    src: sweetWinter,
    srcSet: `${sweetWinter320} 320w, ${sweetWinter480} 480w, ${sweetWinter} 720w`,
  },
}

/* 表示幅: いまの季節の菓子は1024px以上で約600px、ほかの三つは約330px(3列)。
   それ未満は画面幅いっぱい(containerの左右余白を引いた幅)。720pxの原寸を上限に選ばせる */
const sizesFeatured = '(min-width: 1024px) 600px, (min-width: 768px) 45vw, calc(100vw - 2.5rem)'
const sizesOther = '(min-width: 1024px) 330px, (min-width: 768px) 30vw, calc(100vw - 2.5rem)'

function SweetPhoto({ sweet, sizes }: { sweet: Sweet; sizes: string }) {
  return (
    <Reveal className={styles.artWrap}>
      <img
        src={sweetImages[sweet.id].src}
        srcSet={sweetImages[sweet.id].srcSet}
        sizes={sizes}
        alt={sweet.artAlt}
        width={720}
        height={720}
        loading="lazy"
        decoding="async"
        className={styles.art}
      />
    </Reveal>
  )
}

/** 菓銘(縦書き)と、節気・説明・価格 */
function SweetBody({
  sweet,
  delay = 0.12,
  isCurrent = false,
}: {
  sweet: Sweet
  delay?: number
  isCurrent?: boolean
}) {
  return (
    <Reveal className={styles.body} delay={delay}>
      <h3 className={styles.name}>
        {sweet.name}
        <span className={styles.reading}>{sweet.reading}</span>
      </h3>
      <div className={styles.textCol}>
        <p className={styles.meta}>
          <span className={styles.sekki}>
            {sweet.seasonLabel} ・ {sweet.sekki}
          </span>
          {isCurrent && <span className={styles.current}>{currentLabel}</span>}
        </p>
        <p className={styles.desc}>{sweet.description}</p>
        <p className={styles.price}>{sweet.price}</p>
      </div>
    </Reveal>
  )
}

type CollectionProps = {
  /** 暦を引く日。省くと、開いた日の日付になる(テストでは日付を固定して渡す) */
  today?: Date
}

/**
 * 季節の上生菓子(サービス内容の中核)。
 * 今日の暦からいまの季節を求め、その季節の一品を大きな写真で主役に据える。
 * 残りの三季は、これから巡ってくる順に、写真つきの三列で並べる。
 * 写真は皿の余白が広いので、4:5 に切り出して少し寄り、菓子そのものを大きく見せる。
 */
export function Collection({ today }: CollectionProps) {
  // 開いているあいだに日付が変わっても、主役の菓子が途中で入れ替わらないようにする
  const [now] = useState(() => today ?? new Date())
  const ordered = seasonsFrom(getSeason(now))
    .map((season) => sweets.find((sweet) => sweet.id === season))
    .filter((sweet): sweet is Sweet => sweet !== undefined)
  const [featured, ...others] = ordered

  return (
    <section
      id="collection"
      aria-labelledby="collection-heading"
      className={`section ${styles.section}`}
    >
      <div className="container">
        <SectionHeading
          id="collection-heading"
          kana="はる なつ あき ふゆ"
          title="季節の菓子"
        />
        <p className={styles.lede}>{collectionLede}</p>

        <TodayKoyomi today={now} />

        {featured && (
          <article className={styles.featured}>
            <SweetPhoto sweet={featured} sizes={sizesFeatured} />
            <SweetBody sweet={featured} isCurrent />
          </article>
        )}

        <ul className={styles.list}>
          {others.map((sweet, index) => (
            <li key={sweet.id} className={styles.item}>
              <SweetPhoto sweet={sweet} sizes={sizesOther} />
              <SweetBody sweet={sweet} delay={0.08 + index * 0.08} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
