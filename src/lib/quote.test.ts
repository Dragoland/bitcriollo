import { describe, expect, it } from 'vitest'
import { buildQuoteLines, sumTotals, URGENT_FACTOR } from './quote'
import type { QuoteService } from './quote'

const servicioFijo: QuoteService = {
  id: 'virus', name: 'Limpieza de virus', price: 1000,
  currency: 'CUP', category: 'local',
}
const porHora: QuoteService = {
  id: 'scripting', name: 'Script a medida', price: 50,
  currency: 'USD', category: 'dev', unit: 'hora',
}
const SERVICES = [servicioFijo, porHora]

describe('buildQuoteLines', () => {
  it('servicio fijo: precio × factor de complejidad', () => {
    const lines = buildQuoteLines(SERVICES, new Set(['virus']), 2, false, 1)
    expect(lines).toHaveLength(1)
    expect(lines[0].total).toBe(2000) // 1000 × 2 (complejo)
    expect(lines[0].qty).toBe(1)
  })

  it('por hora: complejidad NO aplica, las horas sí', () => {
    const lines = buildQuoteLines(SERVICES, new Set(['scripting']), 2, false, 3)
    expect(lines[0].total).toBe(150) // 50 × 3 h; sin el ×2 de complejidad
    expect(lines[0].qty).toBe(3)
  })

  it('urgente multiplica todo por 1.25 y redondea', () => {
    const lines = buildQuoteLines(SERVICES, new Set(['virus']), 1, true, 1)
    expect(lines[0].total).toBe(Math.round(1000 * 1.5 * URGENT_FACTOR)) // 1875
  })

  it('mezcla CUP y USD sin convertir nada', () => {
    const lines = buildQuoteLines(SERVICES, new Set(['virus', 'scripting']), 0, false, 2)
    const totals = sumTotals(lines)
    expect(totals.CUP).toBe(1000)
    expect(totals.USD).toBe(100)
  })

  it('horas fuera de rango se limitan a 1..40', () => {
    expect(buildQuoteLines(SERVICES, new Set(['scripting']), 0, false, 0)[0].qty).toBe(1)
    expect(buildQuoteLines(SERVICES, new Set(['scripting']), 0, false, 999)[0].qty).toBe(40)
  })

  it('selección vacía → sin líneas', () => {
    expect(buildQuoteLines(SERVICES, new Set(), 0, false, 1)).toHaveLength(0)
    expect(sumTotals([])).toEqual({ CUP: 0, USD: 0 })
  })
})
