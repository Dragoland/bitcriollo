import { useState } from 'react'
import type { Heading } from './useHeadings'

interface TableOfContentsProps {
  headings: Heading[]
  active: string | null
  /** sidebar: columna fija en pantallas grandes · inline: desplegable en móvil */
  variant: 'sidebar' | 'inline'
}

function goTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  window.history.replaceState(window.history.state, '', `#${id}`)
}

function List({ headings, active, onSelect }: { headings: Heading[]; active: string | null; onSelect?: () => void }) {
  return (
    <ol className="space-y-0.5 border-l border-border">
      {headings.map((h) => {
        const isActive = h.id === active
        return (
          <li key={h.id}>
            <button
              type="button"
              aria-current={isActive ? 'location' : undefined}
              onClick={() => {
                goTo(h.id)
                onSelect?.()
              }}
              className={`-ml-px block w-full border-l-2 py-1 text-left font-body leading-snug transition-colors ${
                h.level === 3 ? 'pl-6 text-[13px]' : 'pl-4 text-sm'
              } ${
                isActive
                  ? 'border-primary font-medium text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {h.text}
            </button>
          </li>
        )
      })}
    </ol>
  )
}

export default function TableOfContents({ headings, active, variant }: TableOfContentsProps) {
  const [open, setOpen] = useState(false)

  if (variant === 'inline') {
    return (
      <details
        open={open}
        onToggle={(e) => setOpen(e.currentTarget.open)}
        className="mb-8 rounded-lg border border-border bg-card px-4 py-3 lg:hidden"
      >
        <summary className="cursor-pointer font-mono text-sm font-semibold text-foreground">
          En esta entrada ({headings.length})
        </summary>
        <div className="mt-3">
          <List headings={headings} active={active} onSelect={() => setOpen(false)} />
        </div>
      </details>
    )
  }

  return (
    <nav aria-label="Contenido de la entrada">
      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">En esta entrada</p>
      <List headings={headings} active={active} />
    </nav>
  )
}
