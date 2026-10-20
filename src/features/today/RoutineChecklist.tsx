import { Moon, Plus, Sun, Sunrise, type LucideIcon } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { SectionHeader } from '../../components/ui/SectionHeader'
import type { Period } from '../../domain/types'
import type { DayProgress, PeriodGroup } from '../../state/selectors'
import { RoutineRow } from './RoutineRow'
import styles from './RoutineChecklist.module.css'

const PERIOD_ICONS: Record<Period, LucideIcon> = { Morning: Sunrise, Afternoon: Sun, Evening: Moon }

interface RoutineChecklistProps {
  groups: PeriodGroup[]
  completions: Record<string, boolean>
  progress: DayProgress
  onToggle: (itemId: string) => void
  onAdd: () => void
}

export function RoutineChecklist({ groups, completions, progress, onToggle, onAdd }: RoutineChecklistProps) {
  const percent = progress.total ? Math.round((progress.done / progress.total) * 100) : 0

  return (
    <Card aria-labelledby="routine-title">
      <SectionHeader
        eyebrow="Your routine"
        title="A few things for today"
        titleId="routine-title"
        aside={<span className={styles.count}>{progress.done} / {progress.total} done</span>}
      />

      {progress.total > 0 && (
        <div className={styles.progress} role="progressbar" aria-label="Routine progress" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ width: `${percent}%` }} />
        </div>
      )}

      {groups.length === 0 ? (
        <div className={styles.empty}>
          <p>Nothing scheduled. That can be a plan, too.</p>
        </div>
      ) : (
        <div className={styles.groups}>
          {groups.map(({ period, habits, medications }) => {
            const Icon = PERIOD_ICONS[period]
            return (
              <section key={period} aria-label={period}>
                <h3 className={styles.periodLabel}><Icon size={14} /> {period}</h3>
                <ul className={styles.list}>
                  {[...habits, ...medications].map((item) => (
                    <RoutineRow key={item.id} item={item} done={Boolean(completions[item.id])} onToggle={() => onToggle(item.id)} />
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      )}

      <Button className={styles.add} variant="ghost" size="sm" icon={<Plus size={16} />} onClick={onAdd}>
        Add a habit or medication
      </Button>
    </Card>
  )
}
