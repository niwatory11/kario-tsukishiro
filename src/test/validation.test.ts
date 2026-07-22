import { describe, expect, it } from 'vitest'
import {
  maxDateString,
  minDateString,
  validateAll,
  validateField,
} from '../features/reservation/validation'
import { emptyValues, type ReservationValues } from '../features/reservation/types'

/** 2026-07-20 は月曜日 */
const MONDAY = new Date(2026, 6, 20)

function valuesWith(partial: Partial<ReservationValues>): ReservationValues {
  return { ...emptyValues, ...partial }
}

describe('validateField: name', () => {
  it('空ならエラー', () => {
    expect(validateField('name', valuesWith({ name: '' }), MONDAY)).toBe(
      'お名前を入力してください',
    )
  })

  it('空白のみもエラー', () => {
    expect(validateField('name', valuesWith({ name: '   ' }), MONDAY)).toBeTruthy()
  })

  it('40文字は許可、41文字はエラー', () => {
    expect(
      validateField('name', valuesWith({ name: 'あ'.repeat(40) }), MONDAY),
    ).toBeUndefined()
    expect(
      validateField('name', valuesWith({ name: 'あ'.repeat(41) }), MONDAY),
    ).toBeTruthy()
  })
})

describe('validateField: furigana', () => {
  it('ひらがな(長音符含む)は許可', () => {
    expect(
      validateField('furigana', valuesWith({ furigana: 'もちづき たまきー' }), MONDAY),
    ).toBeUndefined()
  })

  it('カタカナはエラー', () => {
    expect(
      validateField('furigana', valuesWith({ furigana: 'モチヅキ' }), MONDAY),
    ).toBe('ふりがなは、ひらがなで入力してください')
  })

  it('漢字はエラー', () => {
    expect(
      validateField('furigana', valuesWith({ furigana: '望月' }), MONDAY),
    ).toBeTruthy()
  })
})

describe('validateField: phone', () => {
  it('ハイフンありの携帯番号は許可', () => {
    expect(
      validateField('phone', valuesWith({ phone: '090-1234-5678' }), MONDAY),
    ).toBeUndefined()
  })

  it('ハイフンなしの固定電話(10桁)は許可', () => {
    expect(
      validateField('phone', valuesWith({ phone: '0312345678' }), MONDAY),
    ).toBeUndefined()
  })

  it('9桁はエラー', () => {
    expect(
      validateField('phone', valuesWith({ phone: '031234567' }), MONDAY),
    ).toBeTruthy()
  })

  it('12桁はエラー', () => {
    expect(
      validateField('phone', valuesWith({ phone: '090123456789' }), MONDAY),
    ).toBeTruthy()
  })

  it('0始まりでなければエラー', () => {
    expect(
      validateField('phone', valuesWith({ phone: '9012345678' }), MONDAY),
    ).toBeTruthy()
  })
})

describe('validateField: email', () => {
  it('通常の形式は許可', () => {
    expect(
      validateField('email', valuesWith({ email: 'taro@example.com' }), MONDAY),
    ).toBeUndefined()
  })

  it('@なしはエラー', () => {
    expect(
      validateField('email', valuesWith({ email: 'taro.example.com' }), MONDAY),
    ).toBe('メールアドレスの形式が正しくありません')
  })
})

describe('validateField: date(今日=月曜 2026-07-20)', () => {
  it('2日後(7/22)はエラー', () => {
    expect(
      validateField('date', valuesWith({ date: '2026-07-22' }), MONDAY),
    ).toBe('お受け取りは3日後以降の日付をお選びください')
  })

  it('3日後(7/23 木曜)は許可', () => {
    expect(
      validateField('date', valuesWith({ date: '2026-07-23' }), MONDAY),
    ).toBeUndefined()
  })

  it('水曜日(7/29)は定休日エラー', () => {
    expect(
      validateField('date', valuesWith({ date: '2026-07-29' }), MONDAY),
    ).toBe('水曜日は定休日です。別の日をお選びください')
  })

  it('60日後(9/18)は許可', () => {
    expect(
      validateField('date', valuesWith({ date: '2026-09-18' }), MONDAY),
    ).toBeUndefined()
  })

  it('61日後(9/19)はエラー', () => {
    expect(
      validateField('date', valuesWith({ date: '2026-09-19' }), MONDAY),
    ).toBe('お受け取りは60日以内の日付をお選びください')
  })

  it('存在しない日付(2/30)はエラー', () => {
    expect(
      validateField('date', valuesWith({ date: '2026-02-30' }), MONDAY),
    ).toBe('日付の形式が正しくありません')
  })

  it('min/max 属性値が正しい', () => {
    expect(minDateString(MONDAY)).toBe('2026-07-23')
    expect(maxDateString(MONDAY)).toBe('2026-09-18')
  })
})

describe('validateField: quantity', () => {
  it.each(['1', '10'])('%s は許可', (quantity) => {
    expect(
      validateField('quantity', valuesWith({ quantity }), MONDAY),
    ).toBeUndefined()
  })

  it.each(['0', '11', '2.5', ''])('%s はエラー', (quantity) => {
    expect(
      validateField('quantity', valuesWith({ quantity }), MONDAY),
    ).toBeTruthy()
  })
})

describe('validateField: notes', () => {
  it('400文字は許可、401文字はエラー', () => {
    expect(
      validateField('notes', valuesWith({ notes: 'あ'.repeat(400) }), MONDAY),
    ).toBeUndefined()
    expect(
      validateField('notes', valuesWith({ notes: 'あ'.repeat(401) }), MONDAY),
    ).toBe('備考は400文字以内で入力してください')
  })
})

describe('validateAll', () => {
  it('未入力なら必須項目すべてにエラーが付く(備考は任意)', () => {
    const errors = validateAll(valuesWith({ quantity: '' }), MONDAY)
    expect(Object.keys(errors).sort()).toEqual(
      ['date', 'email', 'furigana', 'name', 'order', 'phone', 'quantity', 'time'].sort(),
    )
    expect(errors.notes).toBeUndefined()
  })

  it('すべて正しければエラーなし', () => {
    const errors = validateAll(
      valuesWith({
        name: '山田 花子',
        furigana: 'やまだ はなこ',
        phone: '090-1234-5678',
        email: 'hanako@example.com',
        date: '2026-07-23',
        time: '11時〜13時',
        order: '季節の詰合せ 六個入',
        quantity: '2',
        notes: '',
      }),
      MONDAY,
    )
    expect(errors).toEqual({})
  })
})
