import { MessageSquare, Search, Calculator, CheckCircle, Globe, Wrench, Code } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  num: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const stepsLocal: Step[] = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Me escribes",
    description: "WhatsApp, Telegram, lo que uses. Me cuentas que te pasa. Primera orientación sin costo ni compromiso.",
  },
  {
    num: "02",
    icon: Search,
    title: "Reviso",
    description: "Voy donde estés (si es en Falcón) o conecto remoto. Diagnóstico honesto: te digo si lo puedo arreglar.",
  },
  {
    num: "03",
    icon: Calculator,
    title: "Cotizo",
    description: "Te digo cuánto cuesta antes de tocar nada. El precio se arma según lo que se haga. Sin sorpresas.",
  },
  {
    num: "04",
    icon: CheckCircle,
    title: "Arreglo y te explico",
    description: "Hago el trabajo, te explico qué pasó (en palabras humanas) y te doy 3 días de garantía si el mismo problema vuelve.",
  },
];

const stepsDev: Step[] = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Me contactas",
    description: "Email o WhatsApp con una descripción de tu proyecto. Cuéntame el problema que necesitas resolver.",
  },
  {
    num: "02",
    icon: Code,
    title: "Propuesta técnica",
    description: "Te envío un documento con alcance, tecnologías, tiempo estimado y presupuesto. Revisamos juntos.",
  },
  {
    num: "03",
    icon: Calculator,
    title: "Acuerdo y pago",
    description: "50% por adelantado para empezar, 50% al entregar. Pagos vía stablecoins (USDC) o el método que prefieras.",
  },
  {
    num: "04",
    icon: CheckCircle,
    title: "Desarrollo y entrega",
    description: "Te mando avances periódicos. Entrega final con código, documentación y soporte post-entrega de 7 días.",
  },
];

const stepsHardware: Step[] = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Consulta",
    description: "Me describes el problema de tu PC. Ruidos, calor, lentitud, pantallazos... todo sirve.",
  },
  {
    num: "02",
    icon: Wrench,
    title: "Diagnóstico",
    description: "Abro la torre (sí, ahora sí la abro), reviso componentes, temperaturas y estado físico. Diagnóstico gratis.",
  },
  {
    num: "03",
    icon: Calculator,
    title: "Presupuesto",
    description: "Te digo qué necesita: limpieza, cambio de pasta, pieza nueva... y cuánto cuesta la mano de obra.",
  },
  {
    num: "04",
    icon: CheckCircle,
    title: "Reparación y pruebas",
    description: "Hago el trabajo, armo todo de nuevo y pruebo estabilidad. Garantía de 3 días en reparaciones.",
  },
];

export default function Proceso() {
  return (
    <section id="proceso" className="py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw]">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center justify-center gap-2">
            <span className="text-primary">//</span> WORKFLOW
          </div>
          <h2 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-foreground mb-4">
            Cómo funciona
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-[500px] mx-auto">
            Cuatro pasos. Sin sorpresas. Sin tecnicismos que nadie entienda.
          </p>
        </div>

        {/* Local */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-xl text-foreground">Soporte Local</h3>
              <p className="text-sm text-muted-foreground font-body">Presencial en Falcón, Placetas</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stepsLocal.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-250 group"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="font-code text-5xl font-extrabold text-primary/15 leading-none mb-4">{step.num}</div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-mono font-bold text-base text-foreground mb-2">{step.title}</h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  {index < stepsLocal.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-border z-10">
                      <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-primary" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Hardware */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-orange-400/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-xl text-foreground">Servicio Técnico de Hardware</h3>
              <p className="text-sm text-muted-foreground font-body">Reparación y mantenimiento físico</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stepsHardware.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative bg-card border border-border rounded-xl p-8 hover:border-orange-400/30 transition-all duration-250 group"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="font-code text-5xl font-extrabold text-orange-400/15 leading-none mb-4">{step.num}</div>
                  <div className="w-10 h-10 rounded-lg bg-orange-400/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <h4 className="font-mono font-bold text-base text-foreground mb-2">{step.title}</h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  {index < stepsHardware.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-border z-10">
                      <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-orange-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Desarrollo Remoto */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-xl text-foreground">Desarrollo Remoto</h3>
              <p className="text-sm text-muted-foreground font-body">Proyectos de software internacionales</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stepsDev.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative bg-card border border-border rounded-xl p-8 hover:border-emerald-500/30 transition-all duration-250 group"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="font-code text-5xl font-extrabold text-emerald-500/15 leading-none mb-4">{step.num}</div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h4 className="font-mono font-bold text-base text-foreground mb-2">{step.title}</h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  {index < stepsDev.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-border z-10">
                      <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
