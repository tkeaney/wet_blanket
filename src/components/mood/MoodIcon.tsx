import {
  FaceExpressionless, FaceGrinning, FaceNeutral, FaceSlightlyFrowning, FaceSlightlySmiling, type LucideIcon,
} from 'lucide-react'
import type { Mood } from '../../domain/types'

const ICONS: Record<Mood, LucideIcon> = {
  rough: FaceSlightlyFrowning,
  low: FaceExpressionless,
  okay: FaceNeutral,
  good: FaceSlightlySmiling,
  great: FaceGrinning,
}

interface MoodIconProps {
  mood: Mood
  size?: number
}

export function MoodIcon({ mood, size = 22 }: MoodIconProps) {
  const Icon = ICONS[mood]
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />
}
