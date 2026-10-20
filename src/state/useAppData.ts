import { useEffect, useMemo, useState } from 'react'
import { periodForTime } from '../domain/routine'
import type { AppData, DailyLog, IsoDate, Mood, NewRoutineInput } from '../domain/types'
import { createEmptyData, loadData, saveData } from './storage'

export interface AppActions {
  setMood: (date: IsoDate, mood: Mood) => void
  setJournal: (date: IsoDate, journal: string) => void
  toggleCompletion: (date: IsoDate, itemId: string) => void
  addRoutineItem: (input: NewRoutineInput) => void
  clearAll: () => void
}

/** Single source of truth for persisted app state. */
export function useAppData(): { data: AppData; actions: AppActions } {
  const [data, setData] = useState<AppData>(loadData)

  useEffect(() => saveData(data), [data])

  const actions = useMemo<AppActions>(() => {
    const patchLog = (date: IsoDate, updates: Partial<DailyLog>) =>
      setData((current) => ({
        ...current,
        logs: { ...current.logs, [date]: { ...(current.logs[date] ?? { journal: '' }), ...updates } },
      }))

    return {
      setMood: (date, mood) => patchLog(date, { mood }),
      setJournal: (date, journal) => patchLog(date, { journal }),

      toggleCompletion: (date, itemId) =>
        setData((current) => {
          const day = current.completions[date] ?? {}
          return { ...current, completions: { ...current.completions, [date]: { ...day, [itemId]: !day[itemId] } } }
        }),

      addRoutineItem: ({ kind, name, time, instructions = '' }) =>
        setData((current) => {
          const base = { id: crypto.randomUUID(), name, time, period: periodForTime(time) }
          return kind === 'habit'
            ? { ...current, habits: [...current.habits, base] }
            : { ...current, medications: [...current.medications, { ...base, instructions }] }
        }),

      clearAll: () => setData(createEmptyData()),
    }
  }, [])

  return { data, actions }
}
