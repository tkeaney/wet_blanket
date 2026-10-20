import { BookOpenText, ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import styles from './JournalTeaser.module.css'

interface JournalTeaserProps {
  hasEntry: boolean
  onOpen: () => void
}

export function JournalTeaser({ hasEntry, onOpen }: JournalTeaserProps) {
  return (
    <Card tone="green" className={styles.teaser} aria-labelledby="journal-teaser-title">
      <span className={styles.icon}><BookOpenText size={20} /></span>
      <div className={styles.copy}>
        <h2 id="journal-teaser-title">Want to get something out of your head?</h2>
        <p>{hasEntry ? 'Your note for today is saved.' : 'A sentence is enough. An unfinished thought is enough.'}</p>
      </div>
      <Button trailingIcon={<ChevronRight size={16} />} onClick={onOpen}>
        {hasEntry ? 'Continue writing' : 'Write a little'}
      </Button>
    </Card>
  )
}
