import { useParams, Link } from 'react-router'
import { getPostBySlug, formatDate } from '../lib/posts'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">Post no encontrado</h1>
        <Link to="/blog" className="text-primary hover:underline mt-4 inline-block">← Volver al blog</Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-mono text-sm">
        ← cd ..
      </Link>

      <header className="border-b border-border pb-6 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">{post.title}</h1>
        <div className="text-sm text-muted-foreground font-mono">
          {formatDate(post.date)} · {post.tags.join(', ')}
        </div>
      </header>

      <article className="prose prose-invert max-w-none font-body text-muted-foreground leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  )
}
