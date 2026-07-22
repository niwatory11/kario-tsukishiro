export type NavItem = {
  href: string
  label: string
}

/** ヘッダー・ドロワー・フッターで共有するアンカーナビ */
export const navItems: NavItem[] = [
  { href: '#about', label: '月白について' },
  { href: '#collection', label: '季節の菓子' },
  { href: '#menu', label: 'お品書き' },
  { href: '#craft', label: '職人のしごと' },
  { href: '#shop', label: '店舗案内' },
]

export const reserveNavItem: NavItem = { href: '#reserve', label: 'ご予約' }
