import { Link, useSearchParams } from 'react-router'
import { ArrowRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { WA, waLink } from '../lib/site'
import {
  CATEGORIES,
  CATEGORY_ORDER,
  SERVICES,
  formatPrice,
  getServicesByCategory,
  isCategory,
} from '../data/services'
import type { Category, Service } from '../data/services'

function ServiceCard({ service }: { service: Service }) {
  const cat = CATEGORIES[service.category]
  const Icon = service.icon
  return (
    <Link
      to={`/cotizador?servicio=${service.id}`}
      className={`group relative block overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-glow ${cat.hoverBorder}`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${cat.bar}`}
        aria-hidden="true"
      />
      <div className="mb-3 flex items-start gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${cat.iconBg}`}>
          <Icon className={`h-5 w-5 ${cat.text}`} aria-hidden="true" />
        </div>
        <h3 className="pt-1 font-mono text-[15px] font-bold leading-tight text-foreground">{service.name}</h3>
      </div>
      <p className="mb-4 font-body text-sm leading-relaxed text-muted-foreground">{service.description}</p>
      <div className="flex items-center justify-between gap-2">
        <span className={`rounded border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${cat.badge}`}>
          {cat.label}
        </span>
        <span className="flex items-center gap-1 font-code text-xs text-foreground">
          {formatPrice(service)}
          <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

/** Página /servicios: catálogo completo con pestañas (la pestaña vive en la URL: ?categoria=hardware). */
export function ServiciosCatalogo() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('categoria')
  const active: Category = isCategory(raw) ? raw : 'local'
  const list = getServicesByCategory(active)

  return (
    <section className="py-20 lg:py-28">
      <div className="site-container">
        <SectionHeader
          as="h1"
          eyebrow="MODULOS_DISPONIBLES"
          title="Servicios"
          description="Tres líneas de trabajo. Elige la que necesites y cotiza en un par de clics."
        />

        <div role="group" aria-label="Categorías de servicios" className="mb-6 flex flex-wrap justify-center gap-3">
          {CATEGORY_ORDER.map((key) => {
            const cat = CATEGORIES[key]
            const CatIcon = cat.icon
            const isActive = key === active
            return (
              <button
                key={key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setParams({ categoria: key }, { replace: true })}
                className={`flex items-center gap-2 rounded-xl border px-5 py-3 font-mono text-sm font-semibold transition-all duration-200 ${
                  isActive ? cat.tab : 'border-border bg-card text-muted-foreground hover:text-foreground'
                }`}
              >
                <CatIcon className="h-4 w-4" aria-hidden="true" />
                {cat.label}
              </button>
            )
          })}
        </div>
        <p className="mb-10 text-center font-body text-sm text-muted-foreground">{CATEGORIES[active].description}</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <Reveal className="mt-16 text-center">
          <div className="inline-block max-w-xl rounded-xl border border-border bg-card px-8 py-5">
            <p className="font-body text-sm text-muted-foreground">
              <strong className="text-foreground">¿No encuentras lo que necesitas?</strong> Escríbeme por{' '}
              <a href={waLink(WA.duda)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                WhatsApp
              </a>{' '}
              y lo conversamos. Si es tecnología, seguro le encontramos la vuelta. Los precios son orientativos: el
              precio final te lo digo siempre antes de tocar nada.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Portada: solo los servicios marcados como `featured` + enlaces al catálogo. */
export function ServiciosDestacados() {
  const featured = SERVICES.filter((s) => s.featured)

  return (
    <section className="py-20 lg:py-28">
      <div className="site-container">
        <SectionHeader
          eyebrow="LO_QUE_RESUELVO"
          title="Servicios destacados"
          description="Los problemas que más me traen. Si el tuyo no está, también lo miramos."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {CATEGORY_ORDER.map((key) => {
            const cat = CATEGORIES[key]
            const CatIcon = cat.icon
            return (
              <Link
                key={key}
                to={`/servicios?categoria=${key}`}
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 font-mono text-sm font-semibold transition-colors ${cat.badge} hover:brightness-110`}
              >
                <CatIcon className="h-4 w-4" aria-hidden="true" />
                {cat.label}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
