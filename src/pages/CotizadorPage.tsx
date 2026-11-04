import { useSearchParams } from 'react-router'
import { usePageMeta } from '../lib/usePageMeta'
import Cotizador from '../sections/Cotizador'

export default function CotizadorPage() {
  usePageMeta({
    title: 'Cotizador de servicios',
    description: 'Calcula al momento un estimado para tu servicio técnico o proyecto de software y envíalo por WhatsApp.',
    path: '/cotizador',
  })
  const [params] = useSearchParams()
  // `key` reinicia el cotizador si llegas desde otro servicio (?servicio=...)
  return <Cotizador key={params.toString()} />
}
