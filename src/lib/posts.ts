import { getCasoIds, hasCaso } from './casos'
import { resolveCasoId } from './casoId'
import { asList, asString, parseFrontmatter } from './frontmatter'

export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  /** Imagen de portada (frontmatter `cover:`). Si existe, se muestra en el post
   *  y el prerender la usa como og:image. */
  cover: string
}

export interface Post extends PostMeta {
  content: string
  readingMinutes: number
  /** id del archivo de caso descargable (src/content/casos/<id>.md); null si el post no tiene. */
  caso: string | null
}

const modules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

const readingMinutes = (text: string) =>
  Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200))

// Se usa solo si no existe ningún .md en src/content/blog/
const fallbackContent = `# Bienvenido al Blog de BitCriollo

Este es el espacio donde comparto lo que aprendo, lo que rompo y lo que arreglo.

## ¿Qué encontrarás aquí?

- **Guías prácticas** de Linux, especialmente Arch Linux
- **Automatización** con Python y Bash
- **IA local**: cómo correr LLMs en tu propia máquina
- **Recuperación de datos** y seguridad digital
- **Reflexiones** de un informático universitario en Cuba

Si tienes algo que decir, escríbeme por Telegram o WhatsApp.

---

*Hecho con paciencia y café en Falcón, Placetas.*
`

const fallbackPosts: Post[] = [
  {
    slug: 'bienvenida',
    title: 'Bienvenido al Blog de BitCriollo',
    date: '2026-08-20',
    tags: ['bienvenida', 'bitcriollo', 'tecnología'],
    excerpt: 'Primer post del blog. De qué trata este espacio y qué encontrarás aquí.',
    cover: '',
    content: fallbackContent,
    readingMinutes: readingMinutes(fallbackContent),
    caso: null,
  },
]

/** La página ya muestra el título como <h1>; si el Markdown empieza con "# Título", se quita. */
const stripLeadingH1 = (md: string) => md.replace(/^\s*# [^\n]*\n+/, '')

function buildPosts(): Post[] {
  const posts: Post[] = []

  for (const [path, raw] of Object.entries(modules)) {
    if (typeof raw !== 'string') continue
    const { data, content } = parseFrontmatter(raw)
    const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? ''
    const title = asString(data.title)
    const date = asString(data.date)

    if (!slug || !title || !date) {
      console.warn(`[posts] "${slug}" ignorado: falta title o date en el frontmatter`)
      continue
    }
    // Los borradores (draft: true) solo se ven en desarrollo
    if (data.draft === true && !import.meta.env.DEV) continue

    posts.push({
      slug,
      title,
      date,
      tags: asList(data.tags),
      excerpt: asString(data.excerpt),
      cover: asString(data.cover),
      content: stripLeadingH1(content),
      readingMinutes: readingMinutes(content),
      caso: (() => {
        const id = resolveCasoId(asString(data.caso), slug)
        return hasCaso(id) ? id : null
      })(),
    })
  }

  if (posts.length === 0) return fallbackPosts
  return posts.sort((a, b) => b.date.localeCompare(a.date))
}

const posts = buildPosts()

// Aviso en desarrollo: un archivo de src/content/casos/ que ningún post está usando
if (import.meta.env.DEV) {
  const used = new Set(posts.map((p) => p.caso))
  for (const id of getCasoIds()) {
    if (!used.has(id)) {
      console.warn(`[casos] "${id}" no está enlazado a ningún post. Nombra el archivo igual que el post, o añade "caso: ${id}" al frontmatter del post.`)
    }
  }
}

export const getAllPosts = (): Post[] => posts
export const getPostBySlug = (slug: string): Post | undefined => posts.find((p) => p.slug === slug)
export const getAllTags = (): string[] => [...new Set(posts.flatMap((p) => p.tags))].sort()

/** Etiquetas usadas en 2+ entradas, de más a menos frecuentes (para los chips del blog). */
export const getPopularTags = (max = 12): string[] => {
  const counts = new Map<string, number>()
  for (const tag of posts.flatMap((p) => p.tags)) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  return [...counts]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, max)
    .map(([tag]) => tag)
}

/** "2026-08-20" → "20 ago 2026" (sin depender de la zona horaria). */
export function formatDate(dateStr: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateStr)
  if (!m) return dateStr
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`
}
