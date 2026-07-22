import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReservationForm } from '../features/reservation/ReservationForm'

/** 今日から数えて有効な受け取り日(水曜を避けて4〜5日後)を返す */
function validPickupDate(): string {
  const date = new Date()
  date.setDate(date.getDate() + 4)
  if (date.getDay() === 3) date.setDate(date.getDate() + 1)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

describe('ReservationForm', () => {
  it('未入力のまま送信するとエラーサマリーが表示され、最初の項目へフォーカスが移る', async () => {
    const user = userEvent.setup()
    render(<ReservationForm />)

    await user.click(screen.getByRole('button', { name: 'この内容で予約する' }))

    const summary = await screen.findByRole('alert')
    expect(summary).toHaveTextContent('入力内容に')
    expect(summary).toHaveTextContent('お名前を入力してください')
    expect(screen.getByLabelText(/お名前/)).toHaveFocus()
  })

  it('blur で検証され、aria-invalid とエラー文が関連付く', async () => {
    const user = userEvent.setup()
    render(<ReservationForm />)

    const nameInput = screen.getByLabelText(/お名前/)
    await user.click(nameInput)
    await user.tab()

    expect(nameInput).toHaveAttribute('aria-invalid', 'true')
    expect(nameInput).toHaveAccessibleDescription('お名前を入力してください')
  })

  it('誤りを直すと入力中にエラーが消える', async () => {
    const user = userEvent.setup()
    render(<ReservationForm />)

    const furiganaInput = screen.getByLabelText(/ふりがな/)
    await user.type(furiganaInput, 'ヤマダ')
    await user.tab()
    expect(furiganaInput).toHaveAttribute('aria-invalid', 'true')

    await user.clear(furiganaInput)
    await user.type(furiganaInput, 'やまだ')
    expect(furiganaInput).toHaveAttribute('aria-invalid', 'false')
  })

  it('すべて正しく入力して送信すると完了メッセージが表示される', async () => {
    const user = userEvent.setup()
    render(<ReservationForm />)

    await user.type(screen.getByLabelText(/お名前/), '山田 花子')
    await user.type(screen.getByLabelText(/ふりがな/), 'やまだ はなこ')
    await user.type(screen.getByLabelText(/電話番号/), '090-1234-5678')
    await user.type(screen.getByLabelText(/メールアドレス/), 'hanako@example.com')
    fireEvent.change(screen.getByLabelText(/お受け取り希望日/), {
      target: { value: validPickupDate() },
    })
    await user.selectOptions(screen.getByLabelText(/お受け取り時間/), '11時〜13時')
    await user.click(screen.getByRole('radio', { name: '季節の詰合せ 六個入' }))

    await user.click(screen.getByRole('button', { name: 'この内容で予約する' }))

    const status = await screen.findByRole('status', undefined, { timeout: 3000 })
    expect(status).toHaveTextContent('ご予約内容を受け付けました')
    expect(status).toHaveTextContent('実際の送信は行われません')
  })
})
