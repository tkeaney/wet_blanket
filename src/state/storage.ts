import type { AppData } from '../domain/types'

const STORAGE_KEY = 'wet-blanket-data-v1'

export function createEmptyData(): AppData {
  return { habits: [], medications: [], logs: {}, completions: {} }
}

function createStarterData(): AppData {
  return {
    ...createEmptyData(),
    habits: [
      { id: 'jumping', name: 'Jump for one minute', time: '07:30', period: 'Morning' },
      { id: 'flossing', name: 'Floss', time: '21:00', period: 'Evening' },
      { id: 'gua-sha', name: 'Gua sha', time: '21:15', period: 'Evening' },
    ],
  }
}

function isAppData(value: unknown): value is AppData {
  const candidate = value as Partial<AppData> | null
  return Boolean(candidate && Array.isArray(candidate.habits) && Array.isArray(candidate.medications))
}

export function loadData(): AppData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return createStarterData()
    const parsed: unknown = JSON.parse(saved)
    return isAppData(parsed) ? { ...createEmptyData(), ...parsed } : createStarterData()
  } catch {
    return createStarterData()
  }
}

export function saveData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage can be full or blocked (private mode); the in-memory state still works.
  }
}
