import { useState } from "react"
import { MessageCircle, Send, Mail, MapPin, Clock, Code, Music, Palette, Gamepad2, Globe, Wrench, Terminal } from "lucide-react"

const contactMethods = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+53 5 6418463",
    href: "https://wa.me/5356418463?text=Hola%20Dragoland%2C%20tengo%20una%20duda%20sobre%20mi%20equipo",
    description: "Respuesta rápida, atención directa",
  },
  {
    icon: Send,
    label: "Telegram",
    value: "@diario_del_informatico",
    href: "https://t.me/diario_del_informatico",
    description: "Noticias, trucos y recursos",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: "norland.chavez333@gmail.com",
    href: "mailto:norland.chavez333@gmail.com",
    description: "Para proyectos y propuestas",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Falcón, Placetas, Villa Clara",
    href: null,
    description: "Atención presencial",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun–Sáb 9:00–20:00",
    href: null,
    description: "Respuesta en 24–48h",
  },
]

const skillTags = [
  "Python", "Bash", "Linux", "Docker", "FastAPI", "PostgreSQL",
  "GIMP", "Blender", "FL Studio", "Emuladores", "C++", "Java", "Arch Linux",
]

export default function SobreMi() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center justify-center gap-2">
          <span className="text-primary">//</span> CONECTEMOS
        </div>
        <h1 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-foreground mb-4">
          Sobre mí
        </h1>
        <p className="font-body text-base text-muted-foreground max-w-[500px] mx-auto">
          ¿Quién soy? Un vecino con paciencia y Linux. No soy senior, no trabajo en Google, no tengo certificaciones de Cisco. Pero me defiendo. :3
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start">
        {/* Left — Bio + Contact */}
        <div className="space-y-8">
          {/* Bio card */}
          <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
            <h2 className="font-mono font-bold text-lg text-primary mb-5">
              Hey, soy Dragoland :D
            </h2>
            <div className="font-body text-muted-foreground space-y-4 leading-relaxed mb-6">
              <p className="text-foreground">
                Estudio <strong>Ingeniería de Ciencias Informáticas en la UCI</strong>,
                La Habana. Voy para tercer año. No soy senior, no trabajo en
                Google, no tengo certificaciones de Cisco. Pero me defiendo:{" "}
                <strong>Java, Python, Bash, Docker</strong>, y <strong>C++</strong> me
                está comiendo la cabeza en este momento (lo normal).
              </p>
              <p>
                Vivo en <strong className="text-foreground">Falcón, Placetas</strong>, y cuando no estoy en la universidad arreglo PCs,
                instalo Linux (especialmente <strong>Arch Linux</strong>), diseño flyers, desarrollo software a medida y escribo scripts que automatizan
                tareas que nadie debería hacer a mano.
              </p>
              <p>
                También trabajo <strong className="text-foreground">remotamente</strong> con clientes internacionales en proyectos de 
                automatización, IA local, APIs y desarrollo de software desktop nativo.
              </p>
              <p>
                Tengo un canal en Telegram —{" "}
                <em>Diario de un Informático Universitario y Artista</em> —
                donde hablo de tecnología sin pretender ser un experto de
                YouTube.
              </p>
              <p>
                <strong className="text-foreground">Más allá del código:</strong>{" "}
                También soy productor musical (FL Studio, LMMS), diseñador
                gráfico (Krita, GIMP, Blender), y tengo una obsesión sana con
                los videojuegos retro y los emuladores. Me gusta que las cosas sean ligeras, rápidas y no dependan de 40
                librerías externas.
              </p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {skillTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-mono font-medium text-primary bg-primary/10 border border-primary/20 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="bg-destructive/5 border-l-[3px] border-destructive rounded-r-lg p-4">
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                <strong className="text-destructive">Transparencia total:</strong>{" "}
                Garantía de una semana en todas las reparaciones. Me libero de cualquier cargo de responsabilidad si despues de la garantia
                la PC presenta algun problema. Lea todos los servicios que puedo ofrecer y de no presentar alguno, pregunte que necesita
                y trabajamos en ello. Este sitio fue creado por un universitario de la UCI con ganas de salir adelante por lo que pido,
                no me trate de ignorante si desconozco de algun problema o solucion a un problema. Los precios expuestos no son definitivos
                por lo que pueden ser mayores o menores dependiendo del caso.
              </p>
            </div>
          </div>

          {/* Contact methods */}
          <div className="space-y-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-all duration-200 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground mb-0.5">{method.label}</div>
                    {method.href ? (
                      <a
                        href={method.href}
                        target={method.external ? "_blank" : undefined}
                        rel={method.external ? "noopener noreferrer" : undefined}
                        className="font-mono font-semibold text-sm text-foreground hover:text-primary transition-colors truncate block"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span className="font-mono font-semibold text-sm text-foreground truncate block">
                        {method.value}
                      </span>
                    )}
                    <div className="text-xs text-muted-foreground mt-0.5">{method.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right — Avatar + Form */}
        <div className="space-y-6">
          {/* Avatar */}
          <div className="relative aspect-square max-w-[400px] mx-auto lg:mx-0 rounded-2xl overflow-hidden border-2 border-border bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <img
              src="/images/avatar-cartoon.png"
              alt="BitCriollo Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-center">
              <span className="font-mono font-bold text-sm text-foreground">Dragoland</span>
              <span className="block text-xs text-muted-foreground font-mono">@Dragoland · UCI 3er año</span>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                  <Code className="w-3 h-3" /> Dev
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded">
                  <Wrench className="w-3 h-3" /> HW
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  <Globe className="w-3 h-3" /> Remote
                </span>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/5356418463?text=Hola%20Dragoland%2C%20tengo%20un%20problema%20con%20mi%20equipo"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary text-primary-foreground font-semibold text-sm py-4 rounded-xl hover:brightness-110 transition-all duration-200 text-center"
          >
            Escríbeme por WhatsApp
          </a>

          {/* Mini form */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-mono font-bold text-sm text-foreground mb-4">
              O déjame un mensaje
            </h3>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-emerald-500" />
                </div>
                <p className="font-mono font-bold text-foreground text-sm">¡Mensaje enviado!</p>
                <p className="text-xs text-muted-foreground">Te respondo pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 font-mono text-sm text-foreground focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="">¿Qué necesitas?</option>
                  <option value="virus">Limpieza de virus</option>
                  <option value="linux">Migración a Linux</option>
                  <option value="optimizar">Optimización</option>
                  <option value="recuperar">Recuperación de datos</option>
                  <option value="hardware">Servicio técnico hardware</option>
                  <option value="diseno">Diseño gráfico</option>
                  <option value="software">Software personalizado</option>
                  <option value="ia">Instalación de IA local</option>
                  <option value="otro">Otro</option>
                </select>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe tu problema..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-secondary border border-border text-foreground font-semibold text-sm py-2.5 rounded-lg hover:border-primary hover:text-primary transition-all duration-200"
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
