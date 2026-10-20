import type { Mood, Period } from './types'

export const PERIODS: readonly Period[] = ['Morning', 'Afternoon', 'Evening']

/** Ordered from most muted to warmest; the order drives the color scale. */
export const MOODS: readonly { value: Mood; label: string }[] = [
  { value: 'rough', label: 'Rough' },
  { value: 'low', label: 'Low' },
  { value: 'okay', label: 'Okay' },
  { value: 'good', label: 'Good' },
  { value: 'great', label: 'Great' },
]

export function moodLabel(mood: Mood): string {
  return MOODS.find((item) => item.value === mood)?.label ?? mood
}

export function periodForTime(time: string): Period {
  const hour = Number(time.slice(0, 2))
  if (hour < 12) return 'Morning'
  if (hour < 17) return 'Afternoon'
  return 'Evening'
}
