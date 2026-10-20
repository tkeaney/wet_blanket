import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  eyebrow?: ReactNode
  title: ReactNode
  titleId?: string
  description?: ReactNode
  aside?: ReactNode
  className?: string
}

export function SectionHeader({ eyebrow, title, titleId, description, aside, className }: SectionHeaderProps) {
  return (
    <header className={cx(styles.header, className)}>
      <div className={styles.copy}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 id={titleId} className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {aside && <div className={styles.aside}>{aside}</div>}
    </header>
  )
}
