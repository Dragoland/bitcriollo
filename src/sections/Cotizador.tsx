import { useState, useMemo } from "react";
import { useSearchParams } from 'react-router'
import { Calculator, Check } from "lucide-react";
import Proceso from './Proceso'

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  category: "software" | "design" | "media" | "remote";
}

const serviceOptions: ServiceOption[] = [
  // Software
  { id: "virus", name: "Limpieza de virus/malware", basePrice: 500, category: "software" },
  { id: "optimizar", name: "Optimización y aceleración", basePrice: 400, category: "software" },
  { id: "formateo", name: "Formateo e instalación (Windows/Linux)", basePrice: 1500, category: "software" },
  { id: "linux", name: "Migración a Linux (Arch, Ubuntu, etc.)", basePrice: 2000, category: "software" },
  { id: "arch", name: "Instalación y configuración de Arch Linux", basePrice: 2000, category: "software" },
  { id: "personalizacion", name: "Personalización de escritorio (i3, KDE, GNOME)", basePrice: 500, category: "software" },
  { id: "recuperar", name: "Recuperación de archivos", basePrice: 800, category: "software" },
  { id: "whatsapp", name: "Recuperación de WhatsApp", basePrice: 300, category: "software" },
  { id: "celular", name: "Configuración de celular", basePrice: 200, category: "software" },
  { id: "cuentas", name: "Recuperación de cuentas", basePrice: 200, category: "software" },
  { id: "programas", name: "Instalación de programas", basePrice: 150, category: "software" },
  { id: "impresora", name: "Configuración de impresora", basePrice: 200, category: "software" },
  { id: "wifi", name: "Configuración WiFi/router", basePrice: 200, category: "software" },
  { id: "smarttv", name: "Configuración Smart TV", basePrice: 200, category: "software" },
  { id: "seguridad", name: "Asesoría en seguridad digital", basePrice: 150, category: "software" },
  { id: "compra", name: "Asesoría para compra de equipos", basePrice: 150, category: "software" },
  { id: "pendrive", name: "Pendrive booteable (con Arch, Windows, etc.)", basePrice: 200, category: "software" },
  { id: "digitalizar", name: "Digitalización de documentos", basePrice: 200, category: "software" },
  { id: "servidor", name: "Configuración de servidor local / NAS", basePrice: 800, category: "software" },
  // Diseño
  { id: "diseno", name: "Diseño gráfico (flyers, logos, etc.)", basePrice: 300, category: "design" },
  { id: "fotos", name: "Edición y retoque de fotos", basePrice: 250, category: "design" },
  { id: "cv", name: "Creación de CV digital", basePrice: 300, category: "design" },
  // Multimedia
  { id: "video", name: "Conversión y compresión de video", basePrice: 200, category: "media" },
  { id: "emuladores", name: "Instalación de emuladores y juegos retro", basePrice: 300, category: "media" },
  // Remoto y automatización
  { id: "scripts", name: "Scripts/automatización (Python, Bash)", basePrice: 600, category: "remote" },
  { id: "remoto", name: "Soporte técnico remoto", basePrice: 400, category: "remote" },
];

const complexityMultipliers = [1, 1.5, 2];
const complexityLabels = ["Simple", "Moderado", "Complejo"];

export default function Cotizador() {
  const [searchParams] = useSearchParams()
  const preselectedId = searchParams.get('servicio')

  const [selected, setSelected] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    if (preselectedId && serviceOptions.some(s => s.id === preselectedId)) {
      initial.add(preselectedId)
    }
    return initial
  });

  const [complexity, setComplexity] = useState(0);
  const [urgent, setUrgent] = useState(false);

  const toggleService = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const total = useMemo(() => {
    let sum = 0;
    selected.forEach((id) => {
      const svc = serviceOptions.find((s) => s.id === id);
      if (svc) sum += svc.basePrice;
    });
    sum *= complexityMultipliers[complexity];
    if (urgent) sum *= 1.25;
    return Math.round(sum);
  }, [selected, complexity, urgent]);

  const selectedServicesList = serviceOptions.filter((s) => selected.has(s.id));

  const buildWhatsAppMessage = () => {
    const services = selectedServicesList.map((s) => `- ${s.name}`).join("%0A");
    const complexityText = complexityLabels[complexity];
    const urgentText = urgent ? "%0AUrgente: Sí (+25%)" : "";
    return `https://wa.me/5356418463?text=Hola%20Dragoland!%0A%0AQuiero%20cotizar%20los%20siguientes%20servicios:%0A${services}%0A%0AComplejidad:%20${complexityText}${urgentText}%0A%0AEstimado:%20~$${total}%20CUP`;
  };

  return (
    <>
      <section id="cotizar" className="bg-[#121820] border-y border-[#1E2D3D]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw] py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Calculator */}
            <div className="animate-fade-up">
              <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B] mb-4 flex items-center gap-2">
                <span className="text-[#1793D1]">//</span> CALCULAR_PRECIO
              </div>
              <h2 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-[#E2E8F0] mb-4">
                Cuánto costará?
              </h2>
              <p className="font-body text-base text-[#94A3B8] mb-8 max-w-[450px]">
                Selecciona los servicios que necesitas y obten una estimacion. El
                precio final puede variar segun complejidad.
              </p>

              {/* Service selector grid */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                {serviceOptions.map((svc) => {
                  const isSelected = selected.has(svc.id);
                  return (
                    <button
                      key={svc.id}
                      onClick={() => toggleService(svc.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all duration-200 ${
                        isSelected
                          ? "border-[#1793D1] bg-[rgba(23,147,209,0.08)]"
                          : "border-[#1E2D3D] bg-[#0B0F17] hover:border-[#2a3a4d]"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#1793D1] border-[#1793D1]"
                            : "border-[#64748B]"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-[#0B0F17]" />}
                      </div>
                      <span
                        className={`text-sm font-mono ${
                          isSelected ? "text-[#E2E8F0]" : "text-[#94A3B8]"
                        }`}
                      >
                        {svc.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Complexity slider */}
              <div className="mb-6">
                <label className="text-sm font-mono text-[#94A3B8] mb-3 block">
                  Complejidad del problema
                </label>
                <div className="flex gap-2">
                  {complexityLabels.map((label, i) => (
                    <button
                      key={label}
                      onClick={() => setComplexity(i)}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-mono transition-all duration-200 ${
                        complexity === i
                          ? "bg-[#1793D1] text-[#0B0F17] font-semibold"
                          : "bg-[#0B0F17] text-[#64748B] border border-[#1E2D3D] hover:text-[#94A3B8]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency toggle */}
              <button
                onClick={() => setUrgent(!urgent)}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 mb-8 ${
                  urgent
                    ? "border-[#E63946] bg-[rgba(230,57,70,0.08)]"
                    : "border-[#1E2D3D] bg-[#0B0F17] hover:border-[#2a3a4d]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    urgent ? "bg-[#E63946] border-[#E63946]" : "border-[#64748B]"
                  }`}
                >
                  {urgent && <Check className="w-3 h-3 text-white" />}
                </div>
                <span
                  className={`text-sm font-mono ${
                    urgent ? "text-[#E63946]" : "text-[#94A3B8]"
                  }`}
                >
                  Es urgente (+25%)
                </span>
              </button>

              {/* Price display */}
              <div className="bg-[#0B0F17] border border-[#1E2D3D] rounded-xl p-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-code text-5xl font-bold text-[#1793D1]">
                    ~${total}
                  </span>
                  <span className="font-code text-lg text-[#64748B]">CUP</span>
                </div>
                <p className="text-xs text-[#64748B] font-mono mb-4">
                  Precio estimado. Cotizacion final por WhatsApp.
                </p>
                {selected.size > 0 && (
                  <a
                    href={buildWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#1793D1] text-[#0B0F17] font-semibold text-sm px-6 py-3 rounded-md hover:brightness-110 transition-all duration-200"
                  >
                    Pedir cotizacion
                  </a>
                )}
              </div>
            </div>

            {/* Visual / Summary */}
            <div className="hidden lg:flex flex-col items-center justify-center animate-fade-up">
              <div className="relative">
                <Calculator className="w-48 h-48 text-[#1793D1] opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-[rgba(23,147,209,0.1)] border border-[rgba(23,147,209,0.2)] flex items-center justify-center mx-auto mb-4 shadow-glow">
                      <span className="font-code text-3xl font-bold text-[#1793D1]">
                        {selected.size}
                      </span>
                    </div>
                    <p className="font-mono text-sm text-[#64748B]">
                      servicio{selected.size !== 1 ? "s" : ""} seleccionado
                      {selected.size !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>

              {selectedServicesList.length > 0 && (
                <div className="mt-8 w-full max-w-[360px] bg-[#0B0F17] border border-[#1E2D3D] rounded-lg p-4">
                  <p className="text-xs font-mono text-[#64748B] mb-3 uppercase tracking-wider">
                    Resumen
                  </p>
                  <div className="space-y-2">
                    {selectedServicesList.map((svc) => (
                      <div
                        key={svc.id}
                        className="flex justify-between text-sm font-mono"
                      >
                        <span className="text-[#94A3B8]">{svc.name}</span>
                        <span className="text-[#E2E8F0]">
                          ${svc.basePrice}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-[#1E2D3D] pt-2 mt-2">
                      <div className="flex justify-between text-sm font-mono">
                        <span className="text-[#64748B]">
                          Complejidad: {complexityLabels[complexity]}
                        </span>
                        <span className="text-[#E9C46A]">
                          x{complexityMultipliers[complexity]}
                        </span>
                      </div>
                      {urgent && (
                        <div className="flex justify-between text-sm font-mono">
                          <span className="text-[#64748B]">Urgente</span>
                          <span className="text-[#E63946]">x1.25</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Proceso />
    </>
  );
}
