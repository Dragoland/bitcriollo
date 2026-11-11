import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Check, MessageCircle } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import PricesUpdated from '../components/PricesUpdated'
import { waLink } from '../lib/site'
import { buildQuoteLines, sumTotals } from '../lib/quote'
import {
  CATEGORIES,
  CATEGORY_ORDER,
  SERVICES,
  formatMoney,
  formatPrice,
  getServiceById,
  getServicesByCategory,
  isCategory,
} from '../data/services'
import type { Category } from '../data/services'

const COMPLEXITY = [
  { label: 'Simple', hint: 'Caso común' },
  { label: 'Moderado', hint: 'Requiere más tiempo' },
  { label: 'Complejo', hint: 'Caso difícil o varios equipos' },
]

export default function Cotizador() {
  const [params] = useSearchParams()
  const preselected = getServiceById(params.get('servicio') ?? '')
  const catParam = params.get('categoria')

  const [category, setCategory] = useState<Category>(
    preselected?.category ?? (isCategory(catParam) ? catParam : 'local')
  )
  const [selected, setSelected] = useState<Set<string>>(() => new Set<string>(preselected ? [preselected.id] : []))
  const [complexity, setComplexity] = useState(0)
  const [urgent, setUrgent] = useState(false)
  const [hours, setHours] = useState(1)

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  // Lógica pura extraída a src/lib/quote.ts (probada con vitest)
  const lines = useMemo(
    () => buildQuoteLines(SERVICES, selected, complexity, urgent, hours),
    [selected, complexity, urgent, hours]
  )
  const totals = useMemo(() => sumTotals(lines), [lines])

  const hasHourly = lines.some((l) => l.service.unit === 'hora')

  const message = [
    'Hola Dragoland!',
    '',
    'Quiero cotizar estos servicios:',
    ...lines.map(({ service, qty }) => `- ${service.name}${service.unit === 'hora' ? ` (${qty} h)` : ''}`),
    '',
    `Complejidad: ${COMPLEXITY[complexity].label}`,
    ...(urgent ? ['Urgente: sí (+25%)'] : []),
    ...(totals.CUP ? [`Estimado: ~${formatMoney(totals.CUP, 'CUP')}`] : []),
    ...(totals.USD ? [`Estimado: ~${formatMoney(totals.USD, 'USD')}`] : []),
    '',
    '¿Podemos hablar de los detalles?',
  ].join('\n')

  const optionButton = (active: boolean) =>
    `rounded-lg border px-4 py-2.5 text-left font-mono text-sm transition-colors ${
      active ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-muted-foreground hover:text-foreground'
    }`

  return (
    <section className="py-20 lg:py-28">
      <div className="site-container">
        <SectionHeader
          as="h1"
          eyebrow="COTIZADOR"
          title="Cotiza tu servicio"
          description="Marca lo que necesitas y obtén un estimado al momento. El precio final te lo confirmo siempre antes de empezar."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Controles */}
          <div>
            <div role="group" aria-label="Categorías" className="mb-6 flex flex-wrap gap-2">
              {CATEGORY_ORDER.map((key) => {
                const cat = CATEGORIES[key]
                const count = getServicesByCategory(key).filter((s) => selected.has(s.id)).length
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={key === category}
                    onClick={() => setCategory(key)}
                    className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-sm font-semibold transition-colors ${
                      key === category ? cat.tab : 'border-border bg-card text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {cat.label}
                    {count > 0 && (
                      <span className="rounded-full bg-foreground/10 px-1.5 text-xs text-foreground">{count}</span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mb-4">
              <PricesUpdated />
            </div>

            <div className="mb-10 grid gap-3 sm:grid-cols-2">
              {getServicesByCategory(category).map((service) => {
                const checked = selected.has(service.id)
                const cat = CATEGORIES[service.category]
                return (
                  <button
                    key={service.id}
                    type="button"
                    aria-pressed={checked}
                    onClick={() => toggle(service.id)}
                    className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
                      checked ? cat.tab : 'border-border bg-card hover:border-muted-foreground/40'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                        checked ? cat.solid : 'border-border'
                      }`}
                      aria-hidden="true"
                    >
                      {checked && <Check className="h-3.5 w-3.5 text-background" />}
                    </span>
                    <span>
                      <span className="block font-mono text-sm font-semibold text-foreground">{service.name}</span>
                      <span className="block font-code text-xs text-muted-foreground">{formatPrice(service)}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="space-y-6 rounded-xl border border-border bg-card p-6">
              <fieldset>
                <legend className="mb-3 font-mono text-sm font-bold text-foreground">Complejidad</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {COMPLEXITY.map((c, i) => (
                    <button key={c.label} type="button" aria-pressed={i === complexity} onClick={() => setComplexity(i)} className={optionButton(i === complexity)}>
                      <span className="block font-semibold">{c.label}</span>
                      <span className="block font-body text-xs opacity-80">{c.hint}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" />
                <span>
                  <span className="block font-mono text-sm font-semibold text-foreground">Es urgente (+25%)</span>
                  <span className="block font-body text-xs text-muted-foreground">Prioridad: lo atiendo antes que el resto.</span>
                </span>
              </label>

              {hasHourly && (
                <div>
                  <label htmlFor="horas" className="mb-2 block font-mono text-sm font-bold text-foreground">
                    Horas estimadas (servicios por hora)
                  </label>
                  <input
                    id="horas"
                    type="number"
                    min={1}
                    max={40}
                    value={hours}
                    onChange={(e) => setHours(Math.min(40, Math.max(1, Number(e.target.value) || 1)))}
                    className="w-28 rounded-md border border-border bg-secondary px-3 py-2 font-mono text-sm text-foreground"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Resumen */}
          <aside className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24" aria-live="polite">
            <h2 className="mb-4 font-mono text-lg font-bold text-foreground">Resumen</h2>
            {lines.length === 0 ? (
              <p className="font-body text-sm text-muted-foreground">Aún no has elegido ningún servicio.</p>
            ) : (
              <>
                <ul className="mb-4 space-y-2 border-b border-border pb-4">
                  {lines.map(({ service, qty, total }) => (
                    <li key={service.id} className="flex items-start justify-between gap-3 font-body text-sm">
                      <span className="text-foreground">
                        {service.name}
                        {service.unit === 'hora' && <span className="text-muted-foreground"> × {qty} h</span>}
                      </span>
                      <span className="shrink-0 font-code text-xs text-muted-foreground">
                        {formatMoney(total, service.currency)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mb-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">Estimado</div>
                <div className="mb-4 space-y-1">
                  {totals.CUP > 0 && <div className="font-code text-2xl font-bold text-primary">~{formatMoney(totals.CUP, 'CUP')}</div>}
                  {totals.USD > 0 && <div className="font-code text-2xl font-bold text-remote">~{formatMoney(totals.USD, 'USD')}</div>}
                </div>
                <p className="mb-5 font-body text-xs text-muted-foreground">
                  Es una orientación, no un precio cerrado. Primero reviso tu caso y te confirmo el valor.
                </p>
              </>
            )}
            <a
              href={lines.length ? waLink(message) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={lines.length === 0}
              className={`flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all ${
                lines.length
                  ? 'bg-primary text-primary-foreground hover:brightness-110'
                  : 'pointer-events-none bg-muted text-muted-foreground'
              }`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Enviar cotización por WhatsApp
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}
