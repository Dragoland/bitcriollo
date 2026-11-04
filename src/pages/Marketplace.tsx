import { useSearchParams } from 'react-router'
import { Search, ShoppingBag, Star } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { PRODUCT_CATEGORIES } from '../data/productCategories'
import { getAllProducts } from '../lib/products'
import { WA, waLink } from '../lib/site'
import { usePageMeta } from '../lib/usePageMeta'

// Ignora mayúsculas y tildes al buscar ("teclado" encuentra "Teclado" y "téclado")
const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export default function Marketplace() {
  usePageMeta({
    title: 'Tienda: PCs, componentes y software',
    description: 'PCs, laptops, componentes, periféricos y software. Yo busco al vendedor, cotizo y coordino; tú solo escribes por WhatsApp.',
    path: '/tienda',
  })

  const [params, setParams] = useSearchParams()
  const category = params.get('categoria') ?? 'todos'
  const query = params.get('q') ?? ''

  const products = getAllProducts()
  const q = normalize(query.trim())
  const filtered = products.filter(
    (p) =>
      (category === 'todos' || p.category === category) &&
      (!q || normalize(`${p.title} ${p.description}`).includes(q))
  )
  const featured = products.filter((p) => p.featured)
  const showFeatured = category === 'todos' && !q && featured.length > 0

  const update = (key: 'categoria' | 'q', value: string) => {
    const next = new URLSearchParams(params)
    if (value && value !== 'todos') next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const tab = (active: boolean, activeClass = 'border-primary bg-primary/10 text-primary') =>
    `flex items-center gap-2 rounded-lg border px-4 py-2.5 font-mono text-sm font-semibold transition-colors ${
      active ? activeClass : 'border-border bg-card text-muted-foreground hover:text-foreground'
    }`

  return (
    <section className="py-20 lg:py-28">
      <div className="site-container">
        <SectionHeader
          as="h1"
          eyebrow="MARKETPLACE"
          title="Tienda BitCriollo"
          description="PCs, componentes y software. Yo encuentro el vendedor, cotizo por ti y me encargo de todo. Tú solo escribes por WhatsApp."
        />

        <div className="mx-auto mb-10 max-w-md">
          <label htmlFor="buscar" className="sr-only">Buscar productos</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="buscar"
              type="search"
              placeholder="Buscar productos…"
              value={query}
              onChange={(e) => update('q', e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div role="group" aria-label="Categorías" className="mb-12 flex flex-wrap justify-center gap-2">
          <button type="button" aria-pressed={category === 'todos'} onClick={() => update('categoria', 'todos')} className={tab(category === 'todos')}>
            <ShoppingBag className="h-4 w-4" aria-hidden="true" /> Todos
          </button>
          {Object.entries(PRODUCT_CATEGORIES).map(([key, cfg]) => {
            const Icon = cfg.icon
            return (
              <button key={key} type="button" aria-pressed={category === key} onClick={() => update('categoria', key)} className={tab(category === key, cfg.active)}>
                <Icon className="h-4 w-4" aria-hidden="true" /> {cfg.label}
              </button>
            )
          })}
        </div>

        {showFeatured && (
          <div className="mb-16">
            <h2 className="mb-6 flex items-center gap-2 font-mono text-lg font-bold text-foreground">
              <Star className="h-5 w-5 text-store" aria-hidden="true" /> Destacados
            </h2>
            <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </Reveal>
          </div>
        )}

        <div>
          <h2 className="mb-6 font-mono text-lg font-bold text-foreground">
            {category === 'todos' ? 'Todos los productos' : PRODUCT_CATEGORIES[category]?.label ?? 'Productos'}
          </h2>
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <ShoppingBag className="mx-auto mb-4 h-12 w-12 opacity-30" aria-hidden="true" />
              <p className="font-mono">No hay productos con ese filtro.</p>
              <p className="mt-2 font-body text-sm">Escríbeme por WhatsApp si buscas algo específico.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 rounded-xl border border-dashed border-border bg-card p-10 text-center">
          <h2 className="mb-2 font-mono text-xl font-bold text-foreground">¿Tienes algo para vender?</h2>
          <p className="mx-auto mb-6 max-w-md font-body text-sm text-muted-foreground">
            Si tienes una PC, componentes o periféricos que quieras vender, yo los cotizo y los publico por ti. Solo me
            llevo una comisión pequeña por la venta.
          </p>
          <a
            href={waLink(WA.vender)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
          >
            Quiero vender algo
          </a>
        </div>
      </div>
    </section>
  )
}
