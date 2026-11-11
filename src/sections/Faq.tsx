import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { SITE } from '../lib/site'

// Edita las respuestas con tus condiciones reales (formas de pago, plazos).
const FAQS = [
  {
    q: '¿Qué zona cubres?',
    a: `El soporte presencial es en ${SITE.location} y alrededores. Todo lo demás (desarrollo remoto, scripts, automatización, IA local) lo hago para clientes de cualquier parte del mundo, por Telegram, WhatsApp o correo.`,
  },
  {
    q: '¿Cuánto cuesta el diagnóstico?',
    a: 'Nada. Reviso tu caso y te digo si tiene arreglo y cuánto costaría, antes de tocar nada. Si decides no continuar, no pagas.',
  },
  {
    q: '¿Qué formas de pago aceptas?',
    a: 'En efectivo en CUP para servicios locales. Para trabajos remotos y software, coordino por WhatsApp según lo que te quede más cómodo desde tu país, ya sea CUP en transferencia, USD coordinado conmigo o TropiPay.',
  },
  {
    q: '¿Cuánto tarda un servicio?',
    a: 'La mayoría de los trabajos locales se entregan el mismo día o al día siguiente, depende mucho de la dificultad y la disponibilidad eléctrica. Los proyectos de desarrollo remoto dependen del alcance: te doy una fecha cerrada antes de empezar y aviso si algo la mueve.',
  },
  {
    q: '¿Qué garantía das?',
    a: '2 semanas en soporte local y servicio técnico: si el mismo problema vuelve, lo resuelvo sin cobrarte de nuevo. En desarrollo remoto, la garantía cubre corregir los errores propios del entregable.',
  },
  {
    q: '¿Atiendes urgencias?',
    a: 'Sí. En el cotizador marca "Es urgente" (+25%) y le doy prioridad sobre el resto de la cola.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section className="py-20 lg:py-28">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <div className="site-container max-w-3xl">
        <SectionHeader
          eyebrow="FAQ"
          title="Preguntas frecuentes"
          description="Lo que casi todo el mundo pregunta antes de escribirme."
        />
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className="rounded-xl border border-border bg-card">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-mono text-sm font-semibold text-foreground"
                >
                  {f.q}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  hidden={!isOpen}
                  className="px-5 pb-4 font-body text-sm text-muted-foreground"
                >
                  {f.a}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
