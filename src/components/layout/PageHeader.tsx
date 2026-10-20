import type { ReactNode } from 'react'
import styles from './PageHeader.module.css'

interface PageHeaderProps {
  eyebrow: string
  title: string
  meta?: string
  action?: ReactNode
}

export function PageHeader({ eyebrow, title, meta, action }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      {(meta || action) && (
        <div className={styles.metaRow}>
          {meta && <p className={styles.meta}>{meta}</p>}
          {action}
        </div>
      )}
    </header>
  )
}
