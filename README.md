# wet blanket

A softer place to land: daily mood check-ins, gentle habit and medication routines, and a private journal. All data stays in the browser (`localStorage`).

## Getting started

```sh
npm install
npm run dev     # start the dev server
npm run build   # type-check and build
npm run lint
```

## Project structure

```
src/
  main.tsx              Entry point
  app/                  App shell: root component, navigation config
  domain/               Types and pure domain rules (moods, periods)
  state/                Persisted state: storage, useAppData hook, selectors
  lib/                  Framework-agnostic helpers (dates, classnames, download)
  styles/               Design tokens and global base styles
  components/
    ui/                 Generic primitives (Button, Card, SectionHeader)
    layout/             Sidebar, Topbar, MobileNav, PageHeader
    brand/              Logo
    mood/               MoodIcon
  features/             One folder per screen
    today/ calendar/ journal/ settings/ composer/
```

### Conventions

- **Dependencies flow one way:** `features → components → state/domain/lib`. Features never import from each other.
- **Styling:** each component has a co-located CSS Module. Use the variables in `styles/tokens.css`, not raw colors or sizes.
- **Mood colors:** set `data-mood="<mood>"` on an element to get `--mood` and `--mood-soft` for its subtree.
- **State:** components get data through props. Only `App` calls `useAppData`, and derived values come from `state/selectors.ts`.
- **Responsive:** one breakpoint at `768px`. Below it, the sidebar becomes a bottom tab bar and dialogs become bottom sheets.
