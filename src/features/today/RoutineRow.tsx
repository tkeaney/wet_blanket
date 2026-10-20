import { Check, Pill } from 'lucide-react'
import type { Medication, RoutineItem } from '../../domain/types'
import { cx } from '../../lib/cx'
import { formatTime } from '../../lib/date'
import styles from './RoutineRow.module.css'

interface RoutineRowProps {
  item: RoutineItem | Medication
  done: boolean
  onToggle: () => void
}

export function RoutineRow({ item, done, onToggle }: RoutineRowProps) {
  const isMedication = 'instructions' in item

  return (
    <li className={cx(styles.row, done && styles.done)}>
      <button
        className={styles.check}
        role="checkbox"
        aria-checked={done}
        aria-label={item.name}
        onClick={onToggle}
      >
        {done && <Check size={14} strokeWidth={3} />}
      </button>
      <div className={styles.copy}>
        <span className={styles.name}>{item.name}</span>
        {isMedication && (
          <span className={styles.meta}>
            <Pill size={12} /> Medication{item.instructions && ` · ${item.instructions}`}
          </span>
        )}
      </div>
      <span className={styles.time}>{formatTime(item.time)}</span>
    </li>
  )
}
