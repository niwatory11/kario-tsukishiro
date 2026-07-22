import { menuGroups } from '../../data/menu'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
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
      </div>
    </section>
  )
}
