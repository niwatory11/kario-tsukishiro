import type { SweetSeason } from '../../data/sweets'
import { sweets } from '../../data/sweets'
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

/* 実測の表示幅。通常の菓子は常に260px、いまの季節の菓子だけ
   480px未満で「画面幅 − containerとartWrapの左右余白」、以上で320px */
const sizesDefault = '260px'
const sizesCurrent = '(min-width: 480px) 320px, calc(100vw - 5.5rem)'

/** 季節の上生菓子(サービス内容の中核) */
export function Collection() {
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
        <p className={styles.lede}>
          店先に並ぶのは、その節気の菓子ひとそろいだけ。
          春夏秋冬から、それぞれの代表銘をご紹介します。
        </p>

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
                  src={sweetImages[sweet.id].src}
                  srcSet={sweetImages[sweet.id].srcSet}
                  sizes={sweet.current ? sizesCurrent : sizesDefault}
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
      </div>
    </section>
  )
}
