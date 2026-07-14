import { Shield, Zap, Monitor, HardDrive, MessageCircle, Smartphone, KeyRound, Download, Printer, Wifi, Tv, Lock, ShoppingCart, Usb, FileText, Palette, Image, FileUser, Video, Gamepad2, Code, Globe, Terminal, Layers, Server } from "lucide-react"
import { Link } from 'react-router'
import type { LucideIcon } from "lucide-react"
import Proceso from './Proceso'

interface Service {
  icon: LucideIcon
  name: string
  description: string
  tag: "software" | "design" | "media" | "remote"
  id: string
}

const services: Service[] = [
  { id: "virus", icon: Shield, name: "Limpieza de virus y malware", description: "Eliminación completa de virus, spyware, adware, toolbars y programas indeseados que ralentizan tu equipo.", tag: "software" },
  { id: "optimizar", icon: Zap, name: "Optimización y aceleración", description: "Limpieza profunda del sistema, liberación de espacio, desactivación de programas innecesarios al arranque.", tag: "software" },
  { id: "formateo", icon: Monitor, name: "Formateo e instalación limpia", description: "Windows o Linux desde cero. Respaldo previo de tus archivos, configuración posterior.", tag: "software" },
  { id: "linux", icon: Terminal, name: "Migración a Linux (Arch, Ubuntu, etc.)", description: "Tu PC ya no corre Windows? La revivo con Linux (especialmente Arch Linux) o la distro que prefieras. Capacitación básica incluida.", tag: "software" },
  { id: "arch", icon: Layers, name: "Instalación y configuración de Arch Linux", description: "Instalación manual de Arch Linux con particionado, sistema base, entorno gráfico (i3, KDE, GNOME) y paquetes esenciales. Configuración optimizada para tu hardware.", tag: "software" },
  { id: "personalizacion", icon: Layers, name: "Personalización de escritorio (i3, KDE, GNOME)", description: "Configuración de atajos, temas, paneles, widgets y scripts para que tu entorno se adapte a tu flujo de trabajo.", tag: "software" },
  { id: "recuperar", icon: HardDrive, name: "Recuperación de archivos", description: "Fotos, documentos, videos borrados o en discos con problemas lógicos. No garantizo lo imposible, pero intento todo.", tag: "software" },
  { id: "whatsapp", icon: MessageCircle, name: "Recuperación de chats de WhatsApp", description: "Mensajes borrados, cambio de celular sin perder conversaciones, respaldo en Google Drive o local.", tag: "software" },
  { id: "celular", icon: Smartphone, name: "Configuración de celulares", description: "Apps de banca, WhatsApp Business, sincronización de cuentas, liberación de espacio, optimización de batería.", tag: "software" },
  { id: "cuentas", icon: KeyRound, name: "Recuperación de cuentas", description: "Gmail, Facebook, correos electrónicos a los que perdiste acceso. Verificación de identidad y restablecimiento.", tag: "software" },
  { id: "programas", icon: Download, name: "Instalación de programas", description: "Antivirus, LibreOffice, navegadores, reproductores, utilidades. Todo legal y configurado para tu uso.", tag: "software" },
  { id: "impresora", icon: Printer, name: "Configuración de impresoras", description: "Impresoras locales o en red (WiFi o cable). Escáner, ajustes de calidad y solución de problemas de comunicación.", tag: "software" },
  { id: "wifi", icon: Wifi, name: "Configuración de WiFi y router", description: "Configuración de redes, contraseñas, puertos, DHCP, y solución de problemas de conectividad.", tag: "software" },
  { id: "smarttv", icon: Tv, name: "Configuración de Smart TV", description: "Configuración de aplicaciones, cuentas, redes, actualizaciones y sincronización con dispositivos móviles.", tag: "software" },
  { id: "seguridad", icon: Lock, name: "Asesoría en seguridad digital", description: "Recomendaciones para proteger tus cuentas, contraseñas y datos personales. Uso de autenticación de dos factores y gestores de contraseñas.", tag: "software" },
  { id: "compra", icon: ShoppingCart, name: "Asesoría para compra de equipos", description: "Te ayudo a elegir la PC, laptop o componente que mejor se ajuste a tu presupuesto y necesidades (no vendo, solo aconsejo).", tag: "software" },
  { id: "pendrive", icon: Usb, name: "Pendrive booteable", description: "Creación de USB booteable con Arch Linux, Windows, Ubuntu, o cualquier sistema que necesites.", tag: "software" },
  { id: "digitalizar", icon: FileText, name: "Digitalización de documentos", description: "Escaneo, OCR, organización y conversión de documentos físicos a digitales (PDF, imágenes editables).", tag: "software" },
  { id: "servidor", icon: Server, name: "Configuración de servidor local / NAS", description: "Montaje y configuración de servidor NAS, compartición de archivos, backups automáticos y acceso remoto.", tag: "software" },
  { id: "diseno", icon: Palette, name: "Diseño gráfico", description: "Diseño de flyers, logos, banners, tarjetas de presentación, y material para redes sociales.", tag: "design" },
  { id: "fotos", icon: Image, name: "Edición y retoque de fotos", description: "Corrección de color, recorte, eliminación de objetos, retoque de retratos y mejora de calidad.", tag: "design" },
  { id: "cv", icon: FileUser, name: "Creación de CV digital", description: "Diseño de currículum moderno, legible y profesional, en formatos PDF, Word o LaTeX.", tag: "design" },
  { id: "video", icon: Video, name: "Conversión y compresión de video", description: "Conversión entre formatos, compresión para redes sociales, extracción de audio y edición básica.", tag: "media" },
  { id: "emuladores", icon: Gamepad2, name: "Instalación de emuladores y juegos retro", description: "Configuración de emuladores (NES, SNES, GameBoy, PlayStation, etc.) y juegos clásicos en tu PC.", tag: "media" },
  { id: "scripts", icon: Code, name: "Scripts y automatización", description: "Automatización de tareas con Python, Bash o PowerShell. Desde renombrar archivos hasta procesos más complejos.", tag: "software" },
  { id: "web", icon: Globe, name: "Asesoría básica para sitios web", description: "Instalación de WordPress, configuración de dominios, correos, y recomendaciones de hosting.", tag: "software" }
]

export default function Servicios() {
  return (
    <section id="servicios" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Servicios
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Todo lo que puedo hacer por ti. Si no está en la lista, pregúntame igual.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                id={service.id}
                className="group bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#1793D1]/10 rounded-lg text-[#1793D1] group-hover:bg-[#1793D1] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                    <span className="inline-block mt-2 text-xs font-medium text-[#1793D1] bg-[#1793D1]/10 px-2 py-0.5 rounded">
                      {service.tag === "software" ? "Software" : service.tag === "design" ? "Diseño" : service.tag === "media" ? "Multimedia" : "Remoto"}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/contacto"
            className="inline-flex items-center px-6 py-3 bg-[#1793D1] text-white font-medium rounded-lg hover:bg-[#0f7ab3] transition-colors"
          >
            ¿No ves lo que buscas? Contáctame
          </Link>
        </div>
      </div>

      {/* Sección Proceso incrustada */}
      <div className="mt-16 border-t border-gray-200 pt-12">
        <Proceso />
      </div>
    </section>
  )
}
