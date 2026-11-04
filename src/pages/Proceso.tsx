import { usePageMeta } from '../lib/usePageMeta'
import Proceso from '../sections/Proceso'

export default function ProcesoPage() {
  usePageMeta({
    title: 'Cómo funciona',
    description: 'Mi proceso de trabajo en cuatro pasos: soporte local, servicio técnico de hardware y desarrollo remoto.',
    path: '/proceso',
  })
  return <Proceso />
}
