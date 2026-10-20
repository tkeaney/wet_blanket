import { PERIODS } from '../../domain/routine'
import type { AppData, IsoDate } from '../../domain/types'
import { selectDayCompletions, selectDayLog, selectDayProgress, selectRoutineByPeriod } from '../../state/selectors'
import type { AppActions } from '../../state/useAppData'
import { JournalTeaser } from './JournalTeaser'
import { MoodCheckIn } from './MoodCheckIn'
import { RoutineChecklist } from './RoutineChecklist'
import styles from './TodayView.module.css'

interface TodayViewProps {
  data: AppData
  actions: AppActions
  date: IsoDate
  onAddRoutine: () => void
  onOpenJournal: () => void
}

export function TodayView({ data, actions, date, onAddRoutine, onOpenJournal }: TodayViewProps) {
  const log = selectDayLog(data, date)

  return (
    <div className={styles.stack}>
      <MoodCheckIn value={log.mood} onChange={(mood) => actions.setMood(date, mood)} />
      <RoutineChecklist
        groups={selectRoutineByPeriod(data, PERIODS)}
        completions={selectDayCompletions(data, date)}
        progress={selectDayProgress(data, date)}
        onToggle={(itemId) => actions.toggleCompletion(date, itemId)}
        onAdd={onAddRoutine}
      />
      <JournalTeaser hasEntry={Boolean(log.journal)} onOpen={onOpenJournal} />
    </div>
  )
}
