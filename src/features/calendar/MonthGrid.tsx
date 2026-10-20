import { moodLabel } from '../../domain/routine'
import type { DailyLog, IsoDate } from '../../domain/types'
import { cx } from '../../lib/cx'
import { formatLongDate, todayIso } from '../../lib/date'
import { buildMonthGrid, WEEKDAY_LABELS } from './calendarGrid'
import styles from './MonthGrid.module.css'

interface MonthGridProps {
  month: Date
  logs: Record<IsoDate, DailyLog>
  selectedDate: IsoDate
  onSelect: (date: IsoDate) => void
}

export function MonthGrid({ month, logs, selectedDate, onSelect }: MonthGridProps) {
  const today = todayIso()

  return (
    <div className={styles.grid}>
      {WEEKDAY_LABELS.map((day) => (
        <div key={day} className={styles.weekday} aria-hidden="true">
          <span className={styles.weekdayLong}>{day}</span>
          <span className={styles.weekdayShort}>{day[0]}</span>
        </div>
      ))}
      {buildMonthGrid(month).map(({ iso, dayOfMonth, inMonth }) => {
        const mood = logs[iso]?.mood
        const hasJournal = Boolean(logs[iso]?.journal)
        return (
          <button
            key={iso}
            data-mood={mood}
            className={cx(
              styles.day,
              !inMonth && styles.outside,
              mood && styles.hasMood,
              iso === today && styles.today,
              iso === selectedDate && styles.selected,
            )}
            aria-label={`${formatLongDate(iso)}, ${mood ? `mood ${moodLabel(mood)}` : 'no mood logged'}`}
            aria-pressed={iso === selectedDate}
            onClick={() => onSelect(iso)}
          >
            <span className={styles.number}>{dayOfMonth}</span>
            {hasJournal && <span className={styles.journalMark} aria-hidden="true" />}
          </button>
        )
      })}
    </div>
  )
}
