import { useRef } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import CasoDownload from '../components/blog/CasoDownload'
import PostCard from '../components/blog/PostCard'
import ReadingProgress from '../components/blog/ReadingProgress'
import ShareButtons from '../components/blog/ShareButtons'
import TableOfContents from '../components/blog/TableOfContents'
import { useActiveHeading, useHeadings } from '../components/blog/useHeadings'
import Markdown from '../components/Markdown'
import { getAdjacentPosts, getRelatedPosts } from '../lib/blogSearch'
import { formatDate, getAllPosts, getPostBySlug } from '../lib/posts'
import type { Post } from '../lib/posts'
import { SITE, WA, telegramUrl, waLink } from '../lib/site'
import { usePageMeta } from '../lib/usePageMeta'

const absolute = (url: string) => (/^https?:\/\//.test(url) ? url : `${SITE.url}${url}`)

function PostView({ post }: { post: Post }) {
  const path = `/blog/${post.slug}`
  usePageMeta({ title: post.title, description: post.excerpt || undefined, path })

  const bodyRef = useRef<HTMLDivElement>(null)
  const headings = useHeadings(bodyRef, post.slug)
  const active = useActiveHeading(headings)
  const showToc = headings.length >= 3

  const all = getAllPosts()
  const related = getRelatedPosts(all, post, 3)
  const { newer, older } = getAdjacentPosts(all, post.slug)

  // Datos estructurados para buscadores (se escapa "<" para que nada cierre la etiqueta <script>)
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || undefined,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'es',
    mainEntityOfPage: `${SITE.url}${path}`,
    image: post.cover ? absolute(post.cover) : `${SITE.url}/og-image.png`,
    author: { '@type': 'Person', name: SITE.owner, url: `${SITE.url}/sobre-mi` },
    publisher: { '@type': 'Organization', name: SITE.name },
  }).replace(/</g, '\\u003c')

  return (
    <>
      <ReadingProgress targetRef={bodyRef} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <article className="py-10 lg:py-16">
        <div className="site-container">
          <nav aria-label="Migas de pan" className="mb-8 flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <Link to="/blog" className="inline-flex shrink-0 items-center gap-1.5 text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="truncate">{post.title}</span>
          </nav>

          {/* Tres columnas en pantallas grandes: compartir · texto · índice */}
          <div className="lg:grid lg:grid-cols-[minmax(0,44rem)_15rem] lg:justify-center lg:gap-x-12 xl:grid-cols-[2.25rem_minmax(0,44rem)_15rem]">
            <div className="hidden xl:block">
              <div className="sticky top-28">
                <ShareButtons title={post.title} path={path} orientation="col" withTop />
              </div>
            </div>

            <div className="min-w-0">
              <header className="mb-8">
                <ul className="mb-4 flex flex-wrap gap-2" aria-label="Etiquetas">
                  {post.tags.map((t) => (
                    <li key={t}>
                      <Link to={`/blog?tag=${encodeURIComponent(t)}`} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs text-primary transition-colors hover:bg-primary/10">
                        {t}
                      </Link>
                    </li>
                  ))}
                </ul>
                <h1 className="mb-4 font-mono text-3xl font-extrabold leading-tight tracking-tight text-foreground lg:text-4xl">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="mb-6 font-body text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
                )}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-border py-3 font-mono text-sm text-muted-foreground">
                  <span>
                    Por <Link to="/sobre-mi" className="text-foreground hover:text-primary">{SITE.handle}</Link>
                  </span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {post.readingMinutes} min de lectura
                  </span>
                  <div className="xl:hidden sm:ml-auto">
                    <ShareButtons title={post.title} path={path} />
                  </div>
                </div>
              </header>

              {post.cover && (
                <img
                  src={post.cover}
                  alt=""
                  loading="lazy"
                  className="mb-8 aspect-[2/1] w-full rounded-xl border border-border object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              )}

              {showToc && <TableOfContents headings={headings} active={active} variant="inline" />}

              <div ref={bodyRef}>
                <Markdown size="reading">{post.content}</Markdown>
              </div>

              {post.caso && <CasoDownload id={post.caso} title={post.title} />}

              <footer className="mt-12 border-t border-border pt-8">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <p className="font-mono text-sm text-muted-foreground">¿Te sirvió? Compártela:</p>
                  <ShareButtons title={post.title} path={path} />
                </div>

                <aside className="rounded-xl border border-border bg-card p-6">
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
              </footer>
            </div>

            {/* Columna derecha: índice fijo y atajo de contacto */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {showToc && <TableOfContents headings={headings} active={active} variant="sidebar" />}
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="mb-1 font-mono text-sm font-bold text-foreground">¿Dudas con esto?</p>
                  <p className="mb-3 font-body text-xs text-muted-foreground">Pregúntame directamente.</p>
                  <a
                    href={waLink(`${WA.duda} (vi la entrada "${post.title}")`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-md bg-primary px-3 py-2 text-center text-xs font-semibold text-primary-foreground hover:brightness-110"
                  >
                    Escribir por WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Anterior / siguiente y entradas relacionadas */}
      <section aria-label="Seguir leyendo" className="border-t border-border bg-secondary/40 py-12 lg:py-16">
        <div className="site-container">
          {(newer || older) && (
            <nav aria-label="Entradas anterior y siguiente" className="mb-12 grid gap-4 sm:grid-cols-2">
              {older ? (
                <Link to={`/blog/${older.slug}`} className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
                  <span className="mb-1 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Entrada anterior
                  </span>
                  <span className="font-mono text-sm font-bold text-foreground group-hover:text-primary">{older.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {newer && (
                <Link to={`/blog/${newer.slug}`} className="group rounded-xl border border-border bg-card p-5 text-right transition-colors hover:border-primary/40 sm:col-start-2">
                  <span className="mb-1 flex items-center justify-end gap-1.5 font-mono text-xs text-muted-foreground">
                    Siguiente entrada <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-sm font-bold text-foreground group-hover:text-primary">{newer.title}</span>
                </Link>
              )}
            </nav>
          )}

          {related.length > 0 && (
            <>
              <h2 className="mb-6 font-mono text-xl font-bold text-foreground">Sigue leyendo</h2>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) return <PostNotFound slug={slug} />
  // `key` reinicia índice, progreso y scroll al pasar de una entrada a otra
  return <PostView key={post.slug} post={post} />
}

function PostNotFound({ slug }: { slug?: string }) {
  usePageMeta({ title: 'Entrada no encontrada', path: `/blog/${slug ?? ''}` })
  const latest = getAllPosts().slice(0, 3)
  return (
    <section className="site-container py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-2 font-code text-5xl font-extrabold text-primary">404</p>
        <h1 className="font-mono text-2xl font-bold text-foreground">Entrada no encontrada</h1>
        <p className="mt-2 text-muted-foreground">Puede que se haya movido o que el enlace tenga un error.</p>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Ver todas las entradas
        </Link>
      </div>
      {latest.length > 0 && (
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {latest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </section>
  )
}
