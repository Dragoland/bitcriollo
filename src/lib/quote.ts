// Lógica pura del cotizador, extraída del componente para poder probarla.
// Mismo contrato que src/data/services.ts
export interface QuoteService {
  id: string
  name: string
  price: number
  currency: 'CUP' | 'USD'
  category: 'local' | 'hardware' | 'dev'
  unit?: 'hora'
}

export const COMPLEXITY_FACTORS = [1, 1.5, 2] as const
export const URGENT_FACTOR = 1.25
export const MAX_HOURS = 40

export interface QuoteLine {
  service: QuoteService
  qty: number
  total: number
}

/** Calcula las líneas del presupuesto: complejidad solo aplica a servicios fijos,
 *  las horas solo a servicios por hora, urgencia aplica a todo. */
export function buildQuoteLines(
  services: QuoteService[],
  selectedIds: ReadonlySet<string>,
  complexityIndex: number,
  urgent: boolean,
  hours: number,
): QuoteLine[] {
  const factor = COMPLEXITY_FACTORS[complexityIndex] ?? 1
  const clampedHours = Math.min(MAX_HOURS, Math.max(1, Math.round(hours) || 1))
  const multiplier = urgent ? URGENT_FACTOR : 1

  return services
    .filter((s) => selectedIds.has(s.id))
    .map((service) => {
      const hourly = service.unit === 'hora'
      const qty = hourly ? clampedHours : 1
      const applied = hourly ? 1 : factor
      const total = Math.round(service.price * applied * qty * multiplier)
      return { service, qty, total }
    })
}

export type TotalsByCurrency = Record<'CUP' | 'USD', number>

/** Suma por moneda: un servicio en USD y otro en CUP no se mezclan. */
export function sumTotals(lines: QuoteLine[]): TotalsByCurrency {
  return lines.reduce<TotalsByCurrency>(
    (acc, l) => {
      acc[l.service.currency] += l.total
      return acc
    },
    { CUP: 0, USD: 0 },
  )
}
