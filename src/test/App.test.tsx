import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App(スモークテスト)', () => {
  it('h1 がひとつだけあり、主要セクションの見出しが揃っている', () => {
    render(<App />)

    const h1s = screen.getAllByRole('heading', { level: 1 })
    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent('今宵の月を、菓子にうつす。')

    for (const name of [
      '月白について',
      '季節の菓子',
      'お品書き',
      '職人のしごと',
      '店舗案内',
      'ご予約',
    ]) {
      expect(
        screen.getByRole('heading', { level: 2, name }),
      ).toBeInTheDocument()
    }
  })

  it('スキップリンクと main ランドマークがある', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: '本文へスキップ' })).toHaveAttribute(
      'href',
      '#main',
    )
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
