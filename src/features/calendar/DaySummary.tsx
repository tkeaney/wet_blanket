import { BookOpenText, CheckCircle2, ChevronRight } from 'lucide-react'
import { MoodIcon } from '../../components/mood/MoodIcon'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { moodLabel } from '../../domain/routine'
import type { DailyLog, IsoDate } from '../../domain/types'
import { formatLongDate } from '../../lib/date'
import type { DayProgress } from '../../state/selectors'
import styles from './DaySummary.module.css'

interface DaySummaryProps {
  date: IsoDate
  log: DailyLog
  progress: DayProgress
  onOpen: () => void
}

export function DaySummary({ date, log, progress, onOpen }: DaySummaryProps) {
  return (
    <Card className={styles.summary} aria-label="Selected day">
      <div className={styles.copy}>
        <h3>{formatLongDate(date)}</h3>
        <div className={styles.chips}>
          {log.mood ? (
            <span className={styles.chip} data-mood={log.mood}>
              <MoodIcon mood={log.mood} size={14} /> {moodLabel(log.mood)}
            </span>
          ) : (
            <span className={styles.chip}>No check-in</span>
          )}
          <span className={styles.chip}>
            <CheckCircle2 size={14} /> {progress.done} of {progress.total} done
          </span>
          {log.journal && (
            <span className={styles.chip}>
              <BookOpenText size={14} /> Journal note
            </span>
          )}
        </div>
      </div>
      <Button trailingIcon={<ChevronRight size={16} />} onClick={onOpen}>
        Open day
      </Button>
    </Card>
  )
}
