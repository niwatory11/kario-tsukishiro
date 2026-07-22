import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Philosophy.module.css'

const values = [
  {
    title: '朝に炊く餡',
    body: '小豆はその日の分だけ、夜明けとともに炊き上げます。餡の香りがいちばん立つのは、炊いてから半日のあいだだからです。',
  },
  {
    title: '節気にあわせた意匠',
    body: '暦は二十四の節気で巡ります。店先の菓子も同じ速さで姿を変え、いまの季節にしか出会えない意匠をお届けします。',
  },
  {
    title: 'ひとつずつの手しごと',
    body: '木型に頼らず、指先とへらだけでかたちを結びます。同じ菓銘でも、ひとつとして同じ表情はありません。',
  },
]

/** ブランド紹介: 夜空が月白へ白んでいく遷移を挟む */
export function Philosophy() {
  return (
    <section id="about" aria-labelledby="about-heading" className={styles.section}>
      <div className={styles.night}>
        <div className="container">
          <SectionHeading
            id="about-heading"
            kana="やごうのこと"
            title="月白について"
            onNight
          />
          <Reveal>
            <p className={styles.intro}>
              月白(つきしろ)とは、月が昇る直前、東の空がしろがねに明るむひとときを指す色の名。
            </p>
            <p className={styles.intro}>
              菓寮
              月白は、その静かな待ち遠しさをひと椀の菓子にうつす、東京・谷中の小さな和菓子店です。派手さよりも、季節の気配を。暦とともに、今日の菓子を仕立てています。
            </p>
          </Reveal>
        </div>
      </div>

      {/* 夜空が白む遷移帯 */}
      <div className={styles.dawn} aria-hidden="true" />

      <div className={styles.day}>
        <div className="container">
          <ul className={styles.values}>
            {values.map((value, index) => (
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
