import { Sparkles } from 'lucide-react'
import { NAV_ITEMS, type View } from '../../app/navigation'
import { cx } from '../../lib/cx'
import { Logo } from '../brand/Logo'
import styles from './Sidebar.module.css'

interface SidebarProps {
  activeView: View
  onNavigate: (view: View) => void
}

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <button className={styles.brand} onClick={() => onNavigate('today')} aria-label="Wet Blanket home">
        <Logo size={36} />
        <span className={styles.brandCopy}>
          <strong>wet blanket</strong>
          <small>a softer place to land</small>
        </span>
      </button>

      <p className={styles.caption}>Your space</p>
      <nav className={styles.nav} aria-label="Main navigation">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={cx(styles.navItem, activeView === id && styles.active)}
            aria-current={activeView === id ? 'page' : undefined}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} strokeWidth={1.9} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.note}>
          <Sparkles size={16} />
          <p>Care counts, even when it is small.</p>
        </div>
        <p className={styles.saved}>
          <span className={styles.savedDot} /> Saved on this device
        </p>
      </div>
    </aside>
  )
}
