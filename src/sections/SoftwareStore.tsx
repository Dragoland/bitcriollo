import { Link } from 'react-router'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { getProductsByCategory } from '../lib/products'

/** Página /software: productos de software desarrollados por mí. */
export default function SoftwareStore() {
  const products = getProductsByCategory('software')

  return (
    <section className="py-20 lg:py-28">
      <div className="site-container">
        <SectionHeader
          as="h1"
          eyebrow="SOFTWARE_PARA_VENDER"
          title="Software listo para tu negocio"
          description="Soluciones digitales desarrolladas por mí. Incluyen instalación, configuración y capacitación."
        />

        {products.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <ShoppingBag className="mx-auto mb-4 h-12 w-12 opacity-30" aria-hidden="true" />
            <p className="font-mono">No hay software disponible aún.</p>
          </div>
        ) : (
          <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </Reveal>
        )}

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
