import { Link, useParams } from 'react-router'
import { ArrowLeft, Clock } from 'lucide-react'
import Markdown from '../components/Markdown'
import { formatDate, getPostBySlug } from '../lib/posts'
import { SITE, WA, telegramUrl, waLink } from '../lib/site'
import { usePageMeta } from '../lib/usePageMeta'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  usePageMeta({
    title: post?.title ?? 'Entrada no encontrada',
    description: post?.excerpt || undefined,
    path: `/blog/${slug ?? ''}`,
  })

  if (!post) {
    return (
      <section className="site-container py-24 text-center">
        <h1 className="font-mono text-2xl font-bold text-foreground">Entrada no encontrada</h1>
        <p className="mt-2 text-muted-foreground">Puede que se haya movido o que el enlace tenga un error.</p>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al blog
        </Link>
      </section>
    )
  }

  return (
    <article className="py-16 lg:py-24">
      <div className="site-container max-w-3xl">
        <Link to="/blog" className="mb-6 inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> cd ..
        </Link>

        <header className="mb-8 border-b border-border pb-6">
          <h1 className="mb-3 font-mono text-3xl font-bold text-foreground">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {post.readingMinutes} min de lectura
            </span>
            {post.tags.map((t) => (
              <Link key={t} to={`/blog?tag=${encodeURIComponent(t)}`} className="text-primary hover:underline">
                #{t}
              </Link>
            ))}
          </div>
        </header>

        <Markdown>{post.content}</Markdown>

        <aside className="mt-12 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-2 font-mono text-lg font-bold text-foreground">¿Necesitas ayuda con algo parecido?</h2>
          <p className="mb-4 font-body text-sm text-muted-foreground">
            Soy {SITE.owner.split(' ')[0]} ({SITE.handle}). Escríbeme y lo vemos; la primera orientación es gratis.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={waLink(`${WA.duda} (vi la entrada "${post.title}")`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110"
            >
              Escribir por WhatsApp
            </a>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
            >
              Seguir el canal de Telegram
            </a>
          </div>
        </aside>
      </div>
    </article>
  )
}
