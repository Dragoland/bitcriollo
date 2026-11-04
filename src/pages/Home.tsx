import { Link } from 'react-router'
import { BadgeCheck, Calculator, ShieldCheck } from 'lucide-react'
import Reveal from '../components/Reveal'
import { usePageMeta } from '../lib/usePageMeta'
import { WA, waLink } from '../lib/site'
import FeaturedProducts from '../sections/FeaturedProducts'
import Hero from '../sections/Hero'
import { ServiciosDestacados } from '../sections/Servicios'

const TRUST = [
  { icon: BadgeCheck, title: 'Diagnóstico gratis', text: 'Reviso tu caso y te digo si tiene arreglo, sin costo.' },
  { icon: Calculator, title: 'Precio antes de empezar', text: 'Te digo cuánto cuesta antes de tocar nada. Sin sorpresas.' },
  { icon: ShieldCheck, title: '2 semanas de garantía', text: 'Si el mismo problema vuelve, lo resuelvo sin cobrarte de nuevo.' },
]

export default function Home() {
  usePageMeta({
    title: 'BitCriollo — Soluciones Digitales con Sabor | Placetas, Cuba',
    description:
      'Servicios informáticos en Falcón, Placetas: Linux, limpieza de virus, recuperación de datos, reparación de PCs y desarrollo de software remoto. Diagnóstico gratis.',
    path: '/',
  })

  return (
    <>
      <Hero />

      <section aria-label="Garantías" className="border-y border-border bg-secondary">
        <div className="site-container py-10">
          <Reveal>
            <ul className="grid gap-6 md:grid-cols-3">
              {TRUST.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-mono text-sm font-bold text-foreground">{title}</h2>
                    <p className="font-body text-sm text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ServiciosDestacados />
      <FeaturedProducts />

      <section className="border-t border-border bg-secondary">
        <div className="site-container py-20 text-center">
          <Reveal>
            <h2 className="mb-4 font-mono text-2xl font-extrabold text-foreground lg:text-3xl">
              ¿Tu PC se puede salvar?
            </h2>
            <p className="mx-auto mb-8 max-w-lg font-body text-base text-muted-foreground">
              Cuéntame qué le pasa. Primera orientación sin costo ni compromiso.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={waLink(WA.equipo)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110"
              >
                Escríbeme por WhatsApp
              </a>
              <Link
                to="/proceso"
                className="rounded-md border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Cómo trabajo
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
