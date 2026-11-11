import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Clock, Paperclip } from 'lucide-react'
import Highlight from './Highlight'
import { formatDate } from '../../lib/posts'
import type { Post } from '../../lib/posts'

interface PostCardProps {
  post: Post
  /** Palabras buscadas, para resaltarlas */
  tokens?: string[]
  /** Tarjeta grande (la última entrada) */
  featured?: boolean
}

export default function PostCard({ post, tokens = [], featured = false }: PostCardProps) {
  const [coverFailed, setCoverFailed] = useState(false)
  const maxTags = featured ? 5 : 3
  const hiddenTags = post.tags.length - maxTags

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow focus-within:ring-2 focus-within:ring-ring ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {post.cover && !coverFailed && (
        <img
          src={post.cover}
          alt=""
          loading="lazy"
          className={`w-full border-b border-border object-cover ${featured ? 'aspect-[21/9]' : 'aspect-[16/9]'}`}
          onError={() => setCoverFailed(true)}
        />
      )}

      <div className={`flex flex-1 flex-col ${featured ? 'p-6 lg:p-8' : 'p-5'}`}>
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
          {featured && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">Última entrada</span>
          )}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" /> {post.readingMinutes} min
          </span>
          {post.caso && (
            <span className="flex items-center gap-1 text-primary" title="Incluye el expediente técnico para descargar">
              <Paperclip className="h-3 w-3" aria-hidden="true" /> Expediente
            </span>
          )}
        </div>

        <h2
          className={`font-mono font-bold leading-snug text-foreground ${
            featured ? 'mb-3 text-2xl lg:text-3xl' : 'mb-2 text-lg'
          }`}
        >
          {/* Enlace "estirado": toda la tarjeta es clicable */}
          <Link
            to={`/blog/${post.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-primary focus-visible:outline-none"
          >
            <Highlight text={post.title} tokens={tokens} />
          </Link>
        </h2>

        <p
          className={`mb-4 flex-1 font-body leading-relaxed text-muted-foreground ${
            featured ? 'line-clamp-4 text-base' : 'line-clamp-3 text-sm'
          }`}
        >
          <Highlight text={post.excerpt || 'Haz clic para leer la entrada completa…'} tokens={tokens} />
        </p>

        <div className="flex items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5" aria-label="Etiquetas">
            {post.tags.slice(0, maxTags).map((tag) => (
              <li key={tag} className="rounded border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-[11px] text-primary">
                {tag}
              </li>
            ))}
            {hiddenTags > 0 && <li className="px-1 py-0.5 font-mono text-[11px] text-muted-foreground">+{hiddenTags}</li>}
          </ul>
          <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </article>
  )
}
