import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { Collection } from '../components/sections/Collection'
import { currentLabel } from '../data/sweets'

/** 主役の菓子(大きな写真の一品)の菓銘 */
const featuredName = () =>
  within(screen.getByRole('article')).getByRole('heading', { level: 3 })

/** 三列に並ぶ、残りの三季の菓銘(並び順のまま) */
const otherNames = () => {
  const lists = screen.getAllByRole('list')
  const sweetsList = lists.find((list) => within(list).queryAllByRole('img').length === 3)
  return within(sweetsList as HTMLElement)
    .getAllByRole('heading', { level: 3 })
    .map((heading) => heading.textContent)
}

describe('季節の菓子(今日の暦で主役が変わる)', () => {
  it('立冬のあとは、冬の「初雪」が主役になり、春・夏・秋の順につづく', () => {
    render(<Collection today={new Date(2026, 10, 10)} />)

    expect(featuredName()).toHaveTextContent('初雪')
    expect(within(screen.getByRole('article')).getByText(currentLabel)).toBeInTheDocument()
    expect(otherNames()).toEqual([
      expect.stringContaining('花衣'),
      expect.stringContaining('水面月'),
      expect.stringContaining('月見兎'),
    ])
    // 「いまの季節」の札は、主役の一品にだけ付く
    expect(screen.getAllByText(currentLabel)).toHaveLength(1)
  })

  it('夏至のころは、夏の「水面月」が主役になる', () => {
    render(<Collection today={new Date(2026, 5, 25)} />)
    expect(featuredName()).toHaveTextContent('水面月')
    expect(otherNames()[0]).toContain('月見兎')
  })

  it('立春の前日までは冬、立春から春の「花衣」に替わる', () => {
    const { unmount } = render(<Collection today={new Date(2027, 1, 3)} />)
    expect(featuredName()).toHaveTextContent('初雪')
    unmount()

    render(<Collection today={new Date(2027, 1, 4)} />)
    expect(featuredName()).toHaveTextContent('花衣')
  })

  it('今日の暦に、節気の名・はじまりの日・今宵の月が文字で載る', () => {
    render(<Collection today={new Date(2026, 10, 10)} />)

    expect(screen.getByText('今日の暦')).toBeInTheDocument()
    expect(screen.getByText('11月10日')).toHaveAttribute('dateTime', '2026-11-10')
    expect(screen.getAllByText('立冬').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('りっとう')).toBeInTheDocument()
    expect(screen.getByText('11月7日ごろから')).toBeInTheDocument()
    // 2026年11月9日が新月。その翌日の夜は、新月か三日月
    expect(screen.getByText(/^(新月|三日月)$/)).toBeInTheDocument()
    // 目盛りは装飾。同じ内容を文字で持つ
    expect(screen.getByText('二十四節気の19番目')).toBeInTheDocument()
  })
})
