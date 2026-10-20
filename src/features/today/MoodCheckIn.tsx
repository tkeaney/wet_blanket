import { Sparkles } from 'lucide-react'
import { MoodIcon } from '../../components/mood/MoodIcon'
import { Card } from '../../components/ui/Card'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { MOODS } from '../../domain/routine'
import type { Mood } from '../../domain/types'
import { cx } from '../../lib/cx'
import styles from './MoodCheckIn.module.css'

interface MoodCheckInProps {
  value?: Mood
  onChange: (mood: Mood) => void
}

export function MoodCheckIn({ value, onChange }: MoodCheckInProps) {
  return (
    <Card tone="purple" aria-labelledby="mood-title">
      <SectionHeader
        eyebrow={<><Sparkles size={12} /> No right answer</>}
        title="How are you arriving today?"
        titleId="mood-title"
        description="Just notice. You don't have to fix anything right now."
      />
      <div className={styles.options} role="group" aria-label="Choose today's mood">
        {MOODS.map((mood) => (
          <button
            key={mood.value}
            data-mood={mood.value}
            className={cx(styles.option, value === mood.value && styles.selected)}
            aria-pressed={value === mood.value}
            onClick={() => onChange(mood.value)}
          >
            <span className={styles.face}>
              <MoodIcon mood={mood.value} />
            </span>
            <span className={styles.label}>{mood.label}</span>
          </button>
        ))}
      </div>
    </Card>
  )
}
