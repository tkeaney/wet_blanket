import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Plus, X } from 'lucide-react'
import { Button, IconButton } from '../../components/ui/Button'
import { SectionHeader } from '../../components/ui/SectionHeader'
import type { NewRoutineInput, RoutineKind } from '../../domain/types'
import { cx } from '../../lib/cx'
import styles from './RoutineComposer.module.css'

const KIND_COPY: Record<RoutineKind, { tab: string; nameLabel: string; placeholder: string; defaultTime: string }> = {
  habit: { tab: 'Habit', nameLabel: 'What would you like to do?', placeholder: 'e.g. Step outside for a minute', defaultTime: '08:00' },
  medication: { tab: 'Medication', nameLabel: 'Medication name', placeholder: 'Enter the name as prescribed', defaultTime: '09:00' },
}

interface RoutineComposerProps {
  onSubmit: (input: NewRoutineInput) => void
  onClose: () => void
}

/** Modal for adding a habit or medication. Mount it to open; unmount to close. */
export function RoutineComposer({ onSubmit, onClose }: RoutineComposerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [kind, setKind] = useState<RoutineKind>('habit')
  const copy = KIND_COPY[kind]

  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.showModal()
    // showModal() focuses the first focusable (the close button); start on the name field instead.
    dialog?.querySelector<HTMLInputElement>('input[name="name"]')?.focus()
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    if (!name) return
    onSubmit({
      kind,
      name,
      time: String(form.get('time') || copy.defaultTime),
      instructions: String(form.get('instructions') ?? '').trim(),
    })
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="composer-title"
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <div className={styles.sheet}>
        <span className={styles.grabber} aria-hidden="true" />
        <SectionHeader
          eyebrow="Make it yours"
          title="Add to your routine"
          titleId="composer-title"
          aside={<IconButton label="Close" onClick={onClose}><X size={18} /></IconButton>}
        />

        <div className={styles.tabs} role="tablist" aria-label="What to add">
          {(Object.keys(KIND_COPY) as RoutineKind[]).map((option) => (
            <button
              key={option}
              role="tab"
              aria-selected={kind === option}
              className={cx(styles.tab, kind === option && styles.tabSelected)}
              onClick={() => setKind(option)}
            >
              {KIND_COPY[option].tab}
            </button>
          ))}
        </div>

        {/* Keyed by kind so fields and defaults reset when switching tabs. */}
        <form key={kind} className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>{copy.nameLabel}</span>
            <input name="name" placeholder={copy.placeholder} required autoFocus autoComplete="off" />
          </label>

          {kind === 'medication' && (
            <label className={styles.field}>
              <span>Dose or note <em>optional</em></span>
              <input name="instructions" placeholder="e.g. 1 tablet with food" autoComplete="off" />
            </label>
          )}

          <label className={styles.field}>
            <span>Time</span>
            <input name="time" type="time" defaultValue={copy.defaultTime} required />
          </label>

          <Button type="submit" variant="primary" fullWidth icon={<Plus size={17} />}>
            Add {copy.tab.toLowerCase()}
          </Button>
        </form>
      </div>
    </dialog>
  )
}
