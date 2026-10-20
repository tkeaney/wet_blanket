import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IconButton } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { SectionHeader } from '../../components/ui/SectionHeader'
import type { AppData, IsoDate } from '../../domain/types'
import { addMonths, formatMonthYear, fromIsoDate, startOfMonth } from '../../lib/date'
import { selectDayLog, selectDayProgress } from '../../state/selectors'
import { DaySummary } from './DaySummary'
import { MonthGrid } from './MonthGrid'
import { MoodLegend } from './MoodLegend'
import styles from './CalendarView.module.css'

interface CalendarViewProps {
  data: AppData
  selectedDate: IsoDate
  onSelectDate: (date: IsoDate) => void
  onOpenDay: () => void
}

export function CalendarView({ data, selectedDate, onSelectDate, onOpenDay }: CalendarViewProps) {
  const [month, setMonth] = useState(() => startOfMonth(fromIsoDate(selectedDate)))

  return (
    <div className={styles.stack}>
      <Card aria-labelledby="month-title">
        <SectionHeader
          eyebrow="Your month, at your pace"
          title={formatMonthYear(month)}
          titleId="month-title"
          aside={
            <div className={styles.controls}>
              <IconButton label="Previous month" onClick={() => setMonth((current) => addMonths(current, -1))}>
                <ChevronLeft size={18} />
              </IconButton>
              <IconButton label="Next month" onClick={() => setMonth((current) => addMonths(current, 1))}>
                <ChevronRight size={18} />
              </IconButton>
            </div>
          }
        />
        <MonthGrid month={month} logs={data.logs} selectedDate={selectedDate} onSelect={onSelectDate} />
        <MoodLegend />
      </Card>

      <DaySummary
        date={selectedDate}
        log={selectDayLog(data, selectedDate)}
        progress={selectDayProgress(data, selectedDate)}
        onOpen={onOpenDay}
      />
    </div>
  )
}
