import { Code, Cpu, Laptop, Monitor, Package } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ProductCategory {
  label: string
  icon: LucideIcon
  /** Etiqueta pequeña dentro de la tarjeta */
  badge: string
  /** Estilo del botón de filtro activo */
  active: string
}

export const PRODUCT_CATEGORIES: Record<string, ProductCategory> = {
  pcs: {
    label: 'PCs',
    icon: Monitor,
    badge: 'border-primary/30 bg-primary/5 text-primary',
    active: 'border-primary bg-primary/10 text-primary',
  },
  laptops: {
    label: 'Laptops',
    icon: Laptop,
    badge: 'border-primary/30 bg-primary/5 text-primary',
    active: 'border-primary bg-primary/10 text-primary',
  },
  componentes: {
    label: 'Componentes',
    icon: Cpu,
    badge: 'border-hardware/30 bg-hardware/5 text-hardware',
    active: 'border-hardware bg-hardware/10 text-hardware',
  },
  perifericos: {
    label: 'Periféricos',
    icon: Package,
    badge: 'border-store/30 bg-store/5 text-store',
    active: 'border-store bg-store/10 text-store',
  },
  software: {
    label: 'Software',
    icon: Code,
    badge: 'border-remote/30 bg-remote/5 text-remote',
    active: 'border-remote bg-remote/10 text-remote',
  },
}

const OTHER: ProductCategory = {
  label: 'Otros',
  icon: Package,
  badge: 'border-border bg-secondary text-muted-foreground',
  active: 'border-primary bg-primary/10 text-primary',
}

export const getProductCategory = (key: string): ProductCategory => PRODUCT_CATEGORIES[key] ?? OTHER
