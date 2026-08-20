import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe, MapPin, Code, Wrench } from "lucide-react";
import { Link } from "react-router";

interface TerminalLine {
  type: "prompt" | "output" | "comment" | "cursor" | "badge";
  text?: string;
  delay?: number;
}

const TERMINAL_LINES: TerminalLine[] = [
  { type: "prompt", text: "whoami", delay: 0 },
  { type: "output", text: "BitCriollo — Soluciones Digitales con Sabor", delay: 300 },
  { type: "comment", text: "# Software · Hardware · Desarrollo Remoto", delay: 500 },
  { type: "comment", text: "# Falcón, Placetas · Disponible internacionalmente", delay: 700 },
  { type: "prompt", text: "cat servicios.txt", delay: 1000 },
  { type: "output", text: "Soporte local (Cuba)    |    Desarrollo remoto (Mundo)", delay: 1300 },
  { type: "output", text: "Linux · Virus · Hardware · Scripts · IA Local · APIs", delay: 1500 },
  { type: "comment", text: "# Sin precios de ciudad. Sin complicaciones.", delay: 1700 },
  { type: "prompt", text: "./contactar.sh", delay: 2000 },
  { type: "output", text: "WhatsApp local → +53 5 6418463", delay: 2300 },
  { type: "output", text: "Proyectos remotos → norland.chavez333@gmail.com", delay: 2500 },
  { type: "cursor", delay: 2800 },
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
            <span className="text-emerald-500 font-code shrink-0">$</span>
            <span className="text-foreground">{text.slice(0, typed)}</span>
            {typed < text.length && (
              <span className="inline-block w-2 h-4 bg-primary animate-cursor-blink ml-0.5" />
            )}
          </div>
        );
      }
      case "output":
        return (
          <div key={index} className="text-muted-foreground ml-6 font-code text-sm">
            {line.text}
          </div>
        );
      case "comment":
        return (
          <div key={index} className="text-muted-foreground/70 ml-0 font-code text-sm">
            {line.text}
          </div>
        );
      case "cursor":
        return (
          <div key={index} className="flex items-center gap-2 mt-2">
            <span className="text-emerald-500 font-code">$</span>
            <span className="inline-block w-2 h-4 bg-primary animate-cursor-blink" />
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

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-[6vw] pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* Terminal */}
          <div className="order-2 lg:order-1">
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
              {/* Terminal header */}
              <div className="bg-secondary px-4 py-3 flex items-center gap-2 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-3 text-xs text-muted-foreground font-code">
                  norland@bitcriollo: ~/falcon-placetas
                </span>
              </div>
              {/* Terminal body */}
              <div className="p-6 font-code text-sm space-y-1.5 min-h-[280px]">
                {TERMINAL_LINES.map((line, i) => renderLine(line, i))}
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">
                <MapPin className="w-3 h-3" /> Falcón, Placetas
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <Globe className="w-3 h-3" /> Remoto
              </span>
            </div>

            <h1 className="font-mono font-extrabold text-4xl sm:text-5xl lg:text-[52px] leading-[1.1] tracking-tight mb-6">
              Tu vecino técnico{" "}
              <span className="text-gradient">con alcance global</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-[500px] mx-auto lg:mx-0 mb-8">
              PCs lentas, virus, celulares locos, cuentas bloqueadas... y ahora también
              desarrollo de software, automatización e IA local para equipos de cualquier parte del mundo.
            </p>

            {/* Stats / trust indicators */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Code className="w-4 h-4 text-primary" />
                <span>Python · Bash · Linux</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wrench className="w-4 h-4 text-orange-400" />
                <span>Hardware incluido</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://wa.me/5356418463?text=Hola%20Dragoland%2C%20tengo%20un%20problema%20con%20mi%20equipo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-7 py-3.5 rounded-md hover:brightness-110 hover:-translate-y-0.5 hover:shadow-glow transition-all duration-200 uppercase tracking-wider"
              >
                <MapPin className="w-4 h-4" />
                Soporte Local
              </a>
              <a
                href="https://wa.me/5356418463?text=Hola%20Dragoland%2C%20me%20interesa%20un%20proyecto%20de%20desarrollo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-emerald-500 text-emerald-500 font-semibold text-sm px-7 py-3.5 rounded-md hover:bg-emerald-500/10 transition-all duration-200 uppercase tracking-wider"
              >
                <Globe className="w-4 h-4" />
                Proyectos Remotos
              </a>
              <Link
                to="/servicios"
                className="inline-flex items-center justify-center gap-2 border border-primary text-primary font-semibold text-sm px-7 py-3.5 rounded-md hover:bg-primary/10 transition-all duration-200 uppercase tracking-wider"
              >
                Ver servicios
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
}
