import { ReservationForm } from '../../features/reservation/ReservationForm'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Reservation.module.css'

const flow = [
  {
    title: 'フォームからご予約',
    body: 'お受け取りの三日前までにお申し込みください。',
  },
  {
    title: '確認のご連絡',
    body: '二日以内に、お電話またはメールでご連絡いたします。',
  },
  {
    title: '店頭でお受け取り',
    body: 'お代は当日、店頭にて頂戴いたします。',
  },
]

/** 予約セクション */
export function Reservation() {
  return (
    <section
      id="reserve"
      aria-labelledby="reserve-heading"
      className={`section ${styles.section}`}
    >
      <div className="container">
        <SectionHeading
          id="reserve-heading"
          kana="みっかまえまでに"
          title="ご予約"
        />

        <div className={styles.layout}>
          <Reveal className={styles.aside}>
            <p className={styles.lede}>
              季節の菓子はすべて予約優先です。数に限りがあるため、店頭では売り切れていることもございます。
            </p>
            <ol className={styles.flow}>
              {flow.map((item, index) => (
                <li key={item.title} className={styles.flowItem}>
                  <span className={styles.flowNumeral} aria-hidden="true">
                    {['壱', '弐', '参'][index]}
                  </span>
                  <div>
                    <h3 className={styles.flowTitle}>{item.title}</h3>
                    <p className={styles.flowBody}>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.15} className={styles.formWrap}>
            <ReservationForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
