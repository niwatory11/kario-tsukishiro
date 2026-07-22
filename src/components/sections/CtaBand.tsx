import { LinkButton } from '../ui/LinkButton'
import { Reveal } from '../ui/Reveal'
import styles from './CtaBand.module.css'

/** コレクション直後の中間CTA(夜色の帯で世界観を反復する) */
export function CtaBand() {
  return (
    <aside aria-label="ご予約のご案内" className={styles.band}>
      <Reveal className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          季節の菓子は月替わり。
          <span className={styles.copyBreak}>
            お受け取りの三日前までにご予約ください。
          </span>
        </p>
        <LinkButton href="#reserve">ご予約へ進む</LinkButton>
      </Reveal>
    </aside>
  )
}
