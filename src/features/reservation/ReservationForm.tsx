import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  emptyValues,
  orderOptions,
  timeOptions,
  type ReservationErrors,
  type ReservationField,
  type ReservationValues,
} from './types'
import {
  maxDateString,
  minDateString,
  validateAll,
  validateField,
} from './validation'
import styles from './ReservationForm.module.css'

const FIELD_ORDER: ReservationField[] = [
  'name',
  'furigana',
  'phone',
  'email',
  'date',
  'time',
  'order',
  'quantity',
  'notes',
]

const FIELD_LABELS: Record<ReservationField, string> = {
  name: 'お名前',
  furigana: 'ふりがな',
  phone: '電話番号',
  email: 'メールアドレス',
  date: 'お受け取り希望日',
  time: 'お受け取り時間',
  order: 'ご注文内容',
  quantity: '個数',
  notes: '備考',
}

function fieldId(field: ReservationField): string {
  return field === 'order' ? 'rsv-order-0' : `rsv-${field}`
}

function errorId(field: ReservationField): string {
  return `rsv-${field}-error`
}

type Status = 'idle' | 'done'

/** 予約フォーム(フロントエンドバリデーションのみ。外部送信なし) */
export function ReservationForm() {
  const [values, setValues] = useState<ReservationValues>(emptyValues)
  const [errors, setErrors] = useState<ReservationErrors>({})
  const [showSummary, setShowSummary] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  const applyError = (field: ReservationField, message: string | undefined) => {
    setErrors((prev) => {
      const next = { ...prev }
      if (message) {
        next[field] = message
      } else {
        delete next[field]
      }
      return next
    })
  }

  const handleChange = (field: ReservationField, value: string) => {
    const next = { ...values, [field]: value }
    setValues(next)
    // 一度エラーになった項目は、入力のたびに再検証して直ちに解消を伝える
    if (errors[field]) {
      applyError(field, validateField(field, next, new Date()))
    }
  }

  const handleBlur = (field: ReservationField) => {
    applyError(field, validateField(field, values, new Date()))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const all = validateAll(values, new Date())
    setErrors(all)
    const invalidFields = FIELD_ORDER.filter((field) => all[field])

    if (invalidFields.length > 0) {
      setShowSummary(true)
      document.getElementById(fieldId(invalidFields[0]))?.focus()
      return
    }

    setShowSummary(false)
    setStatus('done')
  }

  if (status === 'done') {
    return (
      <div role="status" className={styles.doneBox}>
        <p className={styles.doneTitle}>予約フォームのデモが完了しました</p>
        <p className={styles.doneBody}>
          入力された内容は保存・送信されていません。実在する店舗への予約も成立していません。
        </p>
        <p className={styles.doneNote}>
          ご入力ありがとうございました。
        </p>
      </div>
    )
  }

  const invalidFields = FIELD_ORDER.filter((field) => errors[field])
  const today = new Date()

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {showSummary && invalidFields.length > 0 && (
        <div role="alert" className={styles.summary}>
          <p className={styles.summaryTitle}>
            入力内容に{invalidFields.length}件の不備があります
          </p>
          <ul className={styles.summaryList}>
            {invalidFields.map((field) => (
              <li key={field}>
                <a
                  href={`#${fieldId(field)}`}
                  className={styles.summaryLink}
                  onClick={(event) => {
                    event.preventDefault()
                    document.getElementById(fieldId(field))?.focus()
                  }}
                >
                  {FIELD_LABELS[field]}: {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor={fieldId('name')} className={styles.label}>
            お名前<span className={styles.required} aria-hidden="true">必須</span>
          </label>
          <input
            id={fieldId('name')}
            type="text"
            autoComplete="name"
            required
            maxLength={40}
            className={styles.input}
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId('name') : undefined}
          />
          {errors.name && (
            <p id={errorId('name')} className={styles.error}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor={fieldId('furigana')} className={styles.label}>
            ふりがな<span className={styles.required} aria-hidden="true">必須</span>
          </label>
          <input
            id={fieldId('furigana')}
            type="text"
            required
            className={styles.input}
            value={values.furigana}
            onChange={(e) => handleChange('furigana', e.target.value)}
            onBlur={() => handleBlur('furigana')}
            aria-invalid={Boolean(errors.furigana)}
            aria-describedby={errors.furigana ? errorId('furigana') : undefined}
          />
          {errors.furigana && (
            <p id={errorId('furigana')} className={styles.error}>
              {errors.furigana}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor={fieldId('phone')} className={styles.label}>
            電話番号<span className={styles.required} aria-hidden="true">必須</span>
          </label>
          <input
            id={fieldId('phone')}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            placeholder="090-0000-0000"
            className={styles.input}
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? errorId('phone') : undefined}
          />
          {errors.phone && (
            <p id={errorId('phone')} className={styles.error}>
              {errors.phone}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor={fieldId('email')} className={styles.label}>
            メールアドレス<span className={styles.required} aria-hidden="true">必須</span>
          </label>
          <input
            id={fieldId('email')}
            type="email"
            autoComplete="email"
            required
            className={styles.input}
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId('email') : undefined}
          />
          {errors.email && (
            <p id={errorId('email')} className={styles.error}>
              {errors.email}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor={fieldId('date')} className={styles.label}>
            お受け取り希望日<span className={styles.required} aria-hidden="true">必須</span>
          </label>
          <input
            id={fieldId('date')}
            type="date"
            required
            min={minDateString(today)}
            max={maxDateString(today)}
            className={styles.input}
            value={values.date}
            onChange={(e) => handleChange('date', e.target.value)}
            onBlur={() => handleBlur('date')}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={
              errors.date ? `${errorId('date')} rsv-date-hint` : 'rsv-date-hint'
            }
          />
          <p id="rsv-date-hint" className={styles.hint}>
            三日後から六十日先まで。水曜は定休日です。
          </p>
          {errors.date && (
            <p id={errorId('date')} className={styles.error}>
              {errors.date}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor={fieldId('time')} className={styles.label}>
            お受け取り時間<span className={styles.required} aria-hidden="true">必須</span>
          </label>
          <select
            id={fieldId('time')}
            required
            className={styles.input}
            value={values.time}
            onChange={(e) => handleChange('time', e.target.value)}
            onBlur={() => handleBlur('time')}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={errors.time ? errorId('time') : undefined}
          >
            <option value="">お選びください</option>
            {timeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.time && (
            <p id={errorId('time')} className={styles.error}>
              {errors.time}
            </p>
          )}
        </div>

        <fieldset
          className={styles.fieldset}
          aria-invalid={Boolean(errors.order)}
          aria-describedby={errors.order ? errorId('order') : undefined}
        >
          <legend className={styles.label}>
            ご注文内容<span className={styles.required} aria-hidden="true">必須</span>
          </legend>
          <div className={styles.radioGroup}>
            {orderOptions.map((option, index) => (
              <label key={option} className={styles.radioLabel}>
                <input
                  id={index === 0 ? fieldId('order') : `rsv-order-${index}`}
                  type="radio"
                  name="order"
                  required
                  className={styles.radio}
                  value={option}
                  checked={values.order === option}
                  onChange={(e) => handleChange('order', e.target.value)}
                  onBlur={() => handleBlur('order')}
                />
                {option}
              </label>
            ))}
          </div>
          {errors.order && (
            <p id={errorId('order')} className={styles.error}>
              {errors.order}
            </p>
          )}
        </fieldset>

        <div className={styles.field}>
          <label htmlFor={fieldId('quantity')} className={styles.label}>
            個数<span className={styles.required} aria-hidden="true">必須</span>
          </label>
          <input
            id={fieldId('quantity')}
            type="number"
            required
            min={1}
            max={10}
            inputMode="numeric"
            className={`${styles.input} ${styles.inputNarrow}`}
            value={values.quantity}
            onChange={(e) => handleChange('quantity', e.target.value)}
            onBlur={() => handleBlur('quantity')}
            aria-invalid={Boolean(errors.quantity)}
            aria-describedby={errors.quantity ? errorId('quantity') : undefined}
          />
          {errors.quantity && (
            <p id={errorId('quantity')} className={styles.error}>
              {errors.quantity}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor={fieldId('notes')} className={styles.label}>
            備考
          </label>
          <textarea
            id={fieldId('notes')}
            rows={4}
            maxLength={400}
            className={styles.input}
            value={values.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            onBlur={() => handleBlur('notes')}
            aria-invalid={Boolean(errors.notes)}
            aria-describedby={
              errors.notes ? `${errorId('notes')} rsv-notes-hint` : 'rsv-notes-hint'
            }
          />
          <p id="rsv-notes-hint" className={styles.hint}>
            アレルギーやのし紙のご希望などがあればご記入ください(400文字まで)。
          </p>
          {errors.notes && (
            <p id={errorId('notes')} className={styles.error}>
              {errors.notes}
            </p>
          )}
        </div>
      </div>

      <button type="submit" className={styles.submit}>
        入力内容を確認する
      </button>
      <p className={styles.formNote}>
        ※ 本サイトはコンセプトサイトです。フォームの内容が送信されることはありません。
      </p>
    </form>
  )
}
