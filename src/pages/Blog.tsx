import { Link } from 'react-router-dom'
import { getAllPosts, formatDate } from '../lib/posts'

export const Blog = () => {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs text-accent-blue font-mono">// PUBLICACIONES_RECIENTES</span>
        <h1 className="text-2xl font-bold">Últimas entradas</h1>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-text-dim">
          <p>No hay posts aún. Vuelve pronto.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block bg-card border border-border rounded-lg p-5 hover:border-accent-blue hover:bg-card-hover transition-all hover:-translate-y-0.5"
            >
              <div className="text-xs text-text-dim font-mono mb-2">{formatDate(post.date)}</div>
              <h2 className="text-lg font-semibold text-text mb-1">{post.title}</h2>
              <p className="text-sm text-text-muted font-body line-clamp-2">{post.excerpt || 'Haz clic para leer la publicación completa...'}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded border border-accent-blue/20 bg-accent-blue/5 text-accent-blue">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
