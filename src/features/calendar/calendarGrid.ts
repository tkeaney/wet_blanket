import { toIsoDate } from '../../lib/date'
import type { IsoDate } from '../../domain/types'

export const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

export interface CalendarCell {
  iso: IsoDate
  dayOfMonth: number
  inMonth: boolean
}

/** Six Monday-first weeks covering `month`, so the grid height never jumps. */
export function buildMonthGrid(month: Date): CalendarCell[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const mondayOffset = (first.getDay() + 6) % 7
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(first.getFullYear(), first.getMonth(), 1 - mondayOffset + index)
    return { iso: toIsoDate(date), dayOfMonth: date.getDate(), inMonth: date.getMonth() === month.getMonth() }
  })
}
