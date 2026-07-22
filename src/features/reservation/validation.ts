import type {
  ReservationErrors,
  ReservationField,
  ReservationValues,
} from './types'

/** お受け取りはこの日数より後から */
export const MIN_LEAD_DAYS = 3
/** お受け取りはこの日数以内まで */
export const MAX_AHEAD_DAYS = 60
/** 定休日(0=日曜, 3=水曜) */
export const CLOSED_WEEKDAY = 3

const HIRAGANA_PATTERN = /^[ぁ-んーゝゞ\s]+$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function toDateString(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** input[type=date] の min 属性用 */
export function minDateString(today: Date): string {
  return toDateString(addDays(startOfDay(today), MIN_LEAD_DAYS))
}

/** input[type=date] の max 属性用 */
export function maxDateString(today: Date): string {
  return toDateString(addDays(startOfDay(today), MAX_AHEAD_DAYS))
}

/** 'YYYY-MM-DD' をローカル日付として解釈する(UTCずれを避ける) */
function parseDateInput(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null
  const [, y, m, d] = match
  const date = new Date(Number(y), Number(m) - 1, Number(d))
  if (
    date.getFullYear() !== Number(y) ||
    date.getMonth() !== Number(m) - 1 ||
    date.getDate() !== Number(d)
  ) {
    return null
  }
  return date
}

export function validateField(
  field: ReservationField,
  values: ReservationValues,
  today: Date,
): string | undefined {
  const value = values[field]

  switch (field) {
    case 'name': {
      const trimmed = value.trim()
      if (trimmed.length === 0) return 'お名前を入力してください'
      if (trimmed.length > 40) return 'お名前は40文字以内で入力してください'
      return undefined
    }
    case 'furigana': {
      const trimmed = value.trim()
      if (trimmed.length === 0) return 'ふりがなを入力してください'
      if (!HIRAGANA_PATTERN.test(trimmed))
        return 'ふりがなは、ひらがなで入力してください'
      return undefined
    }
    case 'phone': {
      const digits = value.replace(/[-\s−ー]/g, '')
      if (digits.length === 0) return '電話番号を入力してください'
      if (!/^0\d{9,10}$/.test(digits))
        return '電話番号の形式が正しくありません(例: 090-0000-0000)'
      return undefined
    }
    case 'email': {
      const trimmed = value.trim()
      if (trimmed.length === 0) return 'メールアドレスを入力してください'
      if (!EMAIL_PATTERN.test(trimmed))
        return 'メールアドレスの形式が正しくありません'
      return undefined
    }
    case 'date': {
      if (value === '') return 'お受け取り希望日をお選びください'
      const selected = parseDateInput(value)
      if (!selected) return '日付の形式が正しくありません'
      const min = addDays(startOfDay(today), MIN_LEAD_DAYS)
      const max = addDays(startOfDay(today), MAX_AHEAD_DAYS)
      if (selected.getTime() < min.getTime())
        return `お受け取りは${MIN_LEAD_DAYS}日後以降の日付をお選びください`
      if (selected.getTime() > max.getTime())
        return `お受け取りは${MAX_AHEAD_DAYS}日以内の日付をお選びください`
      if (selected.getDay() === CLOSED_WEEKDAY)
        return '水曜日は定休日です。別の日をお選びください'
      return undefined
    }
    case 'time': {
      if (value === '') return 'お受け取り時間をお選びください'
      return undefined
    }
    case 'order': {
      if (value === '') return 'ご注文内容をお選びください'
      return undefined
    }
    case 'quantity': {
      if (value === '') return '個数を入力してください'
      const quantity = Number(value)
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10)
        return '個数は1〜10でご指定ください'
      return undefined
    }
    case 'notes': {
      if (value.length > 400) return '備考は400文字以内で入力してください'
      return undefined
    }
  }
}

export function validateAll(
  values: ReservationValues,
  today: Date,
): ReservationErrors {
  const errors: ReservationErrors = {}
  for (const field of Object.keys(values) as ReservationField[]) {
    const message = validateField(field, values, today)
    if (message) errors[field] = message
  }
  return errors
}
