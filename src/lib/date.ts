import type { IsoDate } from '../domain/types'

const LOCALE = 'en'

export function toIsoDate(date: Date): IsoDate {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

/** Parses at local noon so DST shifts never move the calendar day. */
export function fromIsoDate(value: IsoDate): Date {
  return new Date(`${value}T12:00:00`)
}

export function todayIso(): IsoDate {
  return toIsoDate(new Date())
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

export function formatLongDate(value: IsoDate): string {
  return new Intl.DateTimeFormat(LOCALE, { weekday: 'long', month: 'long', day: 'numeric' }).format(fromIsoDate(value))
}

export function formatShortDate(value: IsoDate): string {
  return new Intl.DateTimeFormat(LOCALE, { month: 'short', day: 'numeric' }).format(fromIsoDate(value))
}

export function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric' }).format(date)
}

/** Formats a 24h `HH:mm` string for display, e.g. `9:00 PM`. */
export function formatTime(value: string): string {
  const [hour = '0', minute = '00'] = value.split(':')
  const date = new Date()
  date.setHours(Number(hour), Number(minute), 0, 0)
  return new Intl.DateTimeFormat(LOCALE, { hour: 'numeric', minute: '2-digit' }).format(date)
}
