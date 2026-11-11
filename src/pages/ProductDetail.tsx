import { Link, useParams } from 'react-router'
import { ArrowLeft, Check, MapPin, MessageCircle, Star } from 'lucide-react'
import ImageGallery from '../components/ImageGallery'
import Markdown from '../components/Markdown'
import { getProductCategory } from '../data/productCategories'
import { getProductBySlug } from '../lib/products'
import type { Product } from '../lib/products'
import { waLink } from '../lib/site'
import { usePageMeta } from '../lib/usePageMeta'

function ProductView({ product }: { product: Product }) {
  usePageMeta({
    title: product.title,
    description: product.description || undefined,
    path: `/tienda/${product.slug}`,
  })

  const category = getProductCategory(product.category)
  const isNew = ['nuevo', 'como nuevo'].includes(product.condition)
  const buy = waLink(`Hola Dragoland! Me interesa el producto "${product.title}" (${product.price}). ¿Sigue disponible?`, product.whatsapp)
  const negotiate = waLink(`Hola Dragoland! Vi el producto "${product.title}" (${product.price}). ¿Hay posibilidad de negociar el precio?`, product.whatsapp)

  return (
    <article className="py-16 lg:py-24">
      <div className="site-container max-w-5xl">
        <Link to="/tienda" className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver a la tienda
        </Link>

        <div className="grid gap-10 lg:grid-cols-[55%_45%]">
          <ImageGallery images={product.images} title={product.title} />

          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className={`rounded px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-background ${isNew ? 'bg-remote' : 'bg-hardware'}`}>
                {product.condition}
              </span>
              <span className={`rounded border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${category.badge}`}>
                {category.label}
              </span>
              {product.featured && (
                <span className="inline-flex items-center gap-1 rounded bg-store px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-background">
                  <Star className="h-3 w-3" aria-hidden="true" /> Destacado
                </span>
              )}
            </div>

            <h1 className="mb-3 font-mono text-2xl font-extrabold text-foreground lg:text-3xl">{product.title}</h1>

            <p className="mb-6 flex flex-wrap items-center gap-x-2 font-body text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" aria-hidden="true" /> {product.location}
              <span aria-hidden="true">·</span>
              <span>
                Vendido por <strong className="text-foreground">{product.seller}</strong>
              </span>
            </p>

            <div className="mb-8 font-code text-4xl font-bold text-primary">{product.price}</div>

            <div className="mb-8 space-y-3">
              <a
                href={buy}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> Comprar por WhatsApp
              </a>
              <a
                href={negotiate}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                Negociar precio
              </a>
            </div>

            <ul className="space-y-2 rounded-xl border border-border bg-card p-4">
              {['Producto verificado por BitCriollo', 'Pago contra entrega en Falcón/Placetas', 'Soporte post-venta incluido'].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-remote" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-4 font-mono text-xl font-bold text-foreground">Descripción</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <Markdown>{product.content}</Markdown>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-6">
          <h2 className="mb-3 font-mono text-lg font-bold text-foreground">¿Cómo funciona la compra?</h2>
          <ol className="space-y-3 font-body text-sm text-muted-foreground">
            <li><strong className="text-foreground">1.</strong> Escribes por WhatsApp diciendo que te interesa este producto.</li>
            <li><strong className="text-foreground">2.</strong> Yo te confirmo disponibilidad y coordinamos la entrega (presencial en Falcón/Placetas o envío).</li>
            <li><strong className="text-foreground">3.</strong> Pagas al recibir el producto. Si es software, te envío el enlace de descarga después del pago.</li>
            <li><strong className="text-foreground">4.</strong> Si el producto es de un tercero, yo me encargo de la negociación y te doy garantía de que lo que ves es lo que recibes.</li>
          </ol>
        </div>
      </div>
    </article>
  )
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined

  if (!product) {
    return (
      <section className="site-container py-24 text-center">
        <h1 className="font-mono text-2xl font-bold text-foreground">Producto no encontrado</h1>
        <p className="mt-2 text-muted-foreground">El producto que buscas no existe o ya fue vendido.</p>
        <Link to="/tienda" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver a la tienda
        </Link>
      </section>
    )
  }

  // `key` reinicia la galería al cambiar de producto
  return <ProductView key={product.slug} product={product} />
}
