import { useState } from "react"
import {
  Shield, Zap, Monitor, HardDrive, MessageCircle, Smartphone, KeyRound,
  Download, Printer, Wifi, Tv, Lock, ShoppingCart, Usb, FileText,
  Palette, Image, FileUser, Video, Gamepad2, Code, Globe, Terminal,
  Layers, Server, Cpu, Fan, MemoryStick, CircuitBoard, Power,
  Wrench, Microscope, MonitorCog, Bot, FileCode, Workflow, Database,
  CloudCog, ArrowRight, MapPin
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Link } from 'react-router'

type Category = "local" | "dev" | "hardware"

interface Service {
  icon: LucideIcon
  name: string
  description: string
  price: string
  tag: Category
}

const services: Service[] = [
  // === LOCAL ===
  {
    icon: Shield,
    name: "Limpieza de virus y malware",
    description: "Eliminación completa de virus, spyware, adware, toolbars y programas indeseados que ralentizan tu equipo.",
    price: "Desde 500 CUP",
    tag: "local",
  },
  {
    icon: Zap,
    name: "Optimización y aceleración",
    description: "Limpieza profunda del sistema, liberación de espacio, desactivación de programas innecesarios al arranque.",
    price: "Desde 400 CUP",
    tag: "local",
  },
  {
    icon: Monitor,
    name: "Formateo e instalación limpia",
    description: "Windows o Linux desde cero. Respaldo previo de tus archivos, configuración posterior.",
    price: "Desde 1.500 CUP",
    tag: "local",
  },
  {
    icon: Terminal,
    name: "Migración a Linux",
    description: "Tu PC ya no corre Windows? La revivo con Linux (especialmente Arch Linux) o la distro que prefieras. Capacitación básica incluida.",
    price: "Desde 2.000 CUP",
    tag: "local",
  },
  {
    icon: Layers,
    name: "Instalación y configuración de Arch Linux",
    description: "Instalación manual de Arch Linux con particionado, sistema base, entorno gráfico (i3, KDE, GNOME) y paquetes esenciales.",
    price: "Desde 2.000 CUP",
    tag: "local",
  },
  {
    icon: HardDrive,
    name: "Recuperación de archivos",
    description: "Fotos, documentos, videos borrados o en discos con problemas lógicos. No garantizo lo imposible, pero intento todo.",
    price: "Desde 800 CUP",
    tag: "local",
  },
  {
    icon: MessageCircle,
    name: "Recuperación de chats de WhatsApp",
    description: "Mensajes borrados, cambio de celular sin perder conversaciones, respaldo en Google Drive o local.",
    price: "Desde 300 CUP",
    tag: "local",
  },
  {
    icon: Smartphone,
    name: "Configuración de celulares",
    description: "Apps de banca, WhatsApp Business, sincronización de cuentas, liberación de espacio, optimización de batería.",
    price: "Desde 200 CUP",
    tag: "local",
  },
  {
    icon: KeyRound,
    name: "Recuperación de cuentas",
    description: "Gmail, Facebook, correos electrónicos a los que perdiste acceso. Verificación de identidad y restablecimiento.",
    price: "Desde 200 CUP",
    tag: "local",
  },
  {
    icon: Wifi,
    name: "Configuración de WiFi y routers",
    description: "Cambio de contraseña, mejora de cobertura, solución de desconexiones. Solo configuración, no cableado.",
    price: "Desde 200 CUP",
    tag: "local",
  },
  {
    icon: Lock,
    name: "Asesoría en seguridad digital",
    description: "Cómo evitar estafas por WhatsApp, navegación segura, backups automáticos, protección de tus datos personales.",
    price: "Desde 150 CUP",
    tag: "local",
  },
  {
    icon: Server,
    name: "Configuración de servidor local / NAS",
    description: "Montaje de servidor de archivos, multimedia o backups en tu red local con Linux. Ideal para compartir en casa o negocio.",
    price: "Desde 800 CUP",
    tag: "local",
  },
  {
    icon: Palette,
    name: "Diseño gráfico",
    description: "Flyers, posters, tarjetas de presentación, logos, invitaciones, menús para negocios, diplomas y certificados.",
    price: "Desde 300 CUP",
    tag: "local",
  },
  {
    icon: Video,
    name: "Conversión y compresión de videos",
    description: "MP4, AVI, MKV. Reduzco el tamaño para que quepa en WhatsApp o USB sin perder calidad visible.",
    price: "Desde 200 CUP",
    tag: "local",
  },
  {
    icon: Gamepad2,
    name: "Instalación de emuladores y juegos retro",
    description: "Configuro emuladores de consolas clásicas en tu PC o celular. Revive los juegos de tu infancia.",
    price: "Desde 300 CUP",
    tag: "local",
  },

  // === DESARROLLO REMOTO ===
  {
    icon: Bot,
    name: "Instalación de IA Local",
    description: "Configuro Ollama, Llama, Mistral u otros LLMs en tu servidor o PC. Asistente privado 100% local sin depender de la nube. Demo: Arch-Chan.",
    price: "Desde $80 USD",
    tag: "dev",
  },
  {
    icon: Workflow,
    name: "Automatización de tareas",
    description: "Scripts en Python y Bash para automatizar flujos repetitivos: renombrar archivos por lotes, procesar datos, generar reportes, ETL.",
    price: "Desde $50 USD",
    tag: "dev",
  },
  {
    icon: FileCode,
    name: "Scripts personalizados",
    description: "Utilidades a medida para tu flujo de trabajo. Desde un script de backup automático hasta una herramienta CLI completa.",
    price: "Desde $40 USD",
    tag: "dev",
  },
  {
    icon: Database,
    name: "APIs REST y microservicios",
    description: "Desarrollo de backends con Python (FastAPI/Flask). APIs para conectar tus sistemas, bases de datos SQL, autenticación.",
    price: "Desde $150 USD",
    tag: "dev",
  },
  {
    icon: CloudCog,
    name: "Migración a Software Libre",
    description: "Ayudo a equipos y negocios a migrar de herramientas propietarias a alternativas open source. Ahorro de licencias + control total.",
    price: "Desde $100 USD",
    tag: "dev",
  },
  {
    icon: Globe,
    name: "Soporte técnico remoto",
    description: "Resolución de problemas en Linux y Windows vía conexión remota. Configuraciones, diagnósticos, optimización a distancia.",
    price: "$25 USD/hora",
    tag: "dev",
  },
  {
    icon: MonitorCog,
    name: "Consultoría Linux / DevOps",
    description: "Configuración de servidores, Docker, CI/CD básico, hardening de sistemas. Para equipos pequeños que necesitan infraestructura sólida.",
    price: "$30 USD/hora",
    tag: "dev",
  },
  {
    icon: Code,
    name: "Desarrollo de software a medida",
    description: "Aplicaciones desktop nativas con Python (PyQt/Tkinter). Sistemas de gestión, inventarios, pedidos. Sin dependencias web innecesarias.",
    price: "Desde $200 USD",
    tag: "dev",
  },

  // === HARDWARE ===
  {
    icon: Fan,
    name: "Limpieza interna de PC",
    description: "Limpieza de ventiladores, disipador, placa base y componentes. Eliminación de polvo acumulado que causa sobrecalentamiento.",
    price: "Desde 500 CUP",
    tag: "hardware",
  },
  {
    icon: Cpu,
    name: "Cambio de pasta térmica",
    description: "Retiro de pasta térmica seca, limpieza del disipador y aplicación de pasta nueva. Reduce temperaturas y mejora rendimiento.",
    price: "Desde 300 CUP",
    tag: "hardware",
  },
  {
    icon: MemoryStick,
    name: "Instalación de RAM",
    description: "Instalación y configuración de módulos de memoria RAM. Verificación de compatibilidad y activación de dual channel.",
    price: "Desde 200 CUP",
    tag: "hardware",
  },
  {
    icon: HardDrive,
    name: "Instalación de SSD / HDD",
    description: "Montaje de disco nuevo, clonado del sistema o instalación limpia. Migración de datos del disco viejo al nuevo.",
    price: "Desde 400 CUP",
    tag: "hardware",
  },
  {
    icon: Power,
    name: "Cambio de fuente de poder",
    description: "Diagnóstico de fuente defectuosa, instalación de fuente nueva con cableado ordenado. Verificación de voltajes.",
    price: "Desde 300 CUP",
    tag: "hardware",
  },
  {
    icon: Microscope,
    name: "Diagnóstico de componentes",
    description: "Identificación de piezas defectuosas (RAM, GPU, placa, CPU). Pruebas por eliminación. Te digo qué cambiar y dónde conseguirlo.",
    price: "Desde 300 CUP",
    tag: "hardware",
  },
  {
    icon: CircuitBoard,
    name: "Armado de PC desde cero",
    description: "Ensamblaje completo de PC a partir de componentes. Instalación de placa, CPU, RAM, GPU, discos, fuente y cableado.",
    price: "Desde 1.500 CUP",
    tag: "hardware",
  },
  {
    icon: Wrench,
    name: "Upgrade de componentes",
    description: "Mejora selectiva: más RAM, SSD nuevo, GPU mejor. Te asesoro qué comprar según tu presupuesto y necesidades.",
    price: "Desde 500 CUP",
    tag: "hardware",
  },
]

const categoryConfig = {
  local: {
    label: "Soporte Local",
    description: "Servicios presenciales en Falcón, Placetas y alrededores",
    color: "primary",
    badge: "border-primary/30 text-primary bg-primary/5",
  },
  dev: {
    label: "Desarrollo Remoto",
    description: "Proyectos de software para clientes internacionales",
    color: "emerald",
    badge: "border-emerald-500/30 text-emerald-500 bg-emerald-500/5",
  },
  hardware: {
    label: "Servicio Técnico",
    description: "Reparación y mantenimiento de hardware de PC",
    color: "orange",
    badge: "border-orange-400/30 text-orange-400 bg-orange-400/5",
  },
}

export default function Servicios() {
  const [activeCategory, setActiveCategory] = useState<Category>("local")

  const filteredServices = services.filter(s => s.tag === activeCategory)

  return (
    <div className="py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw]">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center justify-center gap-2">
            <span className="text-primary">//</span> MODULOS_DISPONIBLES
          </div>
          <h2 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-foreground mb-4">
            Servicios
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-[600px] mx-auto">
            Tres líneas de trabajo. Elige la que necesites.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(Object.keys(categoryConfig) as Category[]).map((cat) => {
            const config = categoryConfig[cat]
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-mono font-semibold transition-all duration-200 ${
                  isActive
                    ? `${config.badge} border-opacity-100 shadow-glow`
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                }`}
              >
                {cat === "local" && <MapPin className="w-4 h-4" />}
                {cat === "dev" && <Globe className="w-4 h-4" />}
                {cat === "hardware" && <Wrench className="w-4 h-4" />}
                {config.label}
              </button>
            )
          })}
        </div>

        {/* Category description */}
        <div className="text-center mb-10">
          <p className="text-sm text-muted-foreground font-body">
            {categoryConfig[activeCategory].description}
          </p>
        </div>

        {/* Service grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            const Icon = service.icon
            return (
              <Link
                key={index}
                to={`/cotizador?categoria=${activeCategory}&servicio=${service.name.toLowerCase().replace(/\s+/g, '-').substring(0, 25)}`}
                className="group bg-card border border-border rounded-xl p-8 hover:border-primary/30 hover:shadow-glow transition-all duration-250 cursor-pointer relative overflow-hidden block"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-[10px] bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-mono font-bold text-[15px] text-foreground leading-tight">
                    {service.name}
                  </h4>
                </div>

                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 pl-[60px]">
                  {service.description}
                </p>

                <div className="pl-[60px] flex items-center justify-between">
                  <span className={`inline-block px-3 py-1 text-[11px] font-semibold uppercase tracking-wider border rounded ${categoryConfig[activeCategory].badge}`}>
                    {categoryConfig[activeCategory].label}
                  </span>
                  <span className="text-xs font-code text-muted-foreground">
                    {service.price}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-card border border-border rounded-xl px-8 py-5">
            <p className="font-body text-sm text-muted-foreground">
              <strong className="text-foreground">¿No encuentras lo que necesitas?</strong>{" "}
              Escribime por{" "}
              <a
                href="https://wa.me/5356418463"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                WhatsApp
              </a>{" "}
              y lo conversamos. Si es tecnología, seguro le encontramos la vuelta.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
