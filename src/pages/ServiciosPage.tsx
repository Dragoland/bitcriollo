import { usePageMeta } from '../lib/usePageMeta'
import { ServiciosCatalogo } from '../sections/Servicios'

export default function ServiciosPage() {
  usePageMeta({
    title: 'Servicios técnicos y desarrollo de software',
    description:
      'Limpieza de virus, migración a Linux, recuperación de datos, reparación de hardware y desarrollo remoto. Precios claros en CUP y USD.',
    path: '/servicios',
  })
  return <ServiciosCatalogo />
}
