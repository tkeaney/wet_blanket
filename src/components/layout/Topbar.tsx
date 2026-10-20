import { Plus } from 'lucide-react'
import { NAV_ITEMS, type View } from '../../app/navigation'
import type { IsoDate } from '../../domain/types'
import { formatShortDate, todayIso } from '../../lib/date'
import { Logo } from '../brand/Logo'
import { Button, IconButton } from '../ui/Button'
import styles from './Topbar.module.css'

interface TopbarProps {
  view: View
  selectedDate: IsoDate
  showAdd: boolean
  onAdd: () => void
  onJumpToToday: () => void
}

export function Topbar({ view, selectedDate, showAdd, onAdd, onJumpToToday }: TopbarProps) {
  const viewLabel = NAV_ITEMS.find((item) => item.id === view)?.label
  const isToday = selectedDate === todayIso()

  return (
    <header className={styles.topbar}>
      <div className={styles.mobileBrand}>
        <Logo size={28} />
        <strong>wet blanket</strong>
      </div>

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <span>Your space</span>
        <span className={styles.divider}>/</span>
        <span className={styles.current}>{viewLabel}</span>
        {showAdd && (
          <>
            <span className={styles.divider}>/</span>
            <span>{formatShortDate(selectedDate)}</span>
          </>
        )}
      </nav>

      <div className={styles.actions}>
        {showAdd && !isToday && (
          <Button size="sm" variant="ghost" onClick={onJumpToToday}>
            Back to today
          </Button>
        )}
        {showAdd && (
          <>
            <Button className={styles.addDesktop} size="sm" variant="primary" icon={<Plus size={16} strokeWidth={2.4} />} onClick={onAdd}>
              Add to day
            </Button>
            <IconButton className={styles.addMobile} label="Add to day" onClick={onAdd}>
              <Plus size={20} strokeWidth={2.2} />
            </IconButton>
          </>
        )}
      </div>
    </header>
  )
}
