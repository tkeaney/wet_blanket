import type { ReactNode } from 'react'
import { ArrowDownToLine, ChevronRight, Pill, ShieldCheck, Trash2 } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { cx } from '../../lib/cx'
import styles from './SettingsView.module.css'

interface SettingsViewProps {
  onExport: () => void
  onClearAll: () => void
}

export function SettingsView({ onExport, onClearAll }: SettingsViewProps) {
  return (
    <div className={styles.stack}>
      <Card tone="green" className={styles.banner}>
        <span className={styles.bannerIcon}><ShieldCheck size={20} /></span>
        <div>
          <h2>Your entries stay in this browser.</h2>
          <p>This first version stores information in local browser storage. It is not encrypted, synced, or backed up.</p>
        </div>
      </Card>

      <section aria-labelledby="data-settings-title">
        <h2 id="data-settings-title" className={styles.groupLabel}>Your information</h2>
        <div className={styles.group}>
          <SettingRow icon={<ArrowDownToLine size={18} />} title="Export your data" description="Download a JSON copy of your habits and entries." onClick={onExport} />
          <SettingRow icon={<Trash2 size={18} />} title="Delete everything" description="Remove all data saved by this app in this browser." onClick={onClearAll} destructive />
        </div>
      </section>

      <p className={styles.footnote}>
        <Pill size={16} />
        Medication tracking is for your personal record only. Follow your clinician's instructions; this app does not provide medical advice.
      </p>
    </div>
  )
}

interface SettingRowProps {
  icon: ReactNode
  title: string
  description: string
  onClick: () => void
  destructive?: boolean
}

function SettingRow({ icon, title, description, onClick, destructive = false }: SettingRowProps) {
  return (
    <button className={cx(styles.row, destructive && styles.destructive)} onClick={onClick}>
      <span className={styles.rowIcon}>{icon}</span>
      <span className={styles.rowCopy}>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <ChevronRight size={17} className={styles.chevron} />
    </button>
  )
}
