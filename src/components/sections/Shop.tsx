import { shopInfo } from '../../data/shop'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import styles from './Shop.module.css'

function AreaMap() {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="店舗周辺の簡易地図(イメージ)。日暮里駅と千駄木駅のあいだ、谷中の路地の奥に店があります。"
      className={styles.map}
    >
      <rect width="400" height="300" fill="#eaf1f5" />
      {/* 通り */}
      <g stroke="#b9c8d1" strokeWidth="10" strokeLinecap="round">
        <path d="M40 260 L180 120 L360 90" fill="none" />
        <path d="M60 40 L180 120" fill="none" />
        <path d="M180 120 L200 260" fill="none" />
      </g>
      <g stroke="#cfdbe2" strokeWidth="5" strokeLinecap="round">
        <path d="M120 180 L250 200 L340 170" fill="none" />
        <path d="M250 200 L260 90" fill="none" />
      </g>
      {/* 駅 */}
      <g>
        <rect x="330" y="70" width="44" height="26" fill="#8c99a3" rx="2" />
        <text x="352" y="87" textAnchor="middle" fontSize="12" fill="#f3f8fa">
          日暮里
        </text>
        <rect x="30" y="240" width="44" height="26" fill="#8c99a3" rx="2" />
        <text x="52" y="257" textAnchor="middle" fontSize="12" fill="#f3f8fa">
          千駄木
        </text>
      </g>
      {/* 店舗マーカー: 満月 */}
      <g>
        <circle cx="228" cy="150" r="26" fill="#f3f8fa" stroke="#8e4a43" strokeWidth="2" />
        <circle cx="228" cy="150" r="15" fill="#8e4a43" />
        <text x="228" y="155" textAnchor="middle" fontSize="13" fill="#f3f8fa">
          月
        </text>
        <text x="228" y="200" textAnchor="middle" fontSize="13" fill="#2a3640">
          菓寮 月白
        </text>
      </g>
    </svg>
  )
}

/** 店舗案内 */
export function Shop() {
  return (
    <section
      id="shop"
      aria-labelledby="shop-heading"
      className={`section ${styles.section}`}
    >
      <div className="container">
        <SectionHeading
          id="shop-heading"
          kana="やなかのろじおく"
          title="店舗案内"
        />

        <div className={styles.layout}>
          <Reveal className={styles.info}>
            <dl className={styles.infoList}>
              <div className={styles.infoRow}>
                <dt className={styles.infoLabel}>屋号</dt>
                <dd className={styles.infoValue}>
                  {shopInfo.name}({shopInfo.reading})
                </dd>
              </div>
              <div className={styles.infoRow}>
                <dt className={styles.infoLabel}>所在地</dt>
                <dd className={styles.infoValue}>{shopInfo.address}</dd>
              </div>
              <div className={styles.infoRow}>
                <dt className={styles.infoLabel}>道順</dt>
                <dd className={styles.infoValue}>{shopInfo.access}</dd>
              </div>
              <div className={styles.infoRow}>
                <dt className={styles.infoLabel}>営業時間</dt>
                <dd className={styles.infoValue}>{shopInfo.hours}</dd>
              </div>
              <div className={styles.infoRow}>
                <dt className={styles.infoLabel}>定休日</dt>
                <dd className={styles.infoValue}>{shopInfo.closed}</dd>
              </div>
              <div className={styles.infoRow}>
                <dt className={styles.infoLabel}>電話</dt>
                <dd className={styles.infoValue}>{shopInfo.tel}</dd>
              </div>
            </dl>
            <p className={styles.note}>
              店内の喫茶は六席のみ。売り切れ仕舞いのため、確実なお受け取りにはご予約をおすすめします。
            </p>
          </Reveal>

          <Reveal delay={0.15} className={styles.mapWrap}>
            <AreaMap />
            <p className={styles.mapNote}>
              ※ イメージ図です。実在の地理とは異なります。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
