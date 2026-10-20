import { useState } from 'react'
import { MobileNav } from '../components/layout/MobileNav'
import { PageHeader } from '../components/layout/PageHeader'
import { Sidebar } from '../components/layout/Sidebar'
import { Topbar } from '../components/layout/Topbar'
import { CalendarView } from '../features/calendar/CalendarView'
import { RoutineComposer } from '../features/composer/RoutineComposer'
import { JournalView } from '../features/journal/JournalView'
import { SettingsView } from '../features/settings/SettingsView'
import { TodayView } from '../features/today/TodayView'
import { formatLongDate, todayIso } from '../lib/date'
import { downloadJson } from '../lib/download'
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
  const openComposer = () => setComposerOpen(true)

  function navigate(next: View) {
    setView(next)
    window.scrollTo({ top: 0 })
  }

  function exportData() {
    downloadJson(`wet-blanket-${todayIso()}.json`, data)
  }

  function clearAll() {
    if (window.confirm('Delete all saved habits, check-ins, and journal entries from this browser? This cannot be undone.')) {
      actions.clearAll()
    }
  }

  return (
    <div className={styles.shell}>
      <div className={styles.sidebar}>
        <Sidebar activeView={view} onNavigate={navigate} />
      </div>

      <div className={styles.main}>
        <Topbar
          view={view}
          selectedDate={selectedDate}
          showAdd={meta.dated}
          onAdd={openComposer}
          onJumpToToday={() => setSelectedDate(todayIso())}
        />

        <main className={styles.content}>
          <PageHeader eyebrow={meta.eyebrow} title={meta.title} meta={meta.dated ? formatLongDate(selectedDate) : undefined} />

          {view === 'today' && (
            <TodayView data={data} actions={actions} date={selectedDate} onAddRoutine={openComposer} onOpenJournal={() => navigate('journal')} />
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
          {view === 'settings' && <SettingsView onExport={exportData} onClearAll={clearAll} />}
        </main>
      </div>

      <MobileNav activeView={view} onNavigate={navigate} />

      {composerOpen && <RoutineComposer onSubmit={actions.addRoutineItem} onClose={() => setComposerOpen(false)} />}
    </div>
  )
}
