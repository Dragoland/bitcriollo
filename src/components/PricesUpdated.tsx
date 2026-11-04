import { PRICES_UPDATED } from '../data/services'

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

function formatUpdated(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!m) return iso
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`
}

/** Nota de frescura de precios: en Cuba un precio viejo genera desconfianza. */
export default function PricesUpdated() {
  return (
    <p className="font-body text-xs text-muted-foreground">
      Precios actualizados al <time dateTime={PRICES_UPDATED}>{formatUpdated(PRICES_UPDATED)}</time>.
      Si el precio cambió y aún no lo subo, te confirmo el valor real antes de empezar.
    </p>
  )
}
