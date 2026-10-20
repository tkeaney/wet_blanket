import styles from './PageHeader.module.css'

interface PageHeaderProps {
  eyebrow: string
  title: string
  meta?: string
}

export function PageHeader({ eyebrow, title, meta }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      {meta && <p className={styles.meta}>{meta}</p>}
    </header>
  )
}
