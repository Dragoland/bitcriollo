import { Calculator, CheckCircle, Code, MessageSquare, Search, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { CATEGORIES } from '../data/services'
import type { Category } from '../data/services'

interface Step {
  icon: LucideIcon
  title: string
  description: string
}

interface Flow {
  category: Category
  subtitle: string
  steps: Step[]
}

const FLOWS: Flow[] = [
  {
    category: 'local',
    subtitle: 'Presencial en Falcón, Placetas',
    steps: [
      { icon: MessageSquare, title: 'Me escribes', description: 'WhatsApp, Telegram, lo que uses. Me cuentas qué te pasa. Primera orientación sin costo ni compromiso.' },
      { icon: Search, title: 'Reviso', description: 'Voy donde estés (si es en Falcón) o conecto remoto. Diagnóstico honesto y gratuito: te digo si lo puedo arreglar.' },
      { icon: Calculator, title: 'Cotizo', description: 'Te digo cuánto cuesta antes de tocar nada. El precio se arma según lo que se haga. Sin sorpresas.' },
      { icon: CheckCircle, title: 'Arreglo y te explico', description: 'Hago el trabajo, te explico qué pasó (en palabras humanas) y te doy 2 semanas de garantía si el mismo problema vuelve.' },
    ],
  },
  {
    category: 'hardware',
    subtitle: 'Reparación y mantenimiento físico',
    steps: [
      { icon: MessageSquare, title: 'Consulta', description: 'Me describes el problema de tu PC. Ruidos, calor, lentitud, pantallazos... todo sirve.' },
      { icon: Wrench, title: 'Diagnóstico', description: 'Abro la torre, reviso componentes, temperaturas y estado físico. Diagnóstico gratuito y honesto.' },
      { icon: Calculator, title: 'Presupuesto', description: 'Te digo qué necesita: limpieza, cambio de pasta, pieza nueva... y cuánto cuesta la mano de obra.' },
      { icon: CheckCircle, title: 'Reparación y pruebas', description: 'Hago el trabajo, armo todo de nuevo y pruebo estabilidad. Garantía de 2 semanas en reparaciones.' },
    ],
  },
  {
    category: 'dev',
    subtitle: 'Proyectos de software internacionales',
    steps: [
      { icon: MessageSquare, title: 'Me contactas', description: 'Email o WhatsApp con una descripción de tu proyecto. Cuéntame el problema que necesitas resolver.' },
      { icon: Code, title: 'Propuesta técnica', description: 'Te envío un documento con alcance, tecnologías, tiempo estimado y presupuesto. Revisamos juntos.' },
      { icon: Calculator, title: 'Acuerdo y pago', description: '50% por adelantado para empezar, 50% al entregar. Pagos vía TropiPay o criptomonedas.' },
      { icon: CheckCircle, title: 'Desarrollo y entrega', description: 'Te mando avances periódicos. Entrega final con código, documentación y 1 mes de soporte post-entrega.' },
    ],
  },
]

export default function Proceso() {
  return (
    <section className="py-20 lg:py-28">
      <div className="site-container">
        <SectionHeader
          as="h1"
          eyebrow="WORKFLOW"
          title="Cómo funciona"
          description="Cuatro pasos. Sin sorpresas. Sin tecnicismos que nadie entienda."
        />

        <div className="space-y-20">
          {FLOWS.map((flow) => {
            const cat = CATEGORIES[flow.category]
            const FlowIcon = cat.icon
            return (
              <Reveal key={flow.category}>
                <div className="mb-8 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${cat.iconBg}`}>
                    <FlowIcon className={`h-5 w-5 ${cat.text}`} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-mono text-xl font-bold text-foreground">{cat.label}</h2>
                    <p className="font-body text-sm text-muted-foreground">{flow.subtitle}</p>
                  </div>
                </div>

                <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {flow.steps.map((step, i) => {
                    const Icon = step.icon
                    return (
                      <li
                        key={step.title}
                        className={`group relative overflow-hidden rounded-xl border border-border bg-card p-7 transition-colors ${cat.hoverBorder}`}
                      >
                        <div
                          className={`absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${cat.bar}`}
                          aria-hidden="true"
                        />
                        <div className={`mb-4 font-code text-5xl font-extrabold leading-none opacity-20 ${cat.text}`} aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${cat.iconBg}`}>
                          <Icon className={`h-5 w-5 ${cat.text}`} aria-hidden="true" />
                        </div>
                        <h3 className="mb-2 font-mono text-base font-bold text-foreground">{step.title}</h3>
                        <p className="font-body text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                      </li>
                    )
                  })}
                </ol>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
