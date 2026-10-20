import { ChevronLeft, PenLine } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import type { IsoDate } from '../../domain/types'
import { formatLongDate } from '../../lib/date'
import styles from './JournalView.module.css'

interface JournalViewProps {
  date: IsoDate
  value: string
  onChange: (value: string) => void
  onBack: () => void
}

export function JournalView({ date, value, onChange, onBack }: JournalViewProps) {
  const words = value.trim() ? value.trim().split(/\s+/).length : 0

  return (
    <section className={styles.journal}>
      <div className={styles.paper}>
        <p className={styles.prompt}>
          <PenLine size={16} /> No format to follow. Start anywhere.
        </p>
        <label className="sr-only" htmlFor="journal-entry">Journal entry for {formatLongDate(date)}</label>
        <textarea
          id="journal-entry"
          className={styles.editor}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="What's taking up space in your mind?"
          spellCheck
        />
        <footer className={styles.footer}>
          <span className={styles.saved}><span className={styles.savedDot} /> Saved on this device as you write</span>
          <span>{words} {words === 1 ? 'word' : 'words'}</span>
        </footer>
      </div>
      <Button variant="ghost" size="sm" icon={<ChevronLeft size={16} />} onClick={onBack}>
        Back to today
      </Button>
    </section>
  )
}
