import { NAV_ITEMS, type View } from '../../app/navigation'
import { cx } from '../../lib/cx'
import styles from './MobileNav.module.css'

interface MobileNavProps {
  activeView: View
  onNavigate: (view: View) => void
}

export function MobileNav({ activeView, onNavigate }: MobileNavProps) {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={cx(styles.item, activeView === id && styles.active)}
          aria-current={activeView === id ? 'page' : undefined}
          onClick={() => onNavigate(id)}
        >
          <span className={styles.iconWrap}>
            <Icon size={20} strokeWidth={1.9} />
          </span>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}
