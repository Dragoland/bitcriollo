import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Rss, Search, X } from 'lucide-react'
import PostCard from '../components/blog/PostCard'
import Reveal from '../components/Reveal'
import { TelegramIcon } from '../components/icons'
import {
  filterPosts,
  formatMonthKey,
  getMonthCounts,
  getTagCounts,
  tokenize,
} from '../lib/blogSearch'
import { formatDate, getAllPosts } from '../lib/posts'
import { telegramUrl } from '../lib/site'
import { usePageMeta } from '../lib/usePageMeta'

const PAGE_SIZE = 8
const TOP_TAGS = 12

const chip = (active: boolean) =>
  `inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
    active
      ? 'border-primary bg-primary/10 text-primary'
      : 'border-border text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground'
  }`

export default function Blog() {
  usePageMeta({
    title: 'Blog DIUA — Diario de un Informático Universitario y Artista',
    description:
      'Guías de Linux, automatización con Python y Bash, IA local, recuperación de datos y reflexiones desde Cuba.',
    path: '/blog',
  })

  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const tag = params.get('tag')
  const month = params.get('mes')
  const searchRef = useRef<HTMLInputElement>(null)
  const [allTags, setAllTags] = useState(false)

  const all = getAllPosts()
  const tagCounts = useMemo(() => getTagCounts(all), [all])
  const months = useMemo(() => getMonthCounts(all), [all])
  const tokens = useMemo(() => tokenize(q), [q])
  const results = useMemo(() => filterPosts(all, { q, tag, month }), [all, q, tag, month])
  const filtering = Boolean(tokens.length || tag || month)

  // "Mostrar más": el contador se reinicia solo al cambiar cualquier filtro
  const filterKey = `${q}|${tag ?? ''}|${month ?? ''}`
  const [shown, setShown] = useState({ key: filterKey, extra: 0 })
  const extra = shown.key === filterKey ? shown.extra : 0

  const featured = filtering ? undefined : results[0]
  const rest = featured ? results.slice(1) : results
  const visible = rest.slice(0, PAGE_SIZE + extra)
  const remaining = rest.length - visible.length

  const update = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params)
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    setParams(next, { replace: true })
  }

  // Atajo: "/" enfoca el buscador (como en GitHub o YouTube)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return
      const el = e.target as HTMLElement | null
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable)) return
      e.preventDefault()
      searchRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const topTags = tagCounts.slice(0, TOP_TAGS)
  const sidebarTags = allTags ? tagCounts : topTags.some(([t]) => t === tag) || !tag ? topTags : [...topTags, [tag, 0] as [string, number]]
  const mobileTags = topTags.slice(0, 10)
  const newest = all[0]

  const tagButton = (t: string, count?: number) => (
    <button key={t} type="button" aria-pressed={tag === t} onClick={() => update({ tag: tag === t ? null : t })} className={chip(tag === t)}>
      {t}
      {count ? <span className="text-[10px] opacity-70">{count}</span> : null}
    </button>
  )

  return (
    <section className="py-16 lg:py-24">
      <div className="site-container">
        <header className="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              <span className="text-primary">//</span> BLOG_DIUA
            </div>
            <h1 className="mb-3 font-mono text-3xl font-extrabold tracking-tight text-foreground lg:text-[42px]">
              Diario de un Informático
            </h1>
            <p className="max-w-[560px] font-body text-base text-muted-foreground">
              Tutoriales que funcionan, cosas curiosas de la informática y lo que aprendo arreglando equipos en Cuba.
            </p>
          </div>
          {newest && (
            <p className="font-mono text-xs text-muted-foreground">
              {all.length} entradas · última: {formatDate(newest.date)}
            </p>
          )}
        </header>

        {/* Buscador */}
        <div role="search" className="relative mb-5">
          <label htmlFor="blog-buscar" className="sr-only">Buscar en el blog</label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="blog-buscar"
            ref={searchRef}
            type="search"
            value={q}
            onChange={(e) => update({ q: e.target.value || null })}
            onKeyDown={(e) => {
              if (e.key !== 'Escape') return
              if (q) update({ q: null })
              else e.currentTarget.blur()
            }}
            placeholder="Buscar por título, etiqueta o contenido…"
            autoComplete="off"
            className="w-full rounded-xl border border-border bg-card py-3.5 pl-11 pr-24 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
            {q ? (
              <button type="button" onClick={() => update({ q: null })} aria-label="Borrar búsqueda" className="rounded p-1 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground sm:inline" aria-hidden="true">/</kbd>
            )}
          </div>
        </div>

        {/* Etiquetas en móvil (en pantallas grandes están en la barra lateral) */}
        <div className="-mx-6 mb-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:hidden" role="group" aria-label="Filtrar por etiqueta">
          {mobileTags.map(([t, n]) => tagButton(t, n))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
          {/* Resultados */}
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground" aria-live="polite">
              <span>
                {results.length} {results.length === 1 ? 'entrada' : 'entradas'}
                {filtering && ` de ${all.length}`}
              </span>
              {tokens.length > 0 && (
                <button type="button" onClick={() => update({ q: null })} className={chip(true)}>
                  “{q.trim()}” <X className="h-3 w-3" aria-hidden="true" />
                  <span className="sr-only">quitar búsqueda</span>
                </button>
              )}
              {tag && (
                <button type="button" onClick={() => update({ tag: null })} className={chip(true)}>
                  #{tag} <X className="h-3 w-3" aria-hidden="true" />
                  <span className="sr-only">quitar etiqueta</span>
                </button>
              )}
              {month && (
                <button type="button" onClick={() => update({ mes: null })} className={chip(true)}>
                  {formatMonthKey(month)} <X className="h-3 w-3" aria-hidden="true" />
                  <span className="sr-only">quitar mes</span>
                </button>
              )}
              {filtering && (
                <button type="button" onClick={() => setParams({}, { replace: true })} className="text-primary underline-offset-2 hover:underline">
                  Limpiar filtros
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center">
                <Search className="mx-auto mb-4 h-10 w-10 text-muted-foreground opacity-40" aria-hidden="true" />
                <p className="mb-1 font-mono text-base font-semibold text-foreground">No encontré nada con ese filtro</p>
                <p className="mb-6 font-body text-sm text-muted-foreground">
                  Prueba con otra palabra, o mira estos temas:
                </p>
                <div className="mb-6 flex flex-wrap justify-center gap-2">
                  {topTags.slice(0, 5).map(([t]) => (
                    <button key={t} type="button" onClick={() => setParams({ tag: t }, { replace: true })} className={chip(false)}>
                      {t}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => setParams({}, { replace: true })} className="rounded-md border border-primary px-4 py-2 font-mono text-sm font-semibold text-primary hover:bg-primary/10">
                  Ver todas las entradas
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  {featured && <PostCard post={featured} featured />}
                  {visible.map((post) => (
                    <PostCard key={post.slug} post={post} tokens={tokens} />
                  ))}
                </div>
                {remaining > 0 && (
                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={() => setShown({ key: filterKey, extra: extra + PAGE_SIZE })}
                      className="rounded-lg border border-border bg-card px-6 py-3 font-mono text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      Mostrar más ({remaining} {remaining === 1 ? 'restante' : 'restantes'})
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Barra lateral: etiquetas, archivo y suscripción */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <section aria-labelledby="blog-etiquetas">
                <h2 id="blog-etiquetas" className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Etiquetas
                </h2>
                <div className="flex flex-wrap gap-2">
                  {sidebarTags.map(([t, n]) => tagButton(t, n))}
                </div>
                {tagCounts.length > TOP_TAGS && (
                  <button type="button" onClick={() => setAllTags((v) => !v)} className="mt-3 font-mono text-xs text-primary underline-offset-2 hover:underline">
                    {allTags ? 'Ver menos' : `Ver todas (${tagCounts.length})`}
                  </button>
                )}
              </section>

              {months.length > 1 && (
                <section aria-labelledby="blog-archivo">
                  <h2 id="blog-archivo" className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Archivo
                  </h2>
                  <ul className="space-y-1">
                    {months.map((m) => (
                      <li key={m.key}>
                        <button
                          type="button"
                          aria-pressed={month === m.key}
                          onClick={() => update({ mes: month === m.key ? null : m.key })}
                          className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left font-body text-sm transition-colors ${
                            month === m.key ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                          }`}
                        >
                          {m.label}
                          <span className="font-mono text-xs">{m.count}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <Reveal>
                <section aria-labelledby="blog-suscribirse" className="rounded-xl border border-border bg-card p-4">
                  <h2 id="blog-suscribirse" className="mb-1 font-mono text-sm font-bold text-foreground">No te pierdas nada</h2>
                  <p className="mb-3 font-body text-xs text-muted-foreground">Sigue las novedades como prefieras.</p>
                  <div className="flex flex-col gap-2">
                    <a href="/feed.xml" className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-xs text-foreground transition-colors hover:border-primary hover:text-primary">
                      <Rss className="h-4 w-4" aria-hidden="true" /> Feed RSS
                    </a>
                    <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-xs text-foreground transition-colors hover:border-primary hover:text-primary">
                      <TelegramIcon className="h-4 w-4" /> Canal de Telegram
                    </a>
                  </div>
                </section>
              </Reveal>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
