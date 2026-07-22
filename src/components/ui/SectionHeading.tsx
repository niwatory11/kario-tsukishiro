import styles from './SectionHeading.module.css'

type SectionHeadingProps = {
  id: string
  /** 読みがな(ひらがなの前書き) */
  kana: string
  title: string
  align?: 'left' | 'center'
  /** 夜色の背景に置く場合 true */
  onNight?: boolean
}

/** 読みがな+明朝見出しのセクション表題 */
export function SectionHeading({
  id,
  kana,
  title,
  align = 'left',
  onNight = false,
}: SectionHeadingProps) {
  const classNames = [
    styles.wrap,
    align === 'center' ? styles.center : '',
    onNight ? styles.night : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classNames}>
      <p className={styles.kana} aria-hidden="true">
        {kana}
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
    </div>
  )
}
