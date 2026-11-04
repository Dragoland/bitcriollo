import { useState } from 'react'
import type { FormEvent } from 'react'
import { Clock, Code, Globe, Mail, MapPin, MessageCircle, Send, Wrench } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { SITE, mailtoUrl, telegramUrl, waLink, WA } from '../lib/site'
import { usePageMeta } from '../lib/usePageMeta'
import Stack from '../sections/Stack'

const SKILLS = [
  'Python', 'Bash', 'Linux', 'Docker', 'FastAPI', 'PostgreSQL',
  'GIMP', 'Blender', 'FL Studio', 'Emuladores', 'C++', 'Java', 'Arch Linux',
]

const SERVICE_OPTIONS: Record<string, string> = {
  virus: 'Limpieza de virus',
  linux: 'Migración a Linux',
  optimizar: 'Optimización',
  recuperar: 'Recuperación de datos',
  hardware: 'Servicio técnico de hardware',
  diseno: 'Diseño gráfico',
  software: 'Software personalizado',
  ia: 'Instalación de IA local',
  otro: 'Otro',
}

const CONTACTS = [
  { icon: MessageCircle, label: 'WhatsApp', value: SITE.phoneDisplay, href: waLink(WA.duda), note: 'Respuesta rápida, atención directa' },
  { icon: Send, label: 'Telegram', value: `@${SITE.telegram}`, href: telegramUrl, note: 'Noticias, trucos y recursos', external: true },
  { icon: Mail, label: 'Email', value: SITE.email, href: mailtoUrl, note: 'Para proyectos y propuestas' },
  { icon: MapPin, label: 'Ubicación', value: 'Falcón, Placetas, Villa Clara', note: 'Atención presencial' },
  { icon: Clock, label: 'Horario', value: SITE.hours, note: 'Respuesta en 24–48 h' },
]

const inputClass =
  'w-full rounded-lg border border-border bg-secondary px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none'
const labelClass = 'mb-1.5 block font-mono text-xs text-muted-foreground'

export default function SobreMi() {
  usePageMeta({
    title: 'Sobre mí — Norland Chávez (Dragoland)',
    description:
      'Estudiante de Ingeniería Informática en la UCI. Arreglo PCs, instalo Linux, desarrollo software y trabajo remoto con clientes internacionales desde Placetas, Cuba.',
    path: '/sobre-mi',
  })

  const [form, setForm] = useState({ name: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = [
      `Hola Dragoland, soy ${form.name.trim()}.`,
      `Servicio: ${SERVICE_OPTIONS[form.service] ?? 'No especificado'}`,
      '',
      form.message.trim(),
    ].join('\n')
    window.open(waLink(text), '_blank', 'noopener,noreferrer')
    setSent(true)
    setForm({ name: '', service: '', message: '' })
    window.setTimeout(() => setSent(false), 6000)
  }

  return (
    <div className="py-20 lg:py-28">
      <div className="site-container">
        <SectionHeader
          as="h1"
          eyebrow="CONECTEMOS"
          title="Sobre mí"
          description="¿Quién soy? Un vecino con paciencia y Linux. No soy senior, no trabajo en Google, no tengo certificaciones de Cisco. Pero me defiendo."
        />

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Izquierda: bio + contacto */}
          <div className="space-y-8">
            <Reveal className="rounded-xl border border-border bg-card p-6 lg:p-8">
              <h2 className="mb-5 font-mono text-lg font-bold text-primary">
                Hey, soy Norland (Dragoland en internet, porque los nicks raros son ley)
              </h2>
              <div className="mb-6 space-y-4 font-body leading-relaxed text-muted-foreground">
                <p className="text-foreground">
                  Estudio <strong>Ingeniería de Ciencias Informáticas en la UCI</strong>, La Habana, y voy para tercer
                  año. Me defiendo con <strong>Java, Python, Bash y Docker</strong>, y <strong>C++</strong> me está
                  comiendo la cabeza en este momento (lo normal).
                </p>
                <p>
                  Vivo en <strong className="text-foreground">Falcón, Placetas, Villa Clara</strong>. Entre semestres
                  arreglo PCs, instalo Linux (especialmente <strong>Arch Linux</strong>), diseño flyers, desarrollo
                  software a medida y escribo scripts que automatizan tareas que nadie debería hacer a mano.
                </p>
                <p>
                  También trabajo <strong className="text-foreground">remotamente</strong> con clientes internacionales en
                  automatización, IA local, APIs y software de escritorio nativo.
                </p>
                <p>
                  Tengo un canal en Telegram — <em>Diario de un Informático Universitario y Artista</em> — donde hablo
                  de tecnología sin pretender ser un experto de YouTube.
                </p>
                <p>
                  <strong className="text-foreground">Más allá del código:</strong> soy productor musical (FL Studio,
                  LMMS), diseñador gráfico (Krita, GIMP, Blender) y tengo una obsesión sana con los videojuegos retro y
                  los emuladores. Prefiero el software ligero, rápido y nativo, que no dependa de 40 librerías externas.
                </p>
              </div>

              <ul className="mb-6 flex flex-wrap gap-2" aria-label="Tecnologías">
                {SKILLS.map((tag) => (
                  <li key={tag} className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-xs font-medium text-primary">
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="rounded-r-lg border-l-[3px] border-destructive bg-destructive/5 p-4">
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-destructive">Transparencia total:</strong> abro torres de PC y laptops.
                  Limpieza, cambio de pasta térmica, instalación de RAM/SSD, diagnóstico de componentes y armado
                  completo. Si una pieza está dañada sin arreglo, te lo digo antes de que gastes dinero. Garantía de 2
                  semanas en todas las reparaciones.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <ul className="space-y-3">
                {CONTACTS.map(({ icon: Icon, label, value, href, note, external }) => (
                  <li key={label} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 text-xs text-muted-foreground">{label}</div>
                      {href ? (
                        <a
                          href={href}
                          {...(external || label === 'WhatsApp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="block truncate font-mono text-sm font-semibold text-foreground transition-colors hover:text-primary"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="block truncate font-mono text-sm font-semibold text-foreground">{value}</span>
                      )}
                      <div className="mt-0.5 text-xs text-muted-foreground">{note}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Derecha: avatar + formulario */}
          <div className="space-y-6">
            <Reveal>
              <div className="relative mx-auto aspect-square max-w-[400px] overflow-hidden rounded-2xl border-2 border-border bg-gradient-to-br from-primary/20 to-primary/5 lg:mx-0">
                <img
                  src="/images/avatar-cartoon.png"
                  alt={`Avatar de ${SITE.handle}`}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="absolute inset-x-4 bottom-4 rounded-lg border border-border bg-card/90 px-4 py-3 text-center backdrop-blur-sm">
                  <span className="font-mono text-sm font-bold text-foreground">{SITE.handle}</span>
                  <span className="block font-mono text-xs text-muted-foreground">@{SITE.handle} · Estudiante de Ingeniería Informática (UCI)</span>
                  <div className="mt-1.5 flex items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 text-[11px] text-primary"><Code className="h-3 w-3" aria-hidden="true" /> Dev</span>
                    <span className="inline-flex items-center gap-1 rounded bg-hardware/10 px-1.5 py-0.5 text-[11px] text-hardware"><Wrench className="h-3 w-3" aria-hidden="true" /> HW</span>
                    <span className="inline-flex items-center gap-1 rounded bg-remote/10 px-1.5 py-0.5 text-[11px] text-remote"><Globe className="h-3 w-3" aria-hidden="true" /> Remoto</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <a
              href={waLink(WA.equipo)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl bg-primary py-4 text-center text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Escríbeme por WhatsApp
            </a>

            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-1 font-mono text-sm font-bold text-foreground">O prepara tu mensaje aquí</h2>
              <p className="mb-4 font-body text-xs text-muted-foreground">
                Al enviar se abrirá WhatsApp con tu mensaje listo para mandar.
              </p>

              {sent ? (
                <div role="status" className="py-8 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-remote/10">
                    <MessageCircle className="h-6 w-6 text-remote" aria-hidden="true" />
                  </div>
                  <p className="font-mono text-sm font-bold text-foreground">¡Listo!</p>
                  <p className="text-xs text-muted-foreground">
                    Se abrió WhatsApp en otra pestaña. Solo falta que pulses «Enviar» allí.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="sm-name" className={labelClass}>Tu nombre</label>
                    <input id="sm-name" type="text" required autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="sm-service" className={labelClass}>¿Qué necesitas?</label>
                    <select id="sm-service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={inputClass}>
                      <option value="">Selecciona un servicio</option>
                      {Object.entries(SERVICE_OPTIONS).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sm-message" className={labelClass}>Cuéntame el problema</label>
                    <textarea id="sm-message" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} />
                  </div>
                  <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" /> Enviar por WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-24">
          <Stack />
        </div>
      </div>
    </div>
  )
}
