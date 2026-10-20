/** ISO calendar date, e.g. `2026-10-20`. */
export type IsoDate = string

export type Period = 'Morning' | 'Afternoon' | 'Evening'

export type Mood = 'rough' | 'low' | 'okay' | 'good' | 'great'

export type RoutineKind = 'habit' | 'medication'

export interface RoutineItem {
  id: string
  name: string
  /** 24h `HH:mm` */
  time: string
  period: Period
}

export interface Medication extends RoutineItem {
  instructions: string
}

export interface DailyLog {
  mood?: Mood
  journal: string
}

export interface AppData {
  habits: RoutineItem[]
  medications: Medication[]
  logs: Record<IsoDate, DailyLog>
  completions: Record<IsoDate, Record<string, boolean>>
}

export interface NewRoutineInput {
  kind: RoutineKind
  name: string
  time: string
  instructions?: string
}
