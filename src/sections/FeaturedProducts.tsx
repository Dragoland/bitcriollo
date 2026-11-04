import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { getFeaturedProducts } from '../lib/products'

/** Portada: hasta 3 productos destacados de la tienda. */
export default function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 3)
  if (featured.length === 0) return null

  return (
    <section className="py-20 lg:py-28">
      <div className="site-container">
        <SectionHeader
          eyebrow="TIENDA"
          title="Destacado en la tienda"
          description="Software propio, PCs y componentes. Yo me encargo de todo; tú solo escribes por WhatsApp."
        />
        <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </Reveal>
        <div className="mt-12 text-center">
          <Link
            to="/tienda"
            className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
          >
            Ver toda la tienda <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
