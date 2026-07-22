import { navItems, reserveNavItem } from '../../data/nav'
import { shopInfo } from '../../data/shop'
import styles from './SiteFooter.module.css'

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.logo}>菓寮 月白</p>
          <p className={styles.reading}>かりょう つきしろ</p>
          <p className={styles.address}>
            {shopInfo.address}
            <br />
            {shopInfo.hours} / {shopInfo.closed}
          </p>
        </div>

        <nav aria-label="フッターナビゲーション">
          <ul className={styles.navList}>
            {[...navItems, reserveNavItem].map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`container ${styles.legal}`}>
        <p className={styles.disclaimer}>
          本サイトは、フロントエンド制作の実績提示を目的としたコンセプトサイトです。「菓寮
          月白」は架空の店舗であり、実在の店舗・商品・人物・住所とは関係ありません。掲載価格は架空の設定で、フォームからの送信は行われません。
        </p>
        <p className={styles.copyright}>
          © 2026 Kario Tsukishiro — Concept Project
        </p>
      </div>
    </footer>
  )
}
