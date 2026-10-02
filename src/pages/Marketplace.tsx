import { useState } from 'react'
import { Link } from 'react-router'
import { getAllProducts } from '../lib/products'
import { ShoppingBag, MapPin, Monitor, Cpu, Package, Code, Star, ArrowRight, Search } from 'lucide-react'

const categoryConfig: Record<string, { label: string; icon: React.ElementType; color: string; badge: string }> = {
  pcs: { label: 'PCs y Laptops', icon: Monitor, color: 'primary', badge: 'border-primary/30 text-primary bg-primary/5' },
  componentes: { label: 'Componentes', icon: Cpu, color: 'orange', badge: 'border-orange-400/30 text-orange-400 bg-orange-400/5' },
  perifericos: { label: 'Periféricos', icon: Package, color: 'yellow', badge: 'border-yellow-400/30 text-yellow-400 bg-yellow-400/5' },
  software: { label: 'Software', icon: Code, color: 'emerald', badge: 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5' },
}

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState<string>('todos')
  const [searchQuery, setSearchQuery] = useState('')

  let products: ReturnType<typeof getAllProducts> = []
  try {
    products = getAllProducts()
  } catch (e) {
    console.error('[Marketplace] Error cargando productos:', e)
  }

  const featured = products.filter(p => p.featured)
  const filtered = products.filter(p => {
    const matchesCategory = activeCategory === 'todos' || p.category === activeCategory
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const buildWhatsAppLink = (product: typeof products[0]) => {
    const msg = `Hola Dragoland! Me interesa el producto "${product.title}" (${product.price}). ¿Sigue disponible?`
    return `https://wa.me/${product.whatsapp}?text=${encodeURIComponent(msg)}`
  }

  return (
    <div className="py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw]">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center justify-center gap-2">
            <span className="text-primary">//</span> MARKETPLACE
          </div>
          <h2 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-foreground mb-4">
            Tienda BitCriollo
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-[600px] mx-auto">
            PCs, componentes y software. Yo encuentro el vendedor, cotizo por ti y me encargo de todo. 
            Tú solo escribes por WhatsApp.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('todos')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-mono font-semibold transition-all border ${
              activeCategory === 'todos'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:text-foreground'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Todos
          </button>
          {Object.entries(categoryConfig).map(([key, config]) => {
            const Icon = config.icon
            const isActive = activeCategory === key
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-mono font-semibold transition-all border ${
                  isActive
                    ? config.key === 'pcs'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : config.key === 'componentes'
                      ? 'bg-orange-400 text-white border-orange-400'
                      : config.key === 'perifericos'
                      ? 'bg-yellow-400 text-black border-yellow-400'
                      : 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-card text-muted-foreground border-border hover:text-foreground'
                }`}
                style={isActive ? {
                  backgroundColor: key === 'pcs' ? 'hsl(var(--primary))' : key === 'componentes' ? '#fb923c' : key === 'perifericos' ? '#facc15' : '#10b981',
                  color: key === 'perifericos' ? '#000' : '#fff',
                  borderColor: key === 'pcs' ? 'hsl(var(--primary))' : key === 'componentes' ? '#fb923c' : key === 'perifericos' ? '#facc15' : '#10b981',
                } : {}}
              >
                <Icon className="w-4 h-4" />
                {config.label}
              </button>
            )
          })}
        </div>

        {/* Featured section */}
        {activeCategory === 'todos' && searchQuery === '' && featured.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-yellow-400" />
              <h3 className="font-mono font-bold text-lg text-foreground">Destacados</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(product => (
                <ProductCard key={product.slug} product={product} buildWhatsAppLink={buildWhatsAppLink} />
              ))}
            </div>
          </div>
        )}

        {/* Product grid */}
        <div>
          <h3 className="font-mono font-bold text-lg text-foreground mb-6">
            {activeCategory === 'todos' ? 'Todos los productos' : categoryConfig[activeCategory]?.label || 'Productos'}
          </h3>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-mono">No hay productos en esta categoría aún.</p>
              <p className="text-sm font-body mt-2">Escribime por WhatsApp si buscas algo específico.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(product => (
                <ProductCard key={product.slug} product={product} buildWhatsAppLink={buildWhatsAppLink} />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-card border border-border border-dashed rounded-xl p-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-xl">💻</span>
          </div>
          <h3 className="font-mono font-bold text-xl text-foreground mb-2">
            ¿Tienes algo para vender?
          </h3>
          <p className="font-body text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Si tienes una PC, componentes o periféricos que quieras vender, yo los cotizo y los publico por ti. 
            Solo me llevo una comisión pequeña por la venta.
          </p>
          <a
            href="https://wa.me/5356418463?text=Hola%20Dragoland%2C%20tengo%20algo%20para%20vender%20en%20la%20tienda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold text-sm rounded-lg hover:bg-primary/10 transition-all"
          >
            Quiero vender algo
          </a>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product, buildWhatsAppLink }: { product: ReturnType<typeof getAllProducts>[0]; buildWhatsAppLink: (p: typeof product) => string }) {
  const config = categoryConfig[product.category] || categoryConfig.pcs
  const Icon = config.icon

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-glow transition-all duration-250">
      {/* Image */}
      <Link to={`/tienda/${product.slug}`} className="block relative aspect-[4/3] bg-secondary overflow-hidden">
        {product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon className="w-16 h-16 text-muted-foreground opacity-20" />
          </div>
        )}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            Destacado
          </div>
        )}
        <div className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
          product.condition === 'nuevo' ? 'bg-emerald-500 text-white' : 'bg-orange-400 text-white'
        }`}>
          {product.condition}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider border px-2 py-0.5 rounded ${config.badge}`}>
            <Icon className="w-3 h-3" />
            {config.label}
          </span>
          <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {product.location}
          </span>
        </div>

        <Link to={`/tienda/${product.slug}`}>
          <h4 className="font-mono font-bold text-[15px] text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
            {product.title}
          </h4>
        </Link>

        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-code text-lg font-bold text-primary">
            {product.price}
          </span>
          <a
            href={buildWhatsAppLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-mono text-primary hover:text-primary/80 transition-colors"
          >
            Comprar
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
