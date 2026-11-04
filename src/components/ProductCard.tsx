import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, MapPin, Star } from 'lucide-react'
import { getProductCategory } from '../data/productCategories'
import type { Product } from '../lib/products'
import { waLink } from '../lib/site'

export default function ProductCard({ product }: { product: Product }) {
  const category = getProductCategory(product.category)
  const Icon = category.icon
  const [imageFailed, setImageFailed] = useState(false)
  const cover = product.images[0]
  const isNew = product.condition === 'nuevo'
  const buyLink = waLink(
    `Hola Dragoland! Me interesa el producto "${product.title}" (${product.price}). ¿Sigue disponible?`,
    product.whatsapp
  )

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-glow">
      <Link
        to={`/tienda/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-secondary"
        aria-label={`Ver detalles de ${product.title}`}
      >
        {cover && !imageFailed ? (
          <img
            src={cover}
            alt={product.title}
            loading="lazy"
            width={800}
            height={600}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Icon className="h-16 w-16 text-muted-foreground opacity-20" aria-hidden="true" />
          </div>
        )}
        {product.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded bg-store px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-background">
            <Star className="h-3 w-3" aria-hidden="true" /> Destacado
          </span>
        )}
        <span
          className={`absolute right-3 top-3 rounded px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-background ${
            isNew ? 'bg-remote' : 'bg-hardware'
          }`}
        >
          {product.condition}
        </span>
      </Link>

      <div className="p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${category.badge}`}>
            <Icon className="h-3 w-3" aria-hidden="true" />
            {category.label}
          </span>
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {product.location}
          </span>
        </div>

        <h3 className="mb-2 font-mono text-[15px] font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
          <Link to={`/tienda/${product.slug}`}>{product.title}</Link>
        </h3>

        <p className="mb-4 line-clamp-2 font-body text-sm leading-relaxed text-muted-foreground">{product.description}</p>

        <div className="flex items-center justify-between gap-3">
          <span className="font-code text-lg font-bold text-primary">{product.price}</span>
          <a
            href={buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-primary transition-opacity hover:opacity-80"
          >
            Comprar <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}
