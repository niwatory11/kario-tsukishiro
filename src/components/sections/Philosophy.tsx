import { aboutIntro, aboutValues, colorSwatch } from '../../data/about'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Philosophy.module.css'

/**
 * 屋号の色の見本帳。夜の地の上に、月白の色の札が月のように浮かぶ。
 * 色はサイトの地色そのもの(--c-geppaku)で、屋号とデザインが同じ色だと見せる。
 */
function ColorSwatch() {
  return (
    <Reveal delay={0.15} className={styles.swatchWrap}>
      <figure className={styles.swatch}>
        <div className={styles.chip}>
          <p className={styles.chipName} aria-hidden="true">
            {colorSwatch.name}
          </p>
        </div>
        <figcaption className={styles.swatchCaption}>
          <span className={styles.swatchTitle}>
            {colorSwatch.name}
            <span className={styles.swatchReading}>{colorSwatch.reading}</span>
            <span className={styles.swatchKind}>{colorSwatch.kind}</span>
          </span>
          <span className={styles.swatchDesc}>{colorSwatch.description}</span>
          <span className={styles.swatchCode}>
            {colorSwatch.siteNote}
            <span className={styles.code}>{colorSwatch.code}</span>
          </span>
        </figcaption>
      </figure>
    </Reveal>
  )
}

/** ブランド紹介: 夜空が月白へ白んでいく遷移を挟む */
export function Philosophy() {
  return (
    <section id="about" aria-labelledby="about-heading" className={styles.section}>
      <div className={styles.night}>
        <div className={`container ${styles.nightInner}`}>
          <div className={styles.introCol}>
            <SectionHeading
              id="about-heading"
              kana="やごうのこと"
              title="月白について"
              onNight
            />
            <Reveal>
              {aboutIntro.map((paragraph) => (
                <p key={paragraph.slice(0, 10)} className={styles.intro}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
          <ColorSwatch />
        </div>
      </div>

      {/* 夜空が白む遷移帯 */}
      <div className={styles.dawn} aria-hidden="true" />

      <div className={styles.day}>
        <div className="container">
          <ul className={styles.values}>
            {aboutValues.map((value, index) => (
              <Reveal
                as="li"
                key={value.title}
                delay={index * 0.12}
                className={styles.value}
              >
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueBody}>{value.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
