import { NAV_ITEMS, type View } from '../../app/navigation'
import { cx } from '../../lib/cx'
import { Logo } from '../brand/Logo'
import styles from './Topbar.module.css'

interface TopbarProps {
  activeView: View
  onNavigate: (view: View) => void
}

/** Brand + primary navigation. On phones the tabs move to MobileNav. */
export function Topbar({ activeView, onNavigate }: TopbarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.inner}>
        <button className={styles.brand} onClick={() => onNavigate('today')} aria-label="Wet Blanket home">
          <Logo size={38} />
          <strong>wet blanket</strong>
        </button>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={cx(styles.navItem, activeView === id && styles.active)}
              aria-current={activeView === id ? 'page' : undefined}
              onClick={() => onNavigate(id)}
            >
              <Icon size={16} strokeWidth={2} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
