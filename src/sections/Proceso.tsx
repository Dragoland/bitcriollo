import { MessageSquare, Search, Calculator, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  num: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Me escribes",
    description:
      "WhatsApp, Telegram, lo que uses. Me cuentas que te pasa. Primera orientacion sin costo ni compromiso.",
  },
  {
    num: "02",
    icon: Search,
    title: "Reviso",
    description:
      "Voy donde estes (si es en Falcon) o conecto remoto. Diagnostico honesto: te digo si lo puedo arreglar o si necesitas un tecnico de hardware.",
  },
  {
    num: "03",
    icon: Calculator,
    title: "Cotizo",
    description:
      "Te digo cuanto cuesta antes de tocar nada. El precio se arma segun lo que se haga. Si no te convence, no pasa nada.",
  },
  {
    num: "04",
    icon: CheckCircle,
    title: "Arreglo y te explico",
    description:
      "Hago el trabajo, te explico que paso (en palabras humanas) y te doy 3 dias de garantia si el mismo problema vuelve.",
  },
];

export default function Proceso() {
  return (
    <section id="proceso" className="py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw]">
        {/* Section header */}
        <div className="text-center animate-fade-up mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B] mb-4 flex items-center justify-center gap-2">
            <span className="text-[#1793D1]">//</span> WORKFLOW
          </div>
          <h2 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-[#E2E8F0] mb-4">
            Como funciona
          </h2>
          <p className="font-body text-base text-[#94A3B8] max-w-[500px] mx-auto">
            Cuatro pasos. Sin sorpresas. Sin tecnicismos que nadie entienda.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-[#121820] border border-[#1E2D3D] rounded-xl p-8 hover:border-[rgba(23,147,209,0.3)] transition-all duration-250 group"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#1793D1] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Step number */}
                <div className="font-code text-5xl font-extrabold text-[rgba(23,147,209,0.15)] leading-none mb-4">
                  {step.num}
                </div>

                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-[rgba(23,147,209,0.08)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#1793D1]" />
                </div>

                {/* Title */}
                <h4 className="font-mono font-bold text-base text-[#E2E8F0] mb-2">
                  {step.title}
                </h4>

                {/* Description */}
                <p className="font-body text-sm text-[#94A3B8] leading-relaxed">
                  {step.description}
                </p>

                {/* Connecting line (desktop only, not on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-[#1E2D3D] z-10">
                    <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-[#1793D1]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
