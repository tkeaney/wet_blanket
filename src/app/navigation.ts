import { BookOpenText, CalendarDays, House, type LucideIcon } from 'lucide-react'

export type View = 'today' | 'calendar' | 'journal'

export interface NavItem {
  id: View
  label: string
  icon: LucideIcon
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'today', label: 'Today', icon: House },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'journal', label: 'Journal', icon: BookOpenText },
]

interface ViewMeta {
  eyebrow: string
  title: string
}

export const VIEW_META: Record<View, ViewMeta> = {
  today: { eyebrow: 'A check-in with yourself', title: 'A little space for today' },
  calendar: { eyebrow: 'Calendar', title: 'The days, as they were' },
  journal: { eyebrow: 'Journal', title: 'A place to put it down' },
}
