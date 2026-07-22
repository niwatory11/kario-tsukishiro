export type ReservationValues = {
  name: string
  furigana: string
  phone: string
  email: string
  date: string
  time: string
  order: string
  quantity: string
  notes: string
}

export type ReservationField = keyof ReservationValues

export type ReservationErrors = Partial<Record<ReservationField, string>>

export const emptyValues: ReservationValues = {
  name: '',
  furigana: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  order: '',
  quantity: '1',
  notes: '',
}

export const timeOptions = [
  '11時〜13時',
  '13時〜15時',
  '15時〜17時',
] as const

export const orderOptions = [
  '季節の詰合せ 六個入',
  '季節の詰合せ 十二個入',
  '月白最中 五個入',
  'その他(備考にご記入ください)',
] as const
