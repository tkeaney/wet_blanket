import { MOODS } from '../../domain/routine'
import styles from './MoodLegend.module.css'

export function MoodLegend() {
  return (
    <ul className={styles.legend} aria-label="Mood colors">
      {MOODS.map((mood) => (
        <li key={mood.value} data-mood={mood.value}>
          <span className={styles.swatch} /> {mood.label}
        </li>
      ))}
      <li>
        <span className={styles.journal} /> Journal note
      </li>
    </ul>
  )
}
