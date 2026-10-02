import { useParams, Link } from 'react-router'
import { getProductBySlug } from '../lib/products'
import { ArrowLeft, MapPin, Star, ShoppingBag, MessageCircle, Check } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()

  let product: ReturnType<typeof getProductBySlug> = undefined
  let error: string | null = null

  try {
    product = slug ? getProductBySlug(slug) : undefined
  } catch (e) {
    error = 'No se pudo cargar el producto.'
    console.error('[ProductDetail] Error:', e)
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">Error</h1>
        <p className="text-muted-foreground mt-2">{error}</p>
        <Link to="/tienda" className="text-primary hover:underline mt-4 inline-block">← Volver a la tienda</Link>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">Producto no encontrado</h1>
        <p className="text-muted-foreground mt-2">El producto que buscas no existe o fue vendido.</p>
        <Link to="/tienda" className="text-primary hover:underline mt-4 inline-block">← Volver a la tienda</Link>
      </div>
    )
  }

  const categoryLabels: Record<string, string> = {
    pcs: 'PCs y Laptops',
    componentes: 'Componentes',
    perifericos: 'Periféricos',
    software: 'Software',
  }

  const buildWhatsAppLink = () => {
    const msg = `Hola Dragoland! Me interesa el producto "${product.title}" (${product.price}). ¿Sigue disponible?`
    return `https://wa.me/${product.whatsapp}?text=${encodeURIComponent(msg)}`
  }

  const buildWhatsAppNegotiateLink = () => {
    const msg = `Hola Dragoland! Ví el producto "${product.title}" (${product.price}). ¿Hay posibilidad de negociar el precio?`
    return `https://wa.me/${product.whatsapp}?text=${encodeURIComponent(msg)}`
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Breadcrumb */}
      <Link to="/tienda" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-mono text-sm">
        <ArrowLeft className="w-4 h-4" />
        ← Volver a la tienda
      </Link>

      <div className="grid lg:grid-cols-[55%_45%] gap-10">
        {/* Left - Images */}
        <div>
          <div className="aspect-[4/3] bg-secondary rounded-xl border border-border overflow-hidden mb-4">
            {product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag className="w-20 h-20 text-muted-foreground opacity-20" />
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <div key={i} className="w-20 h-20 rounded-lg border border-border overflow-hidden bg-secondary">
                  <img src={img} alt={`${product.title} ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right - Info */}
        <div>
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${
              product.condition === 'nuevo' ? 'bg-emerald-500 text-white' : 'bg-orange-400 text-white'
            }`}>
              {product.condition.toUpperCase()}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider border border-primary/30 text-primary bg-primary/5 px-2.5 py-1 rounded">
              {categoryLabels[product.category] || product.category}
            </span>
            {product.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-yellow-400 text-black px-2.5 py-1 rounded">
                <Star className="w-3 h-3" />
                Destacado
              </span>
            )}
          </div>

          <h1 className="font-mono font-extrabold text-2xl lg:text-3xl text-foreground mb-3">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground font-body mb-6">
            <MapPin className="w-4 h-4" />
            {product.location}
            <span className="mx-2">·</span>
            <span>Vendido por <strong className="text-foreground">{product.seller}</strong></span>
          </div>

          <div className="font-code text-4xl font-bold text-primary mb-8">
            {product.price}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 mb-8">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-semibold text-sm px-6 py-4 rounded-xl hover:brightness-110 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Comprar por WhatsApp
            </a>
            <a
              href={buildWhatsAppNegotiateLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-secondary border border-border text-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-all"
            >
              Negociar precio
            </a>
          </div>

          {/* Trust badges */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Producto verificado por BitCriollo</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Pago contra entrega en Falcón/Placetas</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Soporte post-venta incluido</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12">
        <h2 className="font-mono font-bold text-xl text-foreground mb-4">Descripción</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <article className="prose prose-invert max-w-none font-body text-muted-foreground leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {product.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>

      {/* Seller info */}
      <div className="mt-8 bg-gradient-to-br from-primary/5 to-transparent border border-border rounded-xl p-6">
        <h3 className="font-mono font-bold text-lg text-foreground mb-3">
          ¿Cómo funciona la compra?
        </h3>
        <div className="space-y-3 font-body text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">1.</strong> Escribes por WhatsApp diciendo que te interesa este producto.
          </p>
          <p>
            <strong className="text-foreground">2.</strong> Yo te confirmo disponibilidad y coordinamos entrega (presencial en Falcón/Placetas o envío).
          </p>
          <p>
            <strong className="text-foreground">3.</strong> Pagas al recibir el producto. Si es software, te envío el enlace de descarga después del pago.
          </p>
          <p>
            <strong className="text-foreground">4.</strong> Si el producto es de un tercero, yo me encargo de la negociación y te doy garantía de que lo que ves es lo que recibes.
          </p>
        </div>
      </div>
    </div>
  )
}
