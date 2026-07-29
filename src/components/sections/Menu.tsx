import { menuGroups } from '../../data/menu'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import monaka from '../../assets/monaka.webp'
import warabimochi from '../../assets/warabimochi.webp'
import styles from './Menu.module.css'

/** お品書き: 品書きらしい罫線リスト */
export function Menu() {
  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className={`section ${styles.section}`}
    >
      <div className="container">
        <SectionHeading id="menu-heading" kana="かしときっさ" title="お品書き" />

        <div className={styles.groups}>
          {menuGroups.map((group) => (
            <Reveal key={group.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <dl className={styles.list}>
                {group.items.map((item) => (
                  <div key={item.name} className={styles.row}>
                    <dt className={styles.itemName}>
                      <span>{item.name}</span>
                      <span className={styles.dots} aria-hidden="true" />
                    </dt>
                    <dd className={styles.price}>{item.price}</dd>
                  </div>
                ))}
              </dl>
              {group.note && <p className={styles.note}>{group.note}</p>}
            </Reveal>
          ))}
        </div>

        {/* 価格表の直後に定番二品の実物を見せ、予約導線へつなぐ(写真はAI生成) */}
        <div className={styles.photos}>
          <Reveal as="figure" className={styles.photo}>
            <img
              src={monaka}
              alt="白い最中皮に餡をはさんだ月白最中が、白い長皿に五つ並んでいる"
              loading="lazy"
              width={960}
              height={800}
            />
            <figcaption className={styles.photoCaption}>
              月白最中(イメージ)
            </figcaption>
          </Reveal>
          <Reveal as="figure" delay={0.1} className={styles.photo}>
            <img
              src={warabimochi}
              alt="きなこをたっぷりまぶした本蕨粉のわらび餅を、白い小皿に盛りつけている"
              loading="lazy"
              width={960}
              height={800}
            />
            <figcaption className={styles.photoCaption}>
              本蕨粉のわらび餅(イメージ)
            </figcaption>
          </Reveal>
        </div>

        {/* 価格を見終えた直後に次の一歩を置く(理解の直後のCTA) */}
        <Reveal as="p" className={styles.closing}>
          ご進物用の包装も承ります。お受け取り日が決まりましたら、
          <a href="#reserve">ご予約フォーム</a>へどうぞ。
        </Reveal>
      </div>
    </section>
  )
}
