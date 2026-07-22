import { LinkButton } from '../ui/LinkButton'
import { WavePattern } from '../ui/WavePattern'
import styles from './Hero.module.css'

function Moon() {
  return (
    <svg viewBox="0 0 300 300" className={styles.moon} aria-hidden="true">
      <defs>
        <radialGradient id="moon-halo">
          <stop offset="0%" stopColor="#f3f8fa" stopOpacity="0.32" />
          <stop offset="45%" stopColor="#f3f8fa" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#f3f8fa" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="150" r="150" fill="url(#moon-halo)" />
      <circle cx="150" cy="150" r="62" fill="#edf3f6" />
    </svg>
  )
}

/** ファーストビュー: 月が昇る直前の夜空 */
export function Hero() {
  return (
    <section id="top" aria-label="菓寮 月白 — 季節の上生菓子" className={styles.hero}>
      <div className={styles.moonWrap} aria-hidden="true">
        <Moon />
      </div>

      <div className={`container ${styles.inner}`}>
        <h1 className={styles.heading}>
          今宵の月を、
          <br />
          菓子にうつす。
        </h1>

        <div className={styles.lead}>
          <p className={styles.subcopy}>
            二十四節気にあわせ、ひとつずつ手で仕立てる上生菓子。
            <br />
            東京・谷中の小さな菓子店「菓寮 月白」。
          </p>
          <div className={styles.ctas}>
            <LinkButton href="#reserve">季節の菓子を予約する</LinkButton>
            <LinkButton href="#menu" variant="ghostNight">
              お品書きを見る
            </LinkButton>
          </div>
          <p className={styles.note}>
            ※ 本サイトは架空ブランドのコンセプトサイトです
          </p>
        </div>
      </div>

      <div className={styles.waveBand} aria-hidden="true">
        <WavePattern id="hero-wave" fill="#1c2a38" className={styles.wave} />
      </div>

      {/* ヘッダーの透過/不透過を切り替える番兵 */}
      <div id="hero-sentinel" className={styles.sentinel} aria-hidden="true" />
    </section>
  )
}
