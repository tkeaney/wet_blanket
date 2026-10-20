import type { AppData, DailyLog, IsoDate, Medication, Period, RoutineItem } from '../domain/types'

const EMPTY_LOG: DailyLog = { journal: '' }

export function selectDayLog(data: AppData, date: IsoDate): DailyLog {
  return data.logs[date] ?? EMPTY_LOG
}

export function selectDayCompletions(data: AppData, date: IsoDate): Record<string, boolean> {
  return data.completions[date] ?? {}
}

export interface DayProgress {
  done: number
  total: number
}

/** Counts only items that still exist, so deleted routines never inflate the tally. */
export function selectDayProgress(data: AppData, date: IsoDate): DayProgress {
  const completions = selectDayCompletions(data, date)
  const items = [...data.habits, ...data.medications]
  return { done: items.filter((item) => completions[item.id]).length, total: items.length }
}

export interface PeriodGroup {
  period: Period
  habits: RoutineItem[]
  medications: Medication[]
}

export function selectRoutineByPeriod(data: AppData, periods: readonly Period[]): PeriodGroup[] {
  const byTime = <T extends RoutineItem>(a: T, b: T) => a.time.localeCompare(b.time)
  return periods
    .map((period) => ({
      period,
      habits: data.habits.filter((item) => item.period === period).sort(byTime),
      medications: data.medications.filter((item) => item.period === period).sort(byTime),
    }))
    .filter((group) => group.habits.length + group.medications.length > 0)
}
