import { useState } from 'react'
import { MobileNav } from '../components/layout/MobileNav'
import { PageHeader } from '../components/layout/PageHeader'
import { Topbar } from '../components/layout/Topbar'
import { Button } from '../components/ui/Button'
import { CalendarView } from '../features/calendar/CalendarView'
import { RoutineComposer } from '../features/composer/RoutineComposer'
import { JournalView } from '../features/journal/JournalView'
import { TodayView } from '../features/today/TodayView'
import { formatLongDate, todayIso } from '../lib/date'
import { selectDayLog } from '../state/selectors'
import { useAppData } from '../state/useAppData'
import { VIEW_META, type View } from './navigation'
import styles from './App.module.css'

export function App() {
  const { data, actions } = useAppData()
  const [view, setView] = useState<View>('today')
  const [selectedDate, setSelectedDate] = useState(todayIso)
  const [composerOpen, setComposerOpen] = useState(false)

  const meta = VIEW_META[view]
  const isToday = selectedDate === todayIso()

  function navigate(next: View) {
    setView(next)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className={styles.shell}>
      <Topbar activeView={view} onNavigate={navigate} />

      <main className={styles.content}>
        <PageHeader
          eyebrow={meta.eyebrow}
          title={meta.title}
          meta={formatLongDate(selectedDate)}
          action={!isToday && (
            <Button size="sm" variant="ghost" onClick={() => setSelectedDate(todayIso())}>
              Back to today
            </Button>
          )}
        />

        {view === 'today' && (
          <TodayView
            data={data}
            actions={actions}
            date={selectedDate}
            onAddRoutine={() => setComposerOpen(true)}
            onOpenJournal={() => navigate('journal')}
          />
        )}
        {view === 'calendar' && (
          <CalendarView data={data} selectedDate={selectedDate} onSelectDate={setSelectedDate} onOpenDay={() => navigate('today')} />
        )}
        {view === 'journal' && (
          <JournalView
            date={selectedDate}
            value={selectDayLog(data, selectedDate).journal}
            onChange={(journal) => actions.setJournal(selectedDate, journal)}
            onBack={() => navigate('today')}
          />
        )}
      </main>

      <MobileNav activeView={view} onNavigate={navigate} />

      {composerOpen && <RoutineComposer onSubmit={actions.addRoutineItem} onClose={() => setComposerOpen(false)} />}
    </div>
  )
}
