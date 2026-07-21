import { Link } from 'react-router'
import { getAllPosts, formatDate } from '../lib/posts'

export const Blog = () => {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs text-primary font-mono">// PUBLICACIONES_RECIENTES</span>
        <h1 className="text-2xl font-bold text-foreground">Últimas entradas</h1>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No hay posts aún. Vuelve pronto.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block bg-card border border-border rounded-lg p-5 hover:border-primary hover:bg-accent transition-all hover:-translate-y-0.5"
            >
              <div className="text-xs text-muted-foreground font-mono mb-2">{formatDate(post.date)}</div>
              <h2 className="text-lg font-semibold text-foreground mb-1">{post.title}</h2>
              <p className="text-sm text-muted-foreground font-body line-clamp-2">{post.excerpt || 'Haz clic para leer la publicación completa...'}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded border border-primary/20 bg-primary/5 text-primary">
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
