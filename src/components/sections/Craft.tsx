import type { ReactNode } from 'react'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Craft.module.css'

type Step = {
  numeral: string
  title: string
  body: string
  icon: ReactNode
}

const iconProps = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  'aria-hidden': true,
} as const

/* 工程は実際に順序が意味を持つため、漢数字で番号を振る */
const steps: Step[] = [
  {
    numeral: '壱',
    title: '炊く',
    body: '夜明け前、銅鍋で小豆を炊きはじめます。豆の踊る音と湯気の匂いで、火加減を読みます。',
    icon: (
      <svg {...iconProps}>
        <path d="M10 22h28l-2 14a4 4 0 0 1-4 3.5H16a4 4 0 0 1-4-3.5z" />
        <path d="M8 22h32" />
        <path d="M20 8c-2 3 2 5 0 8m8-8c-2 3 2 5 0 8" />
      </svg>
    ),
  },
  {
    numeral: '弐',
    title: '漉す',
    body: '炊きあがった餡を絹漉しにかけ、皮を除いてなめらかに。舌に残るのは豆の香りだけです。',
    icon: (
      <svg {...iconProps}>
        <circle cx="24" cy="24" r="14" />
        <path d="M14 20h20M14 24h20M14 28h20M20 14v20M24 14v20M28 14v20" strokeWidth="0.9" />
      </svg>
    ),
  },
  {
    numeral: '参',
    title: '包む',
    body: '餡玉を練切の生地で包み、掌の温度でそっと締めます。厚みの偏りは、指先だけが知っています。',
    icon: (
      <svg {...iconProps}>
        <circle cx="24" cy="22" r="8" />
        <path d="M8 30c4 6 10 9 16 9s12-3 16-9" />
        <path d="M12 26c2-2 5-3 8-2m16 2c-2-2-5-3-8-2" />
      </svg>
    ),
  },
  {
    numeral: '肆',
    title: 'かたどる',
    body: 'へら一本で、花びらや月の満ち欠けを結びます。意匠の名は、その日の節気からいただきます。',
    icon: (
      <svg {...iconProps}>
        <path d="M30 8l10 10-22 22-12 2 2-12z" />
        <path d="M26 12l10 10" />
      </svg>
    ),
  },
]

/** 職人と製法(信頼形成) */
export function Craft() {
  return (
    <section
      id="craft"
      aria-labelledby="craft-heading"
      className={`section ${styles.section}`}
    >
      <div className="container">
        <SectionHeading
          id="craft-heading"
          kana="てしごとのこと"
          title="職人のしごと"
        />

        <div className={styles.layout}>
          <Reveal className={styles.master}>
            <h3 className={styles.masterTitle}>
              店主
              <span className={styles.masterName}>望月 環</span>
              <span className={styles.masterReading}>もちづき たまき</span>
            </h3>
            <p className={styles.masterBody}>
              京都の菓子舗で十二年の修業ののち、谷中の路地奥にこの店を開きました。菓子はごちそうではなく、暦の相棒。今日がどの季節のどのあたりにいるのかを、ひと口で思い出してもらえたら——そんな気持ちで、毎朝厨房に立っています。
            </p>
          </Reveal>

          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.numeral}
                delay={index * 0.1}
                className={styles.step}
              >
                <span className={styles.numeral} aria-hidden="true">
                  {step.numeral}
                </span>
                <span className={styles.icon}>{step.icon}</span>
                <div>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
