import type { HTMLAttributes } from 'react'
import { cx } from '../../lib/cx'
import styles from './Card.module.css'

type CardTone = 'plain' | 'green' | 'purple'

interface CardProps extends HTMLAttributes<HTMLElement> {
  tone?: CardTone
}

export function Card({ tone = 'plain', className, ...rest }: CardProps) {
  return <section className={cx(styles.card, styles[tone], className)} {...rest} />
}
