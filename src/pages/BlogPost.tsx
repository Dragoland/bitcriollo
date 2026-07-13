import { useParams, Link } from 'react-router-dom'
import { getPostBySlug, formatDate } from '../lib/posts'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-accent-red">Post no encontrado</h1>
        <Link to="/blog" className="text-accent-blue hover:underline mt-4 inline-block">← Volver al blog</Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link to="/blog" className="inline-flex items-center gap-2 text-accent-blue hover:underline mb-6 font-mono text-sm">
        ← cd ..
      </Link>

      <header className="border-b border-border pb-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-sm text-text-dim font-mono">
          {formatDate(post.date)} · {post.tags.join(', ')}
        </div>
      </header>

      <article className="prose prose-invert dark:prose-invert prose-pre:bg-card prose-pre:border prose-pre:border-border prose-code:text-accent-orange prose-a:text-accent-blue max-w-none font-body text-text-muted leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  )
}
