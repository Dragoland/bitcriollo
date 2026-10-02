import { useState } from 'react'
import { Link } from 'react-router'
import { getProductsByCategory } from '../lib/products'
import { Zap, ShoppingBag, Star, ArrowRight, MapPin } from "lucide-react"

export default function SoftwareStore() {
  let products: ReturnType<typeof getProductsByCategory> = []
  try {
    products = getProductsByCategory('software')
  } catch (e) {
    console.error('[SoftwareStore] Error:', e)
  }

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const buildWhatsAppLink = (title: string, price: string) => {
    const msg = `Hola Dragoland! Me interesa el software "${title}" (${price}). Quisiera más información.`
    return `https://wa.me/5356418463?text=${encodeURIComponent(msg)}`
  }

  return (
    <div className="py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw]">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center justify-center gap-2">
            <span className="text-primary">//</span> SOFTWARE_PARA_VENDER
          </div>
          <h2 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-foreground mb-4">
            Software listo para tu negocio
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-[600px] mx-auto">
            Soluciones digitales desarrolladas por mí. Incluye instalación, configuración y capacitación.
          </p>
        </div>

        {/* Products grid */}
        {products.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-mono">No hay software disponible aún.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {products.map((product, idx) => (
              <div
                key={product.slug}
                className={`bg-card border rounded-2xl overflow-hidden transition-all duration-300 ${
                  product.featured
                    ? 'border-primary/40 shadow-glow'
                    : 'border-border hover:border-primary/30'
                }`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="grid lg:grid-cols-2">
                  {/* Info */}
                  <div className="p-8 lg:p-10">
                    {product.featured && (
                      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-semibold mb-5">
                        <Star className="w-3 h-3" /> Destacado
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-mono font-bold text-xl text-foreground">{product.title}</h3>
                      </div>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                      {product.description}
                    </p>

                    {/* Features from content */}
                    <div className="space-y-1.5 mb-6">
                      {product.content.split('\n').filter(line => line.startsWith('- ')).slice(0, 4).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                          <Zap className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{feat.replace('- ', '')}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-baseline gap-2 mb-5">
                      <span className="font-code text-2xl font-bold text-primary">{product.price}</span>
                      <span className="font-body text-xs text-muted-foreground">{product.location}</span>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Link
                        to={`/tienda/${product.slug}`}
                        className="px-4 py-2 border border-border text-muted-foreground hover:text-foreground hover:border-primary rounded-lg text-sm font-mono transition-all"
                      >
                        Ver detalles
                      </Link>
                      <a
                        href={buildWhatsAppLink(product.title, product.price)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:brightness-110 transition-all"
                      >
                        Me interesa
                      </a>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={`border-l border-border flex items-center justify-center p-8 lg:p-10 ${
                    product.featured
                      ? 'bg-gradient-to-br from-primary/5 to-emerald-400/5'
                      : 'bg-secondary'
                  }`}>
                    <div className="relative">
                      <div className="w-[220px] h-[400px] bg-card border-2 border-border rounded-[28px] overflow-hidden shadow-2xl">
                        <div className="h-5 bg-card border-b border-border flex items-center justify-center">
                          <div className="w-16 h-3 bg-background rounded-full" />
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="text-center py-2">
                            <div className="text-[10px] text-muted-foreground font-mono">{product.title.split(' ')[0]}</div>
                          </div>
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-secondary rounded-lg p-2.5 space-y-1.5">
                              <div className="flex justify-between items-center">
                                <div className="h-1.5 w-16 bg-border rounded" />
                                <div className="h-1.5 w-6 bg-primary/30 rounded" />
                              </div>
                              <div className="h-1 w-full bg-border/50 rounded" />
                              <div className="h-1 w-2/3 bg-border/50 rounded" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute -right-3 top-16 bg-card border border-border rounded-lg px-2.5 py-1.5 shadow-lg">
                        <div className="text-[9px] text-muted-foreground font-mono">Disponible</div>
                        <div className="text-[10px] text-primary font-semibold">🚀 Activo</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA a tienda completa */}
        <div className="text-center">
          <Link
            to="/tienda"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold text-sm rounded-lg hover:bg-primary/10 transition-all"
          >
            Ver todos los productos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
