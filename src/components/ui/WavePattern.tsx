type WavePatternProps = {
  /** SVG pattern の一意なid(1ページに複数置くため必須) */
  id: string
  /** 波を塗りつぶす地色(重なりの表現に必要) */
  fill: string
  className?: string
}

const RADII = [28, 21, 14, 7]

function Wave({ cx, cy, fill }: { cx: number; cy: number; fill: string }) {
  return (
    <>
      {RADII.map((r, i) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill={i === 0 ? fill : 'none'} />
      ))}
    </>
  )
}

/** 青海波(せいがいは)の装飾帯。strokeの色は CSS の color(currentColor)で制御する */
export function WavePattern({ id, fill, className }: WavePatternProps) {
  return (
    <svg aria-hidden="true" focusable="false" className={className}>
      <defs>
        <pattern
          id={id}
          width="56"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <g stroke="currentColor" strokeWidth="1">
            <Wave cx={0} cy={0} fill={fill} />
            <Wave cx={56} cy={0} fill={fill} />
            <Wave cx={28} cy={14} fill={fill} />
            <Wave cx={0} cy={28} fill={fill} />
            <Wave cx={56} cy={28} fill={fill} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
