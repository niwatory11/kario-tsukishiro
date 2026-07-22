import { sweets } from '../../data/sweets'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { WagashiArt } from '../ui/WagashiArt'
import styles from './Collection.module.css'

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
            <Reveal
              as="li"
              key={sweet.id}
              className={
                sweet.current
                  ? `${styles.item} ${styles.itemCurrent}`
                  : styles.item
              }
            >
              <div className={styles.artWrap}>
                <WagashiArt
                  variant={sweet.id}
                  label={sweet.artAlt}
                  className={styles.art}
                />
              </div>
              <div className={styles.body}>
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
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
