// Búsqueda, filtros y relaciones del blog. Son funciones puras (sin import.meta.glob)
// para poder probarlas con Vitest. posts.ts les pasa los posts reales.

export interface Searchable {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
}

/** Minúsculas y sin tildes: "Recuperación" → "recuperacion". */
export const fold = (s: string): string => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

/** "¿Qué es un firewall?" → "que-es-un-firewall" (para los id de los títulos). */
export const slugify = (text: string): string => fold(text).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

/** Palabras de la búsqueda, sin tildes ni repetidas: "Windows 10!" → ["windows", "10"]. */
export const tokenize = (query: string): string[] => [
  ...new Set(fold(query).split(/[^\p{L}\p{N}]+/u).filter(Boolean)),
]

interface Index {
  title: string
  tags: string
  excerpt: string
  body: string
}
const cache = new WeakMap<object, Index>()
const indexOf = (p: Searchable): Index => {
  let idx = cache.get(p)
  if (!idx) {
    idx = { title: fold(p.title), tags: fold(p.tags.join(' ')), excerpt: fold(p.excerpt), body: fold(p.content) }
    cache.set(p, idx)
  }
  return idx
}

// Coincide con el INICIO de una palabra: "recup" encuentra "recuperación", pero "bios" no encuentra
// "cambios". Los tokens solo tienen letras y números, así que es seguro meterlos en una RegExp.
const hasWord = (text: string, token: string) => new RegExp(`(^|[^\\p{L}\\p{N}])${token}`, 'u').test(text)

/** 0 = no coincide. Todas las palabras deben aparecer (título, etiquetas, resumen o cuerpo). */
export function scorePost(post: Searchable, tokens: string[]): number {
  if (tokens.length === 0) return 0
  const idx = indexOf(post)
  let total = 0
  for (const t of tokens) {
    let s = 0
    if (hasWord(idx.title, t)) s += 8
    if (hasWord(idx.tags, t)) s += 4
    if (hasWord(idx.excerpt, t)) s += 2
    if (hasWord(idx.body, t)) s += 1
    if (s === 0) return 0
    total += s
  }
  return total
}

export interface PostFilters {
  q?: string
  tag?: string | null
  month?: string | null // "2026-11"
}

/** Aplica etiqueta, mes y búsqueda. Con búsqueda ordena por relevancia; sin ella, respeta el orden recibido. */
export function filterPosts<T extends Searchable>(posts: T[], filters: PostFilters): T[] {
  let list = posts
  const { tag, month } = filters
  if (tag) list = list.filter((p) => p.tags.includes(tag))
  if (month) list = list.filter((p) => p.date.startsWith(month))

  const tokens = tokenize(filters.q ?? '')
  if (tokens.length === 0) return list

  return list
    .map((post) => ({ post, score: scorePost(post, tokens) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .map((x) => x.post)
}

/** [etiqueta, nº de entradas], de más a menos usada. */
export function getTagCounts(posts: Searchable[]): [string, number][] {
  const counts = new Map<string, number>()
  for (const tag of posts.flatMap((p) => p.tags)) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
}

const MONTHS_LONG = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]

export interface MonthCount {
  key: string // "2026-11"
  label: string // "Noviembre 2026"
  count: number
}

export const formatMonthKey = (key: string): string => {
  const m = /^(\d{4})-(\d{2})$/.exec(key)
  if (!m) return key
  const name = MONTHS_LONG[Number(m[2]) - 1] ?? m[2]
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${m[1]}`
}

/** Entradas por mes, de más reciente a más antiguo. */
export function getMonthCounts(posts: Searchable[]): MonthCount[] {
  const counts = new Map<string, number>()
  for (const p of posts) {
    const key = p.date.slice(0, 7)
    if (/^\d{4}-\d{2}$/.test(key)) counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return [...counts]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, count]) => ({ key, label: formatMonthKey(key), count }))
}

/** Entradas parecidas: más etiquetas en común primero; si faltan, completa con las más recientes. */
export function getRelatedPosts<T extends Searchable>(posts: T[], current: T, limit = 3): T[] {
  const mine = new Set(current.tags)
  return posts
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({ p, shared: p.tags.filter((t) => mine.has(t)).length }))
    .sort((a, b) => b.shared - a.shared || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map((x) => x.p)
}

/** `newer` = la siguiente publicada; `older` = la anterior. Espera `posts` de más nueva a más antigua. */
export function getAdjacentPosts<T extends Searchable>(posts: T[], slug: string): { newer?: T; older?: T } {
  const i = posts.findIndex((p) => p.slug === slug)
  if (i === -1) return {}
  return { newer: posts[i - 1], older: posts[i + 1] }
}

export interface Segment {
  text: string
  match: boolean
}

/** Parte un texto en trozos para resaltar las palabras buscadas (ignora tildes y mayúsculas). */
export function highlightSegments(text: string, tokens: string[]): Segment[] {
  if (!text || tokens.length === 0) return [{ text, match: false }]
  const folded = fold(text)
  // Si plegar cambia la longitud (texto con acentos descompuestos), no resaltamos para no desalinear.
  if (folded.length !== text.length) return [{ text, match: false }]

  const mask = new Array<boolean>(text.length).fill(false)
  for (const t of tokens) {
    let i = folded.indexOf(t)
    while (i !== -1) {
      const startsWord = i === 0 || !/[\p{L}\p{N}]/u.test(folded[i - 1])
      if (startsWord) for (let k = i; k < i + t.length; k++) mask[k] = true
      i = folded.indexOf(t, i + t.length)
    }
  }

  const segments: Segment[] = []
  let start = 0
  for (let k = 1; k <= text.length; k++) {
    if (k === text.length || mask[k] !== mask[start]) {
      segments.push({ text: text.slice(start, k), match: mask[start] })
      start = k
    }
  }
  return segments
}
