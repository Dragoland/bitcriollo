import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ChevronDown, Code, Globe, MapPin, Wrench } from 'lucide-react'
import { SITE, WA, waLink } from '../lib/site'

interface TerminalLine {
  kind: 'prompt' | 'output' | 'comment' | 'cursor'
  text?: string
  /** Milisegundos desde que carga la página */
  at: number
}

const LINES: TerminalLine[] = [
  { kind: 'prompt', text: 'whoami', at: 0 },
  { kind: 'output', text: 'BitCriollo — Soluciones Digitales con Sabor', at: 300 },
  { kind: 'comment', text: '# Software · Hardware · Desarrollo Remoto', at: 500 },
  { kind: 'comment', text: '# Villa Clara, Cuba · Disponible internacionalmente', at: 700 },
  { kind: 'prompt', text: 'cat servicios.txt', at: 1000 },
  { kind: 'output', text: 'Soporte local (Cuba)    |    Desarrollo remoto (Mundo)', at: 1300 },
  { kind: 'output', text: 'Linux · Virus · Hardware · Scripts · IA Local · APIs', at: 1500 },
  { kind: 'comment', text: '# Sin precios de ciudad. Sin complicaciones.', at: 1700 },
  { kind: 'prompt', text: './contactar.sh', at: 2000 },
  { kind: 'output', text: `WhatsApp local → ${SITE.phoneDisplay}`, at: 2300 },
  { kind: 'output', text: `Proyectos remotos → ${SITE.email}`, at: 2500 },
  { kind: 'cursor', at: 2800 },
]

const SUMMARY =
  'BitCriollo ofrece soporte local en Villa Clara, Cuba, servicio técnico de hardware y desarrollo de software remoto para todo el mundo.'

export default function Hero() {
  const [visible, setVisible] = useState(0)
  const [typed, setTyped] = useState<Record<number, number>>({})

  useEffect(() => {
    // Con "movimiento reducido" mostramos todo de golpe
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(LINES.length)
      setTyped(Object.fromEntries(LINES.map((l, i) => [i, l.text?.length ?? 0])))
      return
    }

    const timeouts: number[] = []
    const intervals: number[] = []

    LINES.forEach((line, i) => {
      timeouts.push(
        window.setTimeout(() => {
          setVisible((v) => Math.max(v, i + 1))
          if (line.kind !== 'prompt' || !line.text) return
          const text = line.text
          let n = 0
          const id = window.setInterval(() => {
            n += 1
            setTyped((prev) => ({ ...prev, [i]: n }))
            if (n >= text.length) window.clearInterval(id)
          }, 45)
          intervals.push(id)
        }, line.at)
      )
    })

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id))
      intervals.forEach((id) => window.clearInterval(id))
    }
  }, [])

  const renderLine = (line: TerminalLine, i: number) => {
    if (i >= visible) return null
    switch (line.kind) {
      case 'prompt': {
        const text = line.text ?? ''
        const n = typed[i] ?? 0
        return (
          <div key={i} className="flex items-start gap-2">
            <span className="shrink-0 font-code text-remote">$</span>
            <span className="text-foreground">{text.slice(0, n)}</span>
            {n < text.length && <span className="ml-0.5 inline-block h-4 w-2 animate-cursor-blink bg-primary" />}
          </div>
        )
      }
      case 'output':
        return (
          <div key={i} className="ml-6 font-code text-sm text-muted-foreground">
            {line.text}
          </div>
        )
      case 'comment':
        return (
          <div key={i} className="font-code text-sm text-muted-foreground/80">
            {line.text}
          </div>
        )
      case 'cursor':
        return (
          <div key={i} className="mt-2 flex items-center gap-2">
            <span className="font-code text-remote">$</span>
            <span className="inline-block h-4 w-2 animate-cursor-blink bg-primary" />
          </div>
        )
    }
  }

  return (
    <section id="inicio" className="relative flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden">
      <div className="absolute inset-0 animate-blob-drift bg-gradient-mesh" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-pattern" aria-hidden="true" />

      <div className="site-container relative z-10 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-[55%_45%] lg:gap-8">
          {/* Terminal (decorativa) */}
          <div className="order-2 lg:order-1">
            <p className="sr-only">{SUMMARY}</p>
            <div aria-hidden="true" className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
              <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-destructive" />
                <span className="h-3 w-3 rounded-full bg-store" />
                <span className="h-3 w-3 rounded-full bg-remote" />
                <span className="ml-3 font-code text-xs text-muted-foreground">
                  {SITE.handle.toLowerCase()}@bitcriollo: ~/villaclara-cuba
                </span>
              </div>
              <div className="min-h-[280px] space-y-1.5 p-6 font-code text-sm">
                {LINES.map((line, i) => renderLine(line, i))}
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="order-1 text-center lg:order-2 lg:text-left">
            <div className="mb-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary">
                <MapPin className="h-3 w-3" aria-hidden="true" /> Villa Clara, Cuba
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-remote/20 bg-remote/10 px-3 py-1.5 font-mono text-xs text-remote">
                <Globe className="h-3 w-3" aria-hidden="true" /> Remoto
              </span>
            </div>

            <h1 className="mb-6 font-mono text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[52px]">
              Tu vecino técnico <span className="text-gradient">con alcance global</span>
            </h1>
            <p className="mx-auto mb-8 max-w-[500px] font-body text-lg leading-relaxed text-muted-foreground lg:mx-0">
              PCs lentas, virus, celulares locos, cuentas bloqueadas, y también desarrollo de software, automatización e
              IA local para equipos de cualquier parte del mundo.
            </p>

            <div className="mb-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Code className="h-4 w-4 text-primary" aria-hidden="true" /> Python · Bash · Linux
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wrench className="h-4 w-4 text-hardware" aria-hidden="true" /> Arreglo de equipos
              </span>
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href={waLink(WA.equipo)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow hover:brightness-110"
              >
                Escríbeme por WhatsApp
              </a>
              <Link
                to="/servicios"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary transition-all duration-200 hover:bg-primary/10"
              >
                Ver servicios
              </Link>
            </div>

            <p className="mt-5 font-body text-sm text-muted-foreground">
              ¿Proyecto remoto?{' '}
              <a
                href={waLink(WA.proyecto)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-remote underline-offset-2 hover:underline"
              >
                Cuéntame tu idea →
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce-slow sm:block" aria-hidden="true">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
