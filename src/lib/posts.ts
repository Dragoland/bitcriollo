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
  },
]

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
      content,
      readingMinutes: readingMinutes(content),
    })
  }

  if (posts.length === 0) return fallbackPosts
  return posts.sort((a, b) => b.date.localeCompare(a.date))
}

const posts = buildPosts()

export const getAllPosts = (): Post[] => posts
export const getPostBySlug = (slug: string): Post | undefined => posts.find((p) => p.slug === slug)
export const getAllTags = (): string[] => [...new Set(posts.flatMap((p) => p.tags))].sort()

/** "2026-08-20" → "20 ago 2026" (sin depender de la zona horaria). */
export function formatDate(dateStr: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateStr)
  if (!m) return dateStr
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`
}
