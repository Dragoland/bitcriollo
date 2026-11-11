import { Star } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { TESTIMONIALS } from '../data/testimonials'
import type { TestimonialService } from '../data/testimonials'

// Color por línea de servicio (mismos tokens que el resto del sitio).
const SERVICE_COLOR: Record<TestimonialService, string> = {
  local: 'text-primary',
  hardware: 'text-hardware',
  dev: 'text-remote',
}

function Stars({ count, label }: { count: number; label: string }) {
  return (
    <div
      className="mb-3 flex items-center gap-1"
      role="img"
      aria-label={`${count} de 5 estrellas — ${label}`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? 'fill-current text-store' : 'text-muted-foreground/30'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function Testimonios() {
  const visible = TESTIMONIALS.filter((t) => t.verified === true)
  if (visible.length === 0) return null

  return (
    <section className="py-20 lg:py-28">
      <div className="site-container">
        <SectionHeader
          eyebrow="TESTIMONIOS"
          title="Lo que dicen los que ya me escribieron"
          description="Opiniones de clientes de soporte local, servicio técnico y desarrollo remoto."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {visible.map((t) => (
            <figure key={t.author} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <Stars count={t.stars} label={t.serviceLabel} />
              <blockquote className="mb-4 flex-1 font-body text-sm leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center justify-between gap-3 border-t border-border pt-4">
                <div>
                  <div className="font-mono text-sm font-semibold text-foreground">{t.author}</div>
                  <div className="font-body text-xs text-muted-foreground">{t.location}</div>
                </div>
                <span className={`font-code text-xs ${SERVICE_COLOR[t.service]}`}>{t.serviceLabel}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 text-center font-body text-xs text-muted-foreground">
          ¿Trabajamos juntos? Tu opinión puede aparecer aquí.
        </p>
      </div>
    </section>
  )
}
