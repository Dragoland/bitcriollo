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

const modules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
})

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
  const posts: Post[] = []

  for (const [path, raw] of Object.entries(modules)) {
    if (typeof raw !== 'string') continue

    const { data, content } = parseFrontmatter(raw)
    const slug = path.split('/').pop()?.replace(/\.md$/, '') || ''

    if (!data.title || !data.date) {
      console.warn(`Post ${slug} falta título o fecha`)
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
