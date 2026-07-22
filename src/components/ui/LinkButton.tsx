import type { ReactNode } from 'react'
import styles from './LinkButton.module.css'

type LinkButtonProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'ghostNight'
}

/** アンカー遷移用のCTAボタン */
export function LinkButton({
  href,
  children,
  variant = 'primary',
}: LinkButtonProps) {
  return (
    <a href={href} className={`${styles.button} ${styles[variant]}`}>
      {children}
    </a>
  )
}
