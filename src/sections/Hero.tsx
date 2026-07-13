import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface TerminalLine {
  type: "prompt" | "output" | "comment" | "cursor";
  text?: string;
  delay?: number;
}

const TERMINAL_LINES: TerminalLine[] = [
  { type: "prompt", text: "whoami", delay: 0 },
  { type: "output", text: "BitCriollo — Soluciones Digitales con Sabor", delay: 300 },
  { type: "comment", text: "# Software-only · Primera consulta gratis · Falcón, Placetas", delay: 500 },
  { type: "prompt", text: "cat servicios.txt", delay: 800 },
  { type: "output", text: "Limpieza de virus  |  Migración a Linux  |  Recuperación de datos", delay: 1100 },
  { type: "output", text: "Diseño gráfico  |  Optimización  |  Soporte remoto", delay: 1300 },
  { type: "comment", text: "# Sin abrir torres. Sin precios de ciudad.", delay: 1500 },
  { type: "prompt", text: "./contactar.sh", delay: 1800 },
  { type: "output", text: "Escríbeme por WhatsApp → +53 5 6418463", delay: 2100 },
  { type: "cursor", delay: 2400 },
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedChars, setTypedChars] = useState<Record<number, number>>({});
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    TERMINAL_LINES.forEach((line, i) => {
      const delay = line.delay ?? i * 200;
      const t = setTimeout(() => {
        setVisibleLines((prev) => Math.max(prev, i + 1));
        if (line.type === "prompt" && line.text) {
          const text = line.text;
          let charIndex = 0;
          const typeInterval = setInterval(() => {
            charIndex++;
            setTypedChars((prev) => ({ ...prev, [i]: charIndex }));
            if (charIndex >= text.length) {
              clearInterval(typeInterval);
            }
          }, 45);
          timeouts.push(typeInterval as unknown as ReturnType<typeof setTimeout>);
        }
      }, delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  const renderLine = (line: TerminalLine, index: number) => {
    if (index >= visibleLines) return null;

    switch (line.type) {
      case "prompt": {
        const typed = typedChars[index] || 0;
        const text = line.text || "";
        return (
          <div key={index} className="flex items-start gap-2">
            <span className="text-[#33D17A] font-code shrink-0">$</span>
            <span className="text-[#E2E8F0]">{text.slice(0, typed)}</span>
            {typed < text.length && (
              <span className="inline-block w-2 h-4 bg-[#1793D1] animate-cursor-blink ml-0.5" />
            )}
          </div>
        );
      }
      case "output":
        return (
          <div key={index} className="text-[#94A3B8] ml-6 font-code text-sm">
            {line.text}
          </div>
        );
      case "comment":
        return (
          <div key={index} className="text-[#64748B] ml-0 font-code text-sm">
            {line.text}
          </div>
        );
      case "cursor":
        return (
          <div key={index} className="flex items-center gap-2 mt-2">
            <span className="text-[#33D17A] font-code">$</span>
            <span className="inline-block w-2 h-4 bg-[#1793D1] animate-cursor-blink" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-mesh animate-blob-drift" />
      <div className="absolute inset-0 bg-grid-pattern" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-[6vw] pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* Terminal */}
          <div className="order-2 lg:order-1">
            <div className="bg-[#121820] border border-[#1E2D3D] rounded-xl overflow-hidden shadow-card">
              {/* Terminal header */}
              <div className="bg-[#1A2332] px-4 py-3 flex items-center gap-2 border-b border-[#1E2D3D]">
                <div className="w-3 h-3 rounded-full bg-[#E63946]" />
                <div className="w-3 h-3 rounded-full bg-[#E9C46A]" />
                <div className="w-3 h-3 rounded-full bg-[#2A9D8F]" />
                <span className="ml-3 text-xs text-[#64748B] font-code">
                  norland@bitcriollo: ~/falcon-placetas
                </span>
              </div>
              {/* Terminal body */}
              <div className="p-6 font-code text-sm space-y-1.5 min-h-[260px]">
                {TERMINAL_LINES.map((line, i) => renderLine(line, i))}
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h1 className="font-mono font-extrabold text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] tracking-tight mb-6">
              El vecino que{" "}
              <span className="text-gradient">entiende de esto</span>
            </h1>
            <p className="font-body text-lg text-[#94A3B8] leading-relaxed max-w-[500px] mx-auto lg:mx-0 mb-8">
              PCs lentas, virus, celulares locos, cuentas bloqueadas... Es de
              hablar con alguien que te responde en criollo y no te cobra como
              si vivieras en La Habana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://wa.me/5356418463?text=Hola%20Dragoland%2C%20tengo%20un%20problema%20con%20mi%20equipo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1793D1] text-[#0B0F17] font-semibold text-sm px-7 py-3.5 rounded-md hover:brightness-110 hover:-translate-y-0.5 hover:shadow-glow transition-all duration-200 uppercase tracking-wider"
              >
                Escribir por WhatsApp
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 border border-[#1793D1] text-[#1793D1] font-semibold text-sm px-7 py-3.5 rounded-md hover:bg-[rgba(23,147,209,0.1)] transition-all duration-200 uppercase tracking-wider"
              >
                Ver servicios
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <ChevronDown className="w-6 h-6 text-[#64748B]" />
      </div>
    </section>
  );
}
