import type { SweetSeason } from '../../data/sweets'

type WagashiArtProps = {
  variant: SweetSeason
  /** 読み上げ用の説明 */
  label: string
  className?: string
}

/** 皿の楕円(全意匠で共通) */
function Plate() {
  return (
    <>
      <ellipse cx="100" cy="164" rx="74" ry="12" fill="#dde8ee" />
      <ellipse
        cx="100"
        cy="162"
        rx="74"
        ry="12"
        fill="none"
        stroke="#8c99a3"
        strokeWidth="1"
      />
    </>
  )
}

/** 春「花衣」— 桜色のきんとん */
function Spring() {
  const petals = [
    { cx: 100, cy: 96, r: 30, fill: '#e8b7c2' },
    { cx: 74, cy: 112, r: 24, fill: '#f0c9d3' },
    { cx: 126, cy: 112, r: 24, fill: '#e3a8b6' },
    { cx: 86, cy: 130, r: 22, fill: '#eabfca' },
    { cx: 116, cy: 132, r: 22, fill: '#f2d3db' },
    { cx: 100, cy: 118, r: 26, fill: '#edc2cd' },
    { cx: 62, cy: 132, r: 16, fill: '#e8b7c2' },
    { cx: 138, cy: 132, r: 16, fill: '#f0c9d3' },
  ]
  return (
    <>
      {petals.map((p) => (
        <circle key={`${p.cx}-${p.cy}`} {...p} />
      ))}
      <circle cx="100" cy="92" r="7" fill="#fdfaf6" />
    </>
  )
}

/** 夏「水面月」— 葛に沈む月 */
function Summer({ gradientId }: { gradientId: string }) {
  return (
    <>
      <rect
        x="56"
        y="72"
        width="88"
        height="82"
        rx="10"
        fill={`url(#${gradientId})`}
        opacity="0.9"
      />
      <circle cx="100" cy="122" r="20" fill="#f6f9f5" opacity="0.95" />
      <path
        d="M64 96c8-5 16-5 24 0s16 5 24 0 16-5 24 0"
        fill="none"
        stroke="#f3f8fa"
        strokeWidth="2"
        opacity="0.7"
      />
      <rect
        x="56"
        y="72"
        width="88"
        height="82"
        rx="10"
        fill="none"
        stroke="#9db8c8"
        strokeWidth="1"
      />
    </>
  )
}

/** 秋「月見兎」— 練切の白兎 */
function Autumn() {
  return (
    <>
      <ellipse
        cx="90"
        cy="76"
        rx="9"
        ry="27"
        fill="#f6f2ec"
        stroke="#e2d8cc"
        strokeWidth="1.5"
        transform="rotate(-10 90 76)"
      />
      <ellipse
        cx="114"
        cy="76"
        rx="9"
        ry="27"
        fill="#f6f2ec"
        stroke="#e2d8cc"
        strokeWidth="1.5"
        transform="rotate(8 114 76)"
      />
      <ellipse
        cx="114"
        cy="78"
        rx="3.5"
        ry="18"
        fill="#eccbd2"
        transform="rotate(8 114 78)"
      />
      <ellipse
        cx="100"
        cy="124"
        rx="44"
        ry="33"
        fill="#f6f2ec"
        stroke="#e2d8cc"
        strokeWidth="1.5"
      />
      <circle cx="122" cy="116" r="3" fill="#8e4a43" />
    </>
  )
}

/** 冬「初雪」— そぼろ餡の雪 */
function Winter() {
  const flakes = [
    { cx: 100, cy: 94, r: 12 },
    { cx: 84, cy: 104, r: 11 },
    { cx: 116, cy: 104, r: 11 },
    { cx: 72, cy: 118, r: 10 },
    { cx: 96, cy: 112, r: 12 },
    { cx: 120, cy: 116, r: 10 },
    { cx: 130, cy: 128, r: 9 },
    { cx: 64, cy: 130, r: 9 },
    { cx: 84, cy: 126, r: 11 },
    { cx: 108, cy: 126, r: 11 },
    { cx: 98, cy: 138, r: 12 },
    { cx: 76, cy: 140, r: 10 },
    { cx: 122, cy: 140, r: 10 },
  ]
  return (
    <>
      {flakes.map((f) => (
        <circle
          key={`${f.cx}-${f.cy}`}
          {...f}
          fill="#f7fafb"
          stroke="#dce6ec"
          strokeWidth="1"
        />
      ))}
      <rect x="96" y="84" width="9" height="6" fill="#c9a961" transform="rotate(-12 100 87)" />
    </>
  )
}

/** 季節の上生菓子の抽象イラスト */
export function WagashiArt({ variant, label, className }: WagashiArtProps) {
  const gradientId = `kuzu-${variant}`
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      className={className}
      aria-label={label}
    >
      {variant === 'summer' && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d9e8f0" />
            <stop offset="100%" stopColor="#a9c4d4" />
          </linearGradient>
        </defs>
      )}
      <Plate />
      {variant === 'spring' && <Spring />}
      {variant === 'summer' && <Summer gradientId={gradientId} />}
      {variant === 'autumn' && <Autumn />}
      {variant === 'winter' && <Winter />}
    </svg>
  )
}
