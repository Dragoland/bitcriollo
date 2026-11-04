// ÚNICA fuente de verdad de los servicios y precios.
// Se usa en /servicios, en el cotizador, en la portada y en las URLs (?servicio=<id>).
import {
  Bot, CircuitBoard, CloudCog, Code, Cpu, Database, Download, Fan, FileCode, FileText,
  FileUser, Gamepad2, Globe, HardDrive, Image as ImageIcon, Layers, Lock, MapPin,
  MemoryStick, MessageCircle, Monitor, MonitorCog, Palette, Power, Printer, Server,
  Shield, ShoppingCart, Smartphone, Terminal, Tv, Usb, Video, Wifi, Workflow, Wrench, Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Category = 'local' | 'hardware' | 'dev'
export type Currency = 'CUP' | 'USD'

/**
 * Fecha de la última actualización de precios, en formato ISO 8601 (YYYY-MM-DD).
 * Se muestra en el componente <PricesUpdated /> y en el pie de /servicios.
 * Actualízala manualmente cada vez que cambies un precio en SERVICES.
 */
export const PRICES_UPDATED = '2026-11-04'

export const CATEGORY_ORDER: Category[] = ['local', 'hardware', 'dev']

export interface CategoryStyle {
  label: string
  description: string
  icon: LucideIcon
  text: string
  iconBg: string
  badge: string
  tab: string
  bar: string
  solid: string
  hoverBorder: string
}

// Las clases van completas (no concatenadas) para que Tailwind las detecte.
export const CATEGORIES: Record<Category, CategoryStyle> = {
  local: {
    label: 'Soporte Local',
    description: 'Servicios presenciales en Falcón, Placetas y alrededores',
    icon: MapPin,
    text: 'text-primary',
    iconBg: 'bg-primary/10',
    badge: 'border-primary/30 bg-primary/5 text-primary',
    tab: 'border-primary bg-primary/10 text-primary',
    bar: 'bg-primary',
    solid: 'border-primary bg-primary',
    hoverBorder: 'hover:border-primary/40',
  },
  hardware: {
    label: 'Servicio Técnico',
    description: 'Reparación y mantenimiento de hardware de PC',
    icon: Wrench,
    text: 'text-hardware',
    iconBg: 'bg-hardware/10',
    badge: 'border-hardware/30 bg-hardware/5 text-hardware',
    tab: 'border-hardware bg-hardware/10 text-hardware',
    bar: 'bg-hardware',
    solid: 'border-hardware bg-hardware',
    hoverBorder: 'hover:border-hardware/40',
  },
  dev: {
    label: 'Desarrollo Remoto',
    description: 'Proyectos de software para clientes de cualquier parte del mundo',
    icon: Globe,
    text: 'text-remote',
    iconBg: 'bg-remote/10',
    badge: 'border-remote/30 bg-remote/5 text-remote',
    tab: 'border-remote bg-remote/10 text-remote',
    bar: 'bg-remote',
    solid: 'border-remote bg-remote',
    hoverBorder: 'hover:border-remote/40',
  },
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  currency: Currency
  /** Si es "hora", el precio es por hora y el cotizador pide cantidad de horas. */
  unit?: 'hora'
  category: Category
  icon: LucideIcon
  /** Aparece en "Servicios destacados" de la portada. */
  featured?: boolean
}

export const SERVICES: Service[] = [
  // ── SOPORTE LOCAL (CUP) ─────────────────────────────────────────────
  { id: 'virus', name: 'Limpieza de virus y malware', category: 'local', icon: Shield, price: 500, currency: 'CUP', featured: true,
    description: 'Eliminación completa de virus, spyware, adware, toolbars y programas indeseados que ralentizan tu equipo.' },
  { id: 'optimizar', name: 'Optimización y aceleración', category: 'local', icon: Zap, price: 500, currency: 'CUP',
    description: 'Limpieza profunda del sistema, liberación de espacio y desactivación de programas innecesarios al arranque.' },
  { id: 'formateo', name: 'Formateo e instalación limpia', category: 'local', icon: Monitor, price: 2000, currency: 'CUP',
    description: 'Windows desde cero. Respaldo previo de tus archivos y configuración posterior.' },
  { id: 'linux', name: 'Migración a Linux', category: 'local', icon: Terminal, price: 3000, currency: 'CUP', featured: true,
    description: '¿Tu PC ya no corre Windows? La revivo con Linux (especialmente Arch Linux) o la distro que prefieras. Capacitación básica incluida.' },
  { id: 'arch', name: 'Instalación y configuración de Arch Linux', category: 'local', icon: Layers, price: 5000, currency: 'CUP',
    description: 'Instalación manual con particionado, sistema base, entorno gráfico (Hyprland, KDE, GNOME) y paquetes esenciales.' },
  { id: 'personalizacion', name: 'Personalización de escritorio', category: 'local', icon: Palette, price: 1000, currency: 'CUP',
    description: 'Temas, iconos, atajos y entorno de trabajo a tu gusto en Linux o Windows.' },
  { id: 'recuperar', name: 'Recuperación de archivos', category: 'local', icon: HardDrive, price: 500, currency: 'CUP', featured: true,
    description: 'Fotos, documentos y videos borrados o en discos con problemas lógicos. No garantizo lo imposible, pero intento todo.' },
  { id: 'whatsapp', name: 'Recuperación de chats de WhatsApp', category: 'local', icon: MessageCircle, price: 500, currency: 'CUP',
    description: 'Mensajes borrados, cambio de celular sin perder conversaciones, respaldo en Google Drive o local.' },
  { id: 'celular', name: 'Configuración de celulares', category: 'local', icon: Smartphone, price: 250, currency: 'CUP',
    description: 'Apps de banca, WhatsApp Business, sincronización de cuentas, liberación de espacio y optimización de batería.' },
  { id: 'cuentas', name: 'Recuperación de cuentas', category: 'local', icon: Lock, price: 500, currency: 'CUP',
    description: 'Gmail, Facebook y correos a los que perdiste acceso. Verificación de identidad y restablecimiento.' },
  { id: 'programas', name: 'Instalación de programas', category: 'local', icon: Download, price: 200, currency: 'CUP',
    description: 'Instalación y configuración de los programas que necesitas, de fuentes confiables.' },
  { id: 'impresora', name: 'Configuración de impresora', category: 'local', icon: Printer, price: 1000, currency: 'CUP',
    description: 'Drivers, red, impresión desde el celular y solución de errores habituales.' },
  { id: 'wifi', name: 'Configuración de WiFi y routers', category: 'local', icon: Wifi, price: 500, currency: 'CUP',
    description: 'Cambio de contraseña, mejora de cobertura y solución de desconexiones. Solo configuración, no cableado.' },
  { id: 'smarttv', name: 'Configuración de Smart TV', category: 'local', icon: Tv, price: 500, currency: 'CUP',
    description: 'Conexión a la red, aplicaciones y ajustes para que tu TV funcione como debe.' },
  { id: 'seguridad', name: 'Asesoría en seguridad digital', category: 'local', icon: Lock, price: 250, currency: 'CUP',
    description: 'Cómo evitar estafas por WhatsApp, navegación segura, backups automáticos y protección de tus datos.' },
  { id: 'compra', name: 'Asesoría para compra de equipos', category: 'local', icon: ShoppingCart, price: 500, currency: 'CUP',
    description: 'Te ayudo a elegir según tu presupuesto y a revisar el equipo antes de pagar.' },
  { id: 'pendrive', name: 'Pendrive booteable con Ventoy', category: 'local', icon: Usb, price: 500, currency: 'CUP',
    description: 'Una memoria con varios sistemas operativos listos para instalar o reparar.' },
  { id: 'digitalizar', name: 'Digitalización de documentos', category: 'local', icon: FileText, price: 1000, currency: 'CUP',
    description: 'Escaneo y organización de documentos en PDF listos para guardar o enviar.' },
  { id: 'servidor', name: 'Configuración de servidor local / NAS', category: 'local', icon: Server, price: 2000, currency: 'CUP',
    description: 'Servidor de archivos, multimedia o backups en tu red local con Linux. Ideal para casa o negocio.' },
  { id: 'diseno', name: 'Diseño gráfico', category: 'local', icon: Palette, price: 1000, currency: 'CUP',
    description: 'Flyers, posters, tarjetas de presentación, logos, invitaciones, menús para negocios, diplomas y certificados.' },
  { id: 'fotos', name: 'Edición y retoque de fotos', category: 'local', icon: ImageIcon, price: 1500, currency: 'CUP',
    description: 'Restauración, retoque y edición de fotos con GIMP y Krita.' },
  { id: 'cv', name: 'Creación de CV digital', category: 'local', icon: FileUser, price: 500, currency: 'CUP',
    description: 'Currículum claro y bien diseñado, listo para enviar en PDF.' },
  { id: 'video', name: 'Conversión y compresión de videos', category: 'local', icon: Video, price: 200, currency: 'CUP',
    description: 'MP4, AVI, MKV. Reduzco el tamaño para que quepa en WhatsApp o USB sin perder calidad visible.' },
  { id: 'emuladores', name: 'Emuladores y juegos retro', category: 'local', icon: Gamepad2, price: 500, currency: 'CUP',
    description: 'Configuro emuladores de consolas clásicas en tu PC o celular. Revive los juegos de tu infancia.' },

  // ── SERVICIO TÉCNICO / HARDWARE (CUP) ───────────────────────────────
  { id: 'limpieza_hw', name: 'Limpieza interna de PC', category: 'hardware', icon: Fan, price: 500, currency: 'CUP', featured: true,
    description: 'Limpieza de ventiladores, disipador, placa base y componentes. Elimina el polvo que causa sobrecalentamiento.' },
  { id: 'pasta_termica', name: 'Cambio de pasta térmica', category: 'hardware', icon: Cpu, price: 500, currency: 'CUP',
    description: 'Retiro de pasta seca, limpieza del disipador y pasta nueva. Reduce temperaturas y mejora el rendimiento.' },
  { id: 'ram_hw', name: 'Instalación de RAM', category: 'hardware', icon: MemoryStick, price: 500, currency: 'CUP',
    description: 'Instalación de módulos de memoria. Verificación de compatibilidad y activación de dual channel.' },
  { id: 'ssd_hw', name: 'Instalación de SSD / HDD', category: 'hardware', icon: HardDrive, price: 500, currency: 'CUP',
    description: 'Montaje de disco nuevo, clonado del sistema o instalación limpia. Migración de datos del disco viejo al nuevo.' },
  { id: 'fuente_hw', name: 'Cambio de fuente de poder', category: 'hardware', icon: Power, price: 500, currency: 'CUP',
    description: 'Diagnóstico de fuente defectuosa e instalación de una nueva con cableado ordenado. Verificación de voltajes.' },
  { id: 'armado_hw', name: 'Armado de PC desde cero', category: 'hardware', icon: CircuitBoard, price: 2000, currency: 'CUP',
    description: 'Ensamblaje completo: placa, CPU, RAM, GPU, discos, fuente y cableado.' },
  { id: 'upgrade_hw', name: 'Upgrade de componentes', category: 'hardware', icon: Wrench, price: 500, currency: 'CUP',
    description: 'Mejora selectiva: más RAM, SSD nuevo, mejor GPU. Te asesoro qué comprar según tu presupuesto.' },

  // ── DESARROLLO REMOTO (USD) ─────────────────────────────────────────
  { id: 'ia_local', name: 'Instalación de IA local', category: 'dev', icon: Bot, price: 80, currency: 'USD', featured: true,
    description: 'Configuro Ollama, Llama, Mistral u otros LLMs en tu servidor o PC. Asistente privado 100% local, sin depender de la nube. Demo: Arch-Chan.' },
  { id: 'automatizacion', name: 'Automatización de tareas', category: 'dev', icon: Workflow, price: 50, currency: 'USD', featured: true,
    description: 'Scripts en Python y Bash para flujos repetitivos: renombrar archivos por lotes, procesar datos, generar reportes, ETL.' },
  { id: 'scripts_dev', name: 'Scripts personalizados', category: 'dev', icon: FileCode, price: 40, currency: 'USD',
    description: 'Utilidades a medida para tu flujo de trabajo, desde un backup automático hasta una herramienta CLI completa.' },
  { id: 'api_dev', name: 'APIs REST y microservicios', category: 'dev', icon: Database, price: 150, currency: 'USD',
    description: 'Backends con Python (FastAPI/Flask) para conectar tus sistemas: bases de datos SQL, autenticación.' },
  { id: 'migracion_libre', name: 'Migración a Software Libre', category: 'dev', icon: CloudCog, price: 100, currency: 'USD',
    description: 'Ayudo a equipos y negocios a migrar de herramientas propietarias a alternativas open source. Ahorro de licencias y control total.' },
  { id: 'soporte_remoto', name: 'Soporte técnico remoto', category: 'dev', icon: Globe, price: 25, currency: 'USD', unit: 'hora',
    description: 'Resolución de problemas en Linux y Windows por conexión remota: configuraciones, diagnósticos y optimización a distancia.' },
  { id: 'consultoria_linux', name: 'Consultoría Linux / DevOps', category: 'dev', icon: MonitorCog, price: 30, currency: 'USD', unit: 'hora',
    description: 'Servidores, Docker, CI/CD básico y hardening de sistemas para equipos pequeños que necesitan infraestructura sólida.' },
  { id: 'software_medida', name: 'Desarrollo de software a medida', category: 'dev', icon: Code, price: 200, currency: 'USD',
    description: 'Aplicaciones desktop nativas con Python (PyQt/Tkinter): sistemas de gestión, inventarios, pedidos. Sin dependencias web innecesarias.' },
]

export const getServiceById = (id: string): Service | undefined => SERVICES.find((s) => s.id === id)
export const getServicesByCategory = (category: Category): Service[] => SERVICES.filter((s) => s.category === category)
export const isCategory = (value: string | null): value is Category =>
  value !== null && (CATEGORY_ORDER as string[]).includes(value)

const group = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')

/** 2000 CUP → "2.000 CUP" · 80 USD → "$80 USD" */
export const formatMoney = (amount: number, currency: Currency) =>
  currency === 'USD' ? `$${group(amount)} USD` : `${group(amount)} CUP`

/** "Desde 500 CUP" · "$25 USD/hora" */
export const formatPrice = (s: Service) =>
  s.unit === 'hora' ? `${formatMoney(s.price, s.currency)}/hora` : `Desde ${formatMoney(s.price, s.currency)}`
