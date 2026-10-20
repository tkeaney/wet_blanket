import { BookOpenText, CalendarDays, House, Settings2, type LucideIcon } from 'lucide-react'

export type View = 'today' | 'calendar' | 'journal' | 'settings'

export interface NavItem {
  id: View
  label: string
  icon: LucideIcon
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'today', label: 'Today', icon: House },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'journal', label: 'Journal', icon: BookOpenText },
  { id: 'settings', label: 'Settings', icon: Settings2 },
]

interface ViewMeta {
  eyebrow: string
  title: string
  /** Views tied to a specific day show its date and the "Add" action. */
  dated: boolean
}

export const VIEW_META: Record<View, ViewMeta> = {
  today: { eyebrow: 'A check-in with yourself', title: 'A little space for today', dated: true },
  calendar: { eyebrow: 'Calendar', title: 'The days, as they were', dated: true },
  journal: { eyebrow: 'Journal', title: 'A place to put it down', dated: true },
  settings: { eyebrow: 'Settings', title: 'Your space, your rules', dated: false },
}
