import { koyomiCopy, seasonNames, sekkiList } from '../../data/koyomi'
import { Reveal } from '../../components/ui/Reveal'
import {
  getMoonLitPath,
  getMoonName,
  getSekkiIndex,
  getTonightMoonAge,
} from './koyomi'
import styles from './TodayKoyomi.module.css'

type TodayKoyomiProps = {
  /** 暦を引く日(店頭の「今日」) */
  today: Date
}

const pad = (value: number) => String(value).padStart(2, '0')

/**
 * 今日の暦: いまの節気と今宵の月を、日付から求めて見せる。
 * 下の目盛りは一年(二十四節気)のうちの現在地で、装飾として読み上げから外し、
 * 同じ内容を文字(何番目の節気か)で持つ。
 */
export function TodayKoyomi({ today }: TodayKoyomiProps) {
  const index = getSekkiIndex(today)
  const sekki = sekkiList[index]
  const moonAge = getTonightMoonAge(today)
  const month = today.getMonth() + 1
  const day = today.getDate()
  const isoDate = `${today.getFullYear()}-${pad(month)}-${pad(day)}`

  return (
    <Reveal className={styles.koyomi}>
      <div className={styles.head}>
        <p className={styles.title}>{koyomiCopy.title}</p>
        <p className={styles.date}>
          <time dateTime={isoDate}>
            {month}月{day}日
          </time>
        </p>
      </div>

      <div className={styles.now}>
        {/* 夜の小窓に、今宵の月のかたち */}
        <svg className={styles.moon} viewBox="0 0 56 56" aria-hidden="true" focusable="false">
          <rect className={styles.moonSky} width="56" height="56" rx="2" />
          <circle className={styles.moonShade} cx="28" cy="28" r="18" />
          <path className={styles.moonLit} d={getMoonLitPath(moonAge, 28, 18)} />
        </svg>

        <div className={styles.nowText}>
          <p className={styles.sekki}>
            <span className={styles.sekkiName}>{sekki.name}</span>
            <span className={styles.sekkiReading}>{sekki.reading}</span>
            <span className={styles.sekkiSince}>
              {sekki.month}月{sekki.day}日{koyomiCopy.sekkiSince}
            </span>
          </p>
          <p className={styles.moonText}>
            {koyomiCopy.tonight}
            <strong className={styles.moonName}>{getMoonName(moonAge)}</strong>
            <span className={styles.moonAge}>
              {koyomiCopy.moonAge} {koyomiCopy.about}
              {Math.round(moonAge) % 30}
            </span>
          </p>
        </div>
      </div>

      <p className="visually-hidden">
        {koyomiCopy.position.replace('{n}', String(index + 1))}
      </p>
      <ol className={styles.ruler} aria-hidden="true">
        {sekkiList.map((item, itemIndex) => (
          <li
            key={item.name}
            className={styles.tick}
            data-current={itemIndex === index || undefined}
            data-season-start={itemIndex % 6 === 0 || undefined}
          >
            {itemIndex === index && (
              <span
                className={
                  itemIndex > 19
                    ? `${styles.tickLabel} ${styles.tickLabelEnd}`
                    : styles.tickLabel
                }
              >
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
      <ol className={styles.seasons} aria-hidden="true">
        {seasonNames.map((name, seasonIndex) => (
          <li
            key={name}
            data-current={Math.floor(index / 6) === seasonIndex || undefined}
          >
            {name}
          </li>
        ))}
      </ol>

      <p className={styles.note}>{koyomiCopy.note}</p>
    </Reveal>
  )
}
