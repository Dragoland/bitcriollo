import { Link, useSearchParams } from 'react-router'
import { Clock } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { formatDate, getAllPosts, getPopularTags } from '../lib/posts'
import { usePageMeta } from '../lib/usePageMeta'

export default function Blog() {
  usePageMeta({
    title: 'Blog DIUA — Diario de un Informático Universitario y Artista',
    description: 'Guías de Linux, automatización con Python y Bash, IA local, recuperación de datos y reflexiones desde Cuba.',
    path: '/blog',
  })

  const [params, setParams] = useSearchParams()
  const tag = params.get('tag')
  const allPosts = getAllPosts()
  const tags = getPopularTags()
  if (tag && !tags.includes(tag)) tags.push(tag) // que el chip activo siempre se vea
  const posts = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
      active ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:text-foreground'
    }`

  return (
    <section className="py-20 lg:py-28">
      <div className="site-container max-w-4xl">
        <SectionHeader
          as="h1"
          eyebrow="PUBLICACIONES_RECIENTES"
          title="Últimas entradas"
          description="Lo que aprendo, lo que rompo y lo que arreglo."
        />

        {tags.length > 1 && (
          <div role="group" aria-label="Filtrar por etiqueta" className="mb-8 flex flex-wrap justify-center gap-2">
            <button type="button" aria-pressed={!tag} onClick={() => setParams({}, { replace: true })} className={chip(!tag)}>
              Todas
            </button>
            {tags.map((t) => (
              <button key={t} type="button" aria-pressed={tag === t} onClick={() => setParams({ tag: t }, { replace: true })} className={chip(tag === t)}>
                {t}
              </button>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">No hay entradas con esa etiqueta todavía.</p>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary"
              >
                <div className="mb-2 flex items-center gap-3 font-mono text-xs text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden="true" /> {post.readingMinutes} min
                  </span>
                </div>
                <h2 className="mb-1 text-lg font-semibold text-foreground">{post.title}</h2>
                <p className="line-clamp-2 font-body text-sm text-muted-foreground">
                  {post.excerpt || 'Haz clic para leer la publicación completa…'}
                </p>
                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <span key={t} className="rounded border border-primary/20 bg-primary/5 px-2 py-0.5 text-xs text-primary">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
