import { asList, asString, parseFrontmatter } from './frontmatter'
import { SITE } from './site'

export interface Product {
  slug: string
  title: string
  price: string
  category: string
  condition: string
  seller: string
  location: string
  whatsapp: string
  featured: boolean
  images: string[]
  description: string
  content: string
}

const modules = import.meta.glob('../content/products/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

// Se usan solo si no existe ningún .md en src/content/products/
const fallbackProducts: Product[] = [
  {
    slug: 'bom-apettite-software',
    title: 'BomApettite — Sistema QR para restaurantes',
    price: '$100 USD',
    category: 'software',
    condition: 'nuevo',
    seller: 'BitCriollo',
    location: 'Remoto',
    whatsapp: SITE.phone,
    featured: true,
    images: ['/images/products/bom-apettite-1.jpg'],
    description: 'Sistema de gestión de pedidos QR para restaurantes. Incluye instalación y soporte.',
    content:
      '## BomApettite\n\nSistema completo de gestión de pedidos mediante códigos QR.\n\n### Incluye:\n- Menú digital interactivo\n- Gestión de mesas con QR únicos\n- Pedidos en tiempo real\n- Reportes exportables a Excel\n- Funciona en red local sin internet\n\n### Precio\n\n**$100 USD** — Incluye instalación, configuración y capacitación básica.\n\n---\n\n*Software desarrollado por BitCriollo.*',
  },
  {
    slug: 'negocio-en-zona-software',
    title: 'NegocioEnZona — Gestión para PYMES',
    price: '$150 USD',
    category: 'software',
    condition: 'nuevo',
    seller: 'BitCriollo',
    location: 'Remoto',
    whatsapp: SITE.phone,
    featured: true,
    images: ['/images/products/negocio-zona-1.jpg'],
    description: 'Software desktop para gestionar inventario, ventas y clientes. 100% offline.',
    content:
      '## NegocioEnZona\n\nSistema integral de gestión para pequeños negocios.\n\n### Incluye:\n- Inventario con alertas de stock\n- Registro de ventas y facturación\n- Base de datos de clientes\n- Reportes por período\n- Exportación a Excel y PDF\n\n### Precio\n\n**$150 USD** — Personalizable según el negocio.\n\n---\n\n*Software desarrollado por BitCriollo.*',
  },
]

function buildProducts(): Product[] {
  const products: Product[] = []

  for (const [path, raw] of Object.entries(modules)) {
    if (typeof raw !== 'string') continue
    const { data, content } = parseFrontmatter(raw)
    const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? ''
    const title = asString(data.title)
    const price = asString(data.price)

    if (!slug || !title || !price) {
      console.warn(`[products] "${slug}" ignorado: falta title o price en el frontmatter`)
      continue
    }
    if (data.draft === true && !import.meta.env.DEV) continue

    products.push({
      slug,
      title,
      price,
      category: asString(data.category, 'otros'),
      condition: asString(data.condition, 'usado'),
      seller: asString(data.seller, SITE.name),
      location: asString(data.location, 'Falcón, Placetas'),
      whatsapp: asString(data.whatsapp, SITE.phone),
      featured: data.featured === true,
      images: asList(data.images),
      description: asString(data.description),
      content,
    })
  }

  return products.length > 0 ? products : fallbackProducts
}

const products = buildProducts()

export const getAllProducts = (): Product[] => products
export const getProductBySlug = (slug: string): Product | undefined => products.find((p) => p.slug === slug)
export const getProductsByCategory = (category: string): Product[] => products.filter((p) => p.category === category)
export const getFeaturedProducts = (): Product[] => products.filter((p) => p.featured)
