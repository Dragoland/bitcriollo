import {
  Shield, Zap, Monitor, HardDrive, MessageCircle, Smartphone, KeyRound,
  Download, Printer, Wifi, Tv, Lock, ShoppingCart, Usb, FileText,
  Palette, Image, FileUser, Video, Gamepad2, Code, Globe, Terminal,
  Layers, Server,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from 'react-router'
import Proceso from './Proceso'

interface Service {
  icon: LucideIcon;
  name: string;
  description: string;
  tag: "software" | "design" | "media" | "remote";
}

const services: Service[] = [
  {
    icon: Shield,
    name: "Limpieza de virus y malware",
    description: "Eliminación completa de virus, spyware, adware, toolbars y programas indeseados que ralentizan tu equipo.",
    tag: "software",
  },
  {
    icon: Zap,
    name: "Optimización y aceleración",
    description: "Limpieza profunda del sistema, liberación de espacio, desactivación de programas innecesarios al arranque.",
    tag: "software",
  },
  {
    icon: Monitor,
    name: "Formateo e instalación limpia",
    description: "Windows o Linux desde cero. Respaldo previo de tus archivos, configuración posterior.",
    tag: "software",
  },
  {
    icon: Terminal,
    name: "Migración a Linux (Arch, Ubuntu, etc.)",
    description: "Tu PC ya no corre Windows? La revivo con Linux (especialmente Arch Linux) o la distro que prefieras. Capacitación básica incluida.",
    tag: "software",
  },
  {
    icon: Layers,
    name: "Instalación y configuración de Arch Linux",
    description: "Instalación manual de Arch Linux con particionado, sistema base, entorno gráfico (i3, KDE, GNOME) y paquetes esenciales.",
    tag: "software",
  },
  {
    icon: Layers,
    name: "Personalización de escritorio (i3, KDE, GNOME)",
    description: "Configuración de atajos, temas, paneles, widgets y scripts para que tu entorno se adapte a tu flujo de trabajo.",
    tag: "software",
  },
  {
    icon: HardDrive,
    name: "Recuperación de archivos",
    description: "Fotos, documentos, videos borrados o en discos con problemas lógicos. No garantizo lo imposible, pero intento todo.",
    tag: "software",
  },
  {
    icon: MessageCircle,
    name: "Recuperación de chats de WhatsApp",
    description: "Mensajes borrados, cambio de celular sin perder conversaciones, respaldo en Google Drive o local.",
    tag: "software",
  },
  {
    icon: Smartphone,
    name: "Configuración de celulares",
    description: "Apps de banca, WhatsApp Business, sincronización de cuentas, liberación de espacio, optimización de batería.",
    tag: "software",
  },
  {
    icon: KeyRound,
    name: "Recuperación de cuentas",
    description: "Gmail, Facebook, correos electrónicos a los que perdiste acceso. Verificación de identidad y restablecimiento.",
    tag: "software",
  },
  {
    icon: Download,
    name: "Instalación de programas",
    description: "Antivirus, LibreOffice, navegadores, reproductores, utilidades. Todo legal y configurado para tu uso.",
    tag: "software",
  },
  {
    icon: Printer,
    name: "Configuración de impresoras",
    description: "Instalación de drivers, configuración en red, resolución de errores de impresión. Sin abrir la impresora.",
    tag: "software",
  },
  {
    icon: Wifi,
    name: "Configuración de WiFi y routers",
    description: "Cambio de contraseña, mejora de cobertura, solución de desconexiones. Solo configuración, no cableado.",
    tag: "software",
  },
  {
    icon: Tv,
    name: "Configuración de Smart TV",
    description: "Instalación de apps, configuración de streaming, conexión con celular, resolución de errores.",
    tag: "software",
  },
  {
    icon: Lock,
    name: "Asesoría en seguridad digital",
    description: "Cómo evitar estafas por WhatsApp, navegación segura, backups automáticos, protección de tus datos personales.",
    tag: "software",
  },
  {
    icon: ShoppingCart,
    name: "Asesoría para compra de equipos",
    description: "Te quieren vender una PC vieja como nueva? Te digo qué vale la pena y qué es una estafa antes de que pagues.",
    tag: "software",
  },
  {
    icon: Usb,
    name: "Creación de pendrives booteables",
    description: "Linux, Windows, herramientas de recuperación. Te preparo el pendrive para que puedas arreglar tu PC tú mismo después.",
    tag: "software",
  },
  {
    icon: FileText,
    name: "Digitalización de documentos",
    description: "Escaneo, conversión a PDF, compresión, organización de archivos. Ideal para trámites y papeleo.",
    tag: "software",
  },
  {
    icon: Server,
    name: "Configuración de servidor local / NAS",
    description: "Montaje de servidor de archivos, multimedia o backups en tu red local con Linux. Ideal para compartir en casa o negocio.",
    tag: "software",
  },
  {
    icon: Palette,
    name: "Diseño gráfico",
    description: "Flyers, posters, tarjetas de presentación, logos, invitaciones, menús para negocios, diplomas y certificados.",
    tag: "design",
  },
  {
    icon: Image,
    name: "Edición y retoque de fotos",
    description: "Corrección de color, eliminación de objetos, mejoras de iluminación, collages, montajes fotográficos.",
    tag: "design",
  },
  {
    icon: FileUser,
    name: "Creación de currículums digitales",
    description: "CV profesional en PDF, cartas de presentación, portafolios simples. Para que te veas bien sin gastar fortuna.",
    tag: "design",
  },
  {
    icon: Video,
    name: "Conversión y compresión de videos",
    description: "MP4, AVI, MKV. Reduzco el tamaño para que quepa en WhatsApp o USB sin perder calidad visible.",
    tag: "media",
  },
  {
    icon: Gamepad2,
    name: "Instalación de emuladores y juegos retro",
    description: "Configuro emuladores de consolas clásicas en tu PC o celular. Revive los juegos de tu infancia.",
    tag: "media",
  },
  {
    icon: Code,
    name: "Desarrollo y automatización",
    description: "Scripts en Python, utilidades personalizadas, automatización de tareas repetitivas. Cotizo según complejidad.",
    tag: "remote",
  },
  {
    icon: Globe,
    name: "Soporte técnico remoto",
    description: "Para clientes fuera del pueblo: resolución de problemas en Linux y Windows vía conexión remota cuando el internet lo permita.",
    tag: "remote",
  },
];

const tagStyles = {
  software: "border-primary/30 text-primary bg-primary/5",
  design: "border-yellow-400/30 text-yellow-600 bg-yellow-400/5 dark:text-yellow-400",
  media: "border-orange-400/30 text-orange-600 bg-orange-400/5 dark:text-orange-400",
  remote: "border-emerald-500/30 text-emerald-600 bg-emerald-500/5 dark:text-emerald-400",
};

const tagLabels = {
  software: "Software",
  design: "Diseño",
  media: "Multimedia",
  remote: "Remoto",
};

export default function Servicios() {
  return (
    <>
      <section id="servicios" className="py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw]">
          {/* Section header */}
          <div className="text-center animate-fade-up mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center justify-center gap-2">
              <span className="text-primary">//</span> MODULOS_DISPONIBLES
            </div>
            <h2 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-foreground mb-4">
              Servicios
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-[600px] mx-auto">
              Todo a nivel de software. Si se arregla sin abrir la máquina, yo lo
              hago. Si hay que abrirla, te digo antes y te recomiendo a alguien de
              confianza.
            </p>
          </div>

          {/* Service grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  to={`/cotizador?servicio=${service.id}`}
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

                  <div className="pl-[60px]">
                    <span
                      className={`inline-block px-3 py-1 text-[11px] font-semibold uppercase tracking-wider border rounded ${tagStyles[service.tag]}`}
                    >
                      {tagLabels[service.tag]}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Proceso />
    </>
  );
}
