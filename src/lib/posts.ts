import matter from 'gray-matter'

const modules = import.meta.glob('../content/blog/*.md', { eager: true, query: '?raw' })

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

  for (const [path, mod] of Object.entries(modules)) {
    const raw = (mod as { default: string }).default ?? (mod as string)
    const { data, content } = matter(raw)
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
