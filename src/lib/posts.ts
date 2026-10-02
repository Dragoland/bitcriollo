// Parser de frontmatter simple, sin Buffer (funciona en browser)
function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const frontmatter = match[1]
  const content = match[2]

  const data: Record<string, any> = {}

  for (const line of frontmatter.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    // Arrays: tags: [meta, presentación]
    const arrayMatch = trimmed.match(/^(\w+):\s*\[(.*)\]$/)
    if (arrayMatch) {
      const values = arrayMatch[2].split(',').map(v => v.trim().replace(/^["']|["']$/g, ''))
      data[arrayMatch[1]] = values
      continue
    }

    // Key: value
    const kvMatch = trimmed.match(/^(\w+):\s*(.*)$/)
    if (kvMatch) {
      let value = kvMatch[2].trim().replace(/^["']|["']$/g, '')
      data[kvMatch[1]] = value
    }
  }

  return { data, content }
}

// Posts hardcodeados como fallback si import.meta.glob falla o no encuentra archivos
const fallbackPosts: Post[] = [
  {
    slug: 'bienvenida',
    title: 'Bienvenido al Blog de BitCriollo',
    date: '2026-08-20',
    tags: ['bienvenida', 'bitcriollo', 'tecnología'],
    excerpt: 'Primer post del blog. De qué trata este espacio y qué encontrarás aquí.',
    content: `# Bienvenido al Blog de BitCriollo

Este es el espacio donde comparto lo que aprendo, lo que rompo y lo que arreglo.

## ¿Qué encontrarás aquí?

- **Guías prácticas** de Linux, especialmente Arch Linux
- **Automatización** con Python y Bash
- **IA local**: cómo correr LLMs en tu propia máquina
- **Recuperación de datos** y seguridad digital
- **Reflexiones** de un informático universitario en Cuba

## Sobre los comentarios

No hay sección de comentarios. Si tienes algo que decir, escríbeme por Telegram o WhatsApp.

---

*Hecho con paciencia y café en Falcón, Placetas.*
`
  }
]

let cachedModules: Record<string, any> | null = null

function loadModules(): Record<string, any> {
  if (cachedModules !== null) return cachedModules

  try {
    // Vite import.meta.glob - en producción puede fallar si no hay archivos .md
    const mods = import.meta.glob('../content/blog/*.md', {
      eager: true,
      query: '?raw',
      import: 'default'
    })
    cachedModules = mods || {}
  } catch (e) {
    console.warn('[posts.ts] import.meta.glob falló:', e)
    cachedModules = {}
  }

  return cachedModules
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt?: string
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): Post[] {
  const modules = loadModules()
  const posts: Post[] = []

  for (const [path, rawModule] of Object.entries(modules)) {
    // El módulo puede ser un string directo o un objeto { default: string }
    let raw: string | undefined

    if (typeof rawModule === 'string') {
      raw = rawModule
    } else if (rawModule && typeof rawModule === 'object') {
      // Intentar obtener el default export
      const mod = rawModule as any
      if (typeof mod.default === 'string') {
        raw = mod.default
      }
    }

    if (!raw || typeof raw !== 'string') {
      console.warn(`[posts.ts] Módulo ${path} no tiene contenido string válido`)
      continue
    }

    const { data, content } = parseFrontmatter(raw)
    const slug = path.split('/').pop()?.replace(/\.md$/, '') || ''

    if (!data.title || !data.date) {
      console.warn(`[posts.ts] Post ${slug} falta título o fecha`)
      continue
    }

    posts.push({
      slug,
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      content,
    })
  }

  // Si no se encontraron posts desde archivos, usar fallback
  if (posts.length === 0) {
    console.log('[posts.ts] No se encontraron posts .md, usando fallback')
    return [...fallbackPosts]
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find(p => p.slug === slug)
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}
