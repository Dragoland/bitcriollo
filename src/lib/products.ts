// Parser de frontmatter para productos
function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const frontmatter = match[1]
  const content = match[2]

  const data: Record<string, any> = {}

  for (const line of frontmatter.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    // Arrays: images: ["/img1.jpg", "/img2.jpg"]
    const arrayMatch = trimmed.match(/^(\w+):\s*\[(.*)\]$/)
    if (arrayMatch) {
      const values = arrayMatch[2].split(',').map(v => v.trim().replace(/^["']|["']$/g, ''))
      data[arrayMatch[1]] = values
      continue
    }

    // Key: value
    const kvMatch = trimmed.match(/^(\w+):\s*(.*)$/)
    if (kvMatch) {
      let value = kvMatch[2].trim().replace(/^["']|["']$/g, '')
      // Convertir booleanos
      if (value === 'true') value = true as any
      if (value === 'false') value = false as any
      data[kvMatch[1]] = value
    }
  }

  return { data, content }
}

let cachedProductModules: Record<string, any> | null = null

function loadProductModules(): Record<string, any> {
  if (cachedProductModules !== null) return cachedProductModules

  try {
    const mods = import.meta.glob('../content/products/*.md', {
      eager: true,
      query: '?raw',
      import: 'default'
    })
    cachedProductModules = mods || {}
  } catch (e) {
    console.warn('[products.ts] import.meta.glob falló:', e)
    cachedProductModules = {}
  }

  return cachedProductModules
}

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

const fallbackProducts: Product[] = [
  {
    slug: 'bom-apettite-software',
    title: 'BomApettite — Sistema QR para restaurantes',
    price: '$100 USD',
    category: 'software',
    condition: 'nuevo',
    seller: 'BitCriollo',
    location: 'Remoto',
    whatsapp: '5356418463',
    featured: true,
    images: ['/images/products/bom-apettite-1.jpg'],
    description: 'Sistema de gestión de pedidos QR para restaurantes. Incluye instalación y soporte.',
    content: '## BomApettite\n\nSistema completo de gestión de pedidos mediante códigos QR.\n\n### Incluye:\n- Menú digital interactivo\n- Gestión de mesas con QR únicos\n- Pedidos en tiempo real\n- Reportes exportables a Excel\n- Funciona en red local sin internet\n\n### Precio\n\n**$100 USD** — Incluye instalación, configuración y capacitación básica.\n\n---\n\n*Software desarrollado por BitCriollo.*'
  },
  {
    slug: 'negocio-en-zona-software',
    title: 'NegocioEnZona — Gestión para PYMES',
    price: '$150 USD',
    category: 'software',
    condition: 'nuevo',
    seller: 'BitCriollo',
    location: 'Remoto',
    whatsapp: '5356418463',
    featured: true,
    images: ['/images/products/negocio-zona-1.jpg'],
    description: 'Software desktop para gestionar inventario, ventas y clientes. 100% offline.',
    content: '## NegocioEnZona\n\nSistema integral de gestión para pequeños negocios.\n\n### Incluye:\n- Inventario con alertas de stock\n- Registro de ventas y facturación\n- Base de datos de clientes\n- Reportes por período\n- Exportación a Excel y PDF\n\n### Precio\n\n**$150 USD** — Personalizable según el negocio.\n\n---\n\n*Software desarrollado por BitCriollo.*'
  },
]

export function getAllProducts(): Product[] {
  const modules = loadProductModules()
  const products: Product[] = []

  for (const [path, rawModule] of Object.entries(modules)) {
    let raw: string | undefined

    if (typeof rawModule === 'string') {
      raw = rawModule
    } else if (rawModule && typeof rawModule === 'object') {
      const mod = rawModule as any
      if (typeof mod.default === 'string') {
        raw = mod.default
      }
    }

    if (!raw || typeof raw !== 'string') {
      console.warn(`[products.ts] Módulo ${path} no tiene contenido válido`)
      continue
    }

    const { data, content } = parseFrontmatter(raw)
    const slug = path.split('/').pop()?.replace(/\.md$/, '') || ''

    if (!data.title || !data.price) {
      console.warn(`[products.ts] Producto ${slug} falta título o precio`)
      continue
    }

    products.push({
      slug,
      title: data.title,
      price: data.price,
      category: data.category || 'otros',
      condition: data.condition || 'usado',
      seller: data.seller || 'BitCriollo',
      location: data.location || 'Falcón, Placetas',
      whatsapp: data.whatsapp || '5356418463',
      featured: data.featured === true,
      images: data.images || [],
      description: data.description || '',
      content,
    })
  }

  if (products.length === 0) {
    console.log('[products.ts] No se encontraron productos .md, usando fallback')
    return [...fallbackProducts]
  }

  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find(p => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return getAllProducts().filter(p => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter(p => p.featured)
}
