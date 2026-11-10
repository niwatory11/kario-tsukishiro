import { describe, expect, it } from 'vitest'
import { sekkiList } from '../data/koyomi'
import {
  SYNODIC_MONTH,
  getMoonAge,
  getMoonIllumination,
  getMoonLitPath,
  getMoonName,
  getSeason,
  getSekkiIndex,
  seasonsFrom,
} from '../features/koyomi/koyomi'

const sekkiOn = (year: number, month: number, day: number) =>
  sekkiList[getSekkiIndex(new Date(year, month - 1, day))].name

describe('二十四節気', () => {
  it('二十四あり、立春はじまりで六つごとに季節が変わる', () => {
    expect(sekkiList).toHaveLength(24)
    expect(sekkiList[0].name).toBe('立春')
    expect(sekkiList[6].name).toBe('立夏')
    expect(sekkiList[12].name).toBe('立秋')
    expect(sekkiList[18].name).toBe('立冬')
  })

  it('はじまりの日から次の節気の前日までが、その節気になる', () => {
    expect(sekkiOn(2026, 11, 6)).toBe('霜降')
    expect(sekkiOn(2026, 11, 7)).toBe('立冬')
    expect(sekkiOn(2026, 11, 10)).toBe('立冬')
    expect(sekkiOn(2026, 11, 21)).toBe('立冬')
    expect(sekkiOn(2026, 11, 22)).toBe('小雪')
    expect(sekkiOn(2026, 6, 21)).toBe('夏至')
    expect(sekkiOn(2026, 9, 8)).toBe('白露')
  })

  it('年をまたいでも切れ目なくつながる(元日から小寒の前までは冬至)', () => {
    expect(sekkiOn(2026, 12, 31)).toBe('冬至')
    expect(sekkiOn(2027, 1, 1)).toBe('冬至')
    expect(sekkiOn(2027, 1, 4)).toBe('冬至')
    expect(sekkiOn(2027, 1, 5)).toBe('小寒')
    expect(sekkiOn(2027, 1, 20)).toBe('大寒')
    expect(sekkiOn(2027, 2, 3)).toBe('大寒')
    expect(sekkiOn(2027, 2, 4)).toBe('立春')
  })

  it('一年のどの日にも、節気がひとつ決まる', () => {
    for (let day = 0; day < 366; day++) {
      const index = getSekkiIndex(new Date(2028, 0, 1 + day))
      expect(index).toBeGreaterThanOrEqual(0)
      expect(index).toBeLessThan(24)
    }
  })
})

describe('季節', () => {
  it('立春・立夏・立秋・立冬で季節が変わる', () => {
    expect(getSeason(new Date(2026, 1, 3))).toBe('winter')
    expect(getSeason(new Date(2026, 1, 4))).toBe('spring')
    expect(getSeason(new Date(2026, 4, 5))).toBe('summer')
    expect(getSeason(new Date(2026, 7, 7))).toBe('autumn')
    expect(getSeason(new Date(2026, 10, 7))).toBe('winter')
    expect(getSeason(new Date(2027, 0, 10))).toBe('winter')
  })

  it('いまの季節を先頭に、これから巡る順に並ぶ', () => {
    expect(seasonsFrom('winter')).toEqual(['winter', 'spring', 'summer', 'autumn'])
    expect(seasonsFrom('summer')).toEqual(['summer', 'autumn', 'winter', 'spring'])
  })
})

describe('月齢', () => {
  /** 新月からの隔たり(日)。月齢 29 と 0.5 は 1 日ほどしか離れていない */
  const fromNewMoon = (age: number) => Math.min(age, SYNODIC_MONTH - age)

  it('実際の新月の日には、月齢がほぼ 0 になる(平均の月齢なので一日以内の差を許す)', () => {
    // 2024年1月11日、2026年8月12日(皆既日食の日)の新月
    expect(fromNewMoon(getMoonAge(new Date(Date.UTC(2024, 0, 11, 12))))).toBeLessThan(1)
    expect(fromNewMoon(getMoonAge(new Date(Date.UTC(2026, 7, 12, 18))))).toBeLessThan(1)
  })

  it('実際の満月の日には、月齢がほぼ朔望月の半分になる', () => {
    // 2024年9月18日の満月
    const age = getMoonAge(new Date(Date.UTC(2024, 8, 18, 3)))
    expect(Math.abs(age - SYNODIC_MONTH / 2)).toBeLessThan(1)
  })

  it('月齢はいつも 0 以上、朔望月の長さ未満(基準の日より前でも同じ)', () => {
    for (const time of [Date.UTC(1990, 5, 1), Date.UTC(2000, 0, 6, 18, 14), Date.UTC(2040, 11, 31)]) {
      const age = getMoonAge(new Date(time))
      expect(age).toBeGreaterThanOrEqual(0)
      expect(age).toBeLessThan(SYNODIC_MONTH)
    }
  })

  it('光って見える割合は、新月で 0、上弦で半分、満月で 1', () => {
    expect(getMoonIllumination(0)).toBeCloseTo(0, 5)
    expect(getMoonIllumination(SYNODIC_MONTH / 4)).toBeCloseTo(0.5, 5)
    expect(getMoonIllumination(SYNODIC_MONTH / 2)).toBeCloseTo(1, 5)
  })

  it('月の名は、月齢に合わせて新月から満月をへて新月へ戻る', () => {
    expect(getMoonName(0.3)).toBe('新月')
    expect(getMoonName(2.5)).toBe('三日月')
    expect(getMoonName(7.4)).toBe('上弦の月')
    expect(getMoonName(12.5)).toBe('十三夜')
    expect(getMoonName(14.8)).toBe('満月')
    expect(getMoonName(16.2)).toBe('十六夜')
    expect(getMoonName(22.1)).toBe('下弦の月')
    expect(getMoonName(29.2)).toBe('新月')
  })

  it('満ちていく月は右が光り、欠けていく月は左が光る', () => {
    // 外側の弧の向き(sweep)が、満ち欠けで入れ替わる
    expect(getMoonLitPath(5, 28, 18)).toContain('A18 18 0 0 1 28 46')
    expect(getMoonLitPath(24, 28, 18)).toContain('A18 18 0 0 0 28 46')
  })
})
