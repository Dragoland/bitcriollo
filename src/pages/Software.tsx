import { usePageMeta } from '../lib/usePageMeta'
import SoftwareStore from '../sections/SoftwareStore'

export default function Software() {
  usePageMeta({
    title: 'Software para tu negocio',
    description: 'Sistemas de gestión y herramientas a medida, con instalación, configuración y capacitación incluidas.',
    path: '/software',
  })
  return <SoftwareStore />
}
