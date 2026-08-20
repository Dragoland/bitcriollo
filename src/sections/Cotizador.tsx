import { useState, useMemo } from "react";
import { useSearchParams } from 'react-router'
import { Calculator, Check, MapPin, Globe, Wrench } from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  currency: "CUP" | "USD";
  category: "local" | "dev" | "hardware";
}

const serviceOptions: ServiceOption[] = [
  // LOCAL
  { id: "virus", name: "Limpieza de virus/malware", basePrice: 500, currency: "CUP", category: "local" },
  { id: "optimizar", name: "Optimización y aceleración", basePrice: 400, currency: "CUP", category: "local" },
  { id: "formateo", name: "Formateo e instalación (Windows/Linux)", basePrice: 1500, currency: "CUP", category: "local" },
  { id: "linux", name: "Migración a Linux", basePrice: 2000, currency: "CUP", category: "local" },
  { id: "arch", name: "Instalación y configuración de Arch Linux", basePrice: 2000, currency: "CUP", category: "local" },
  { id: "personalizacion", name: "Personalización de escritorio", basePrice: 500, currency: "CUP", category: "local" },
  { id: "recuperar", name: "Recuperación de archivos", basePrice: 800, currency: "CUP", category: "local" },
  { id: "whatsapp", name: "Recuperación de WhatsApp", basePrice: 300, currency: "CUP", category: "local" },
  { id: "celular", name: "Configuración de celular", basePrice: 200, currency: "CUP", category: "local" },
  { id: "cuentas", name: "Recuperación de cuentas", basePrice: 200, currency: "CUP", category: "local" },
  { id: "programas", name: "Instalación de programas", basePrice: 150, currency: "CUP", category: "local" },
  { id: "impresora", name: "Configuración de impresora", basePrice: 200, currency: "CUP", category: "local" },
  { id: "wifi", name: "Configuración WiFi/router", basePrice: 200, currency: "CUP", category: "local" },
  { id: "smarttv", name: "Configuración Smart TV", basePrice: 200, currency: "CUP", category: "local" },
  { id: "seguridad", name: "Asesoría en seguridad digital", basePrice: 150, currency: "CUP", category: "local" },
  { id: "compra", name: "Asesoría para compra de equipos", basePrice: 150, currency: "CUP", category: "local" },
  { id: "pendrive", name: "Pendrive booteable", basePrice: 200, currency: "CUP", category: "local" },
  { id: "digitalizar", name: "Digitalización de documentos", basePrice: 200, currency: "CUP", category: "local" },
  { id: "servidor", name: "Configuración de servidor local / NAS", basePrice: 800, currency: "CUP", category: "local" },
  { id: "diseno", name: "Diseño gráfico (flyers, logos, etc.)", basePrice: 300, currency: "CUP", category: "local" },
  { id: "fotos", name: "Edición y retoque de fotos", basePrice: 250, currency: "CUP", category: "local" },
  { id: "cv", name: "Creación de CV digital", basePrice: 300, currency: "CUP", category: "local" },
  { id: "video", name: "Conversión y compresión de video", basePrice: 200, currency: "CUP", category: "local" },
  { id: "emuladores", name: "Instalación de emuladores y juegos retro", basePrice: 300, currency: "CUP", category: "local" },

  // HARDWARE
  { id: "limpieza_hw", name: "Limpieza interna de PC", basePrice: 500, currency: "CUP", category: "hardware" },
  { id: "pasta_termica", name: "Cambio de pasta térmica", basePrice: 300, currency: "CUP", category: "hardware" },
  { id: "ram_hw", name: "Instalación de RAM", basePrice: 200, currency: "CUP", category: "hardware" },
  { id: "ssd_hw", name: "Instalación de SSD/HDD", basePrice: 400, currency: "CUP", category: "hardware" },
  { id: "fuente_hw", name: "Cambio de fuente de poder", basePrice: 300, currency: "CUP", category: "hardware" },
  { id: "diagnostico_hw", name: "Diagnóstico de componentes", basePrice: 300, currency: "CUP", category: "hardware" },
  { id: "armado_hw", name: "Armado de PC desde cero", basePrice: 1500, currency: "CUP", category: "hardware" },
  { id: "upgrade_hw", name: "Upgrade de componentes", basePrice: 500, currency: "CUP", category: "hardware" },

  // DESARROLLO REMOTO (USD)
  { id: "ia_local", name: "Instalación de IA Local (Ollama, etc.)", basePrice: 80, currency: "USD", category: "dev" },
  { id: "automatizacion", name: "Automatización de tareas (Python, Bash)", basePrice: 50, currency: "USD", category: "dev" },
  { id: "scripts_dev", name: "Scripts personalizados", basePrice: 40, currency: "USD", category: "dev" },
  { id: "api_dev", name: "APIs REST y microservicios", basePrice: 150, currency: "USD", category: "dev" },
  { id: "migracion_libre", name: "Migración a Software Libre", basePrice: 100, currency: "USD", category: "dev" },
  { id: "soporte_remoto", name: "Soporte técnico remoto (por hora)", basePrice: 25, currency: "USD", category: "dev" },
  { id: "consultoria_linux", name: "Consultoría Linux / DevOps (por hora)", basePrice: 30, currency: "USD", category: "dev" },
  { id: "software_medida", name: "Desarrollo de software a medida", basePrice: 200, currency: "USD", category: "dev" },
];

const complexityMultipliers = [1, 1.5, 2];
const complexityLabels = ["Simple", "Moderado", "Complejo"];

const categoryTabs = [
  { id: "local" as const, label: "Soporte Local", icon: MapPin, color: "primary" },
  { id: "hardware" as const, label: "Hardware", icon: Wrench, color: "orange" },
  { id: "dev" as const, label: "Desarrollo Remoto", icon: Globe, color: "emerald" },
];

export default function Cotizador() {
  const [searchParams] = useSearchParams()
  const preselectedCat = searchParams.get('categoria') as "local" | "dev" | "hardware" | null
  const preselectedId = searchParams.get('servicio')

  const [activeCategory, setActiveCategory] = useState<"local" | "dev" | "hardware">(
    preselectedCat && ["local", "dev", "hardware"].includes(preselectedCat) ? preselectedCat : "local"
  );

  const [selected, setSelected] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    if (preselectedId) {
      const match = serviceOptions.find(s => 
        s.name.toLowerCase().replace(/\s+/g, '-').substring(0, 25) === preselectedId
      )
      if (match) initial.add(match.id)
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

  const filteredServices = serviceOptions.filter(s => s.category === activeCategory)

  const { totalCUP, totalUSD } = useMemo(() => {
    let cup = 0;
    let usd = 0;
    selected.forEach((id) => {
      const svc = serviceOptions.find((s) => s.id === id);
      if (svc) {
        const price = svc.basePrice * complexityMultipliers[complexity] * (urgent ? 1.25 : 1)
        if (svc.currency === "CUP") cup += price;
        else usd += price;
      }
    });
    return { totalCUP: Math.round(cup), totalUSD: Math.round(usd) };
  }, [selected, complexity, urgent]);

  const selectedServicesList = serviceOptions.filter((s) => selected.has(s.id));

  const buildWhatsAppMessage = () => {
    const services = selectedServicesList.map((s) => `- ${s.name} (${s.currency} ${s.basePrice})`).join("%0A");
    const complexityText = complexityLabels[complexity];
    const urgentText = urgent ? "%0AUrgente: Sí (+25%)" : "";
    const cupText = totalCUP > 0 ? `%0AEstimado CUP: ~$${totalCUP}` : "";
    const usdText = totalUSD > 0 ? `%0AEstimado USD: ~$${totalUSD}` : "";
    return `https://wa.me/5356418463?text=Hola%20Dragoland!%0A%0AQuiero%20cotizar%20los%20siguientes%20servicios:%0A${services}%0A%0AComplejidad:%20${complexityText}${urgentText}${cupText}${usdText}%0A%0A¿Podemos%20hablar%20detalles?`;
  };

  return (
    <section id="cotizar" className="bg-secondary border-y border-border">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw] py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Calculator */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center gap-2">
              <span className="text-primary">//</span> CALCULAR_PRECIO
            </div>
            <h2 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-foreground mb-4">
              ¿Cuánto costará?
            </h2>
            <p className="font-body text-base text-muted-foreground mb-8 max-w-[450px]">
              Selecciona los servicios que necesitas y obtén una estimación. El precio final puede variar según complejidad.
            </p>

            {/* Category tabs */}
            <div className="flex gap-2 mb-6">
              {categoryTabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeCategory === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveCategory(tab.id)
                      setSelected(new Set())
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-mono font-semibold transition-all border ${
                      isActive
                        ? tab.id === "local"
                          ? "bg-primary text-primary-foreground border-primary"
                          : tab.id === "hardware"
                          ? "bg-orange-400 text-white border-orange-400"
                          : "bg-emerald-500 text-white border-emerald-500"
                        : "bg-card text-muted-foreground border-border hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Service selector grid */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredServices.map((svc) => {
                const isSelected = selected.has(svc.id);
                return (
                  <button
                    key={svc.id}
                    onClick={() => toggleService(svc.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all duration-200 ${
                      isSelected
                        ? activeCategory === "local"
                          ? "border-primary bg-primary/10"
                          : activeCategory === "hardware"
                          ? "border-orange-400 bg-orange-400/10"
                          : "border-emerald-500 bg-emerald-500/10"
                        : "border-border bg-card hover:border-muted-foreground/30"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? activeCategory === "local"
                            ? "bg-primary border-primary"
                            : activeCategory === "hardware"
                            ? "bg-orange-400 border-orange-400"
                            : "bg-emerald-500 border-emerald-500"
                          : "border-muted-foreground"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm font-mono block truncate ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                        {svc.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-code">
                        {svc.currency} {svc.basePrice}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Complexity slider */}
            <div className="mb-6">
              <label className="text-sm font-mono text-muted-foreground mb-3 block">
                Complejidad del problema
              </label>
              <div className="flex gap-2">
                {complexityLabels.map((label, i) => (
                  <button
                    key={label}
                    onClick={() => setComplexity(i)}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-mono transition-all duration-200 ${
                      complexity === i
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-card text-muted-foreground border border-border hover:text-foreground"
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
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 mb-8 w-full ${
                urgent
                  ? "border-destructive bg-destructive/10"
                  : "border-border bg-card hover:border-muted-foreground/30"
              }`}
            >
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                  urgent ? "bg-destructive border-destructive" : "border-muted-foreground"
                }`}
              >
                {urgent && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className={`text-sm font-mono ${urgent ? "text-destructive" : "text-muted-foreground"}`}>
                Es urgente (+25%)
              </span>
            </button>

            {/* Price display */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="space-y-2 mb-4">
                {totalCUP > 0 && (
                  <div className="flex items-baseline gap-2">
                    <span className="font-code text-4xl font-bold text-primary">~${totalCUP}</span>
                    <span className="font-code text-lg text-muted-foreground">CUP</span>
                  </div>
                )}
                {totalUSD > 0 && (
                  <div className="flex items-baseline gap-2">
                    <span className="font-code text-4xl font-bold text-emerald-500">~${totalUSD}</span>
                    <span className="font-code text-lg text-muted-foreground">USD</span>
                  </div>
                )}
                {totalCUP === 0 && totalUSD === 0 && (
                  <div className="font-code text-2xl font-bold text-muted-foreground">Selecciona servicios</div>
                )}
              </div>
              <p className="text-xs text-muted-foreground font-mono mb-4">
                Precio estimado. Cotización final por WhatsApp.
              </p>
              {selected.size > 0 && (
                <a
                  href={buildWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-semibold text-sm px-6 py-3 rounded-md hover:brightness-110 transition-all duration-200"
                >
                  Pedir cotización
                </a>
              )}
            </div>
          </div>

          {/* Visual / Summary */}
          <div className="hidden lg:flex flex-col items-center justify-start pt-20">
            <div className="relative">
              <Calculator className="w-48 h-48 text-primary opacity-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <span className="font-code text-3xl font-bold text-primary">
                      {selected.size}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-muted-foreground">
                    servicio{selected.size !== 1 ? "s" : ""} seleccionado{selected.size !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>

            {selectedServicesList.length > 0 && (
              <div className="mt-8 w-full max-w-[360px] bg-card border border-border rounded-lg p-4">
                <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
                  Resumen
                </p>
                <div className="space-y-2">
                  {selectedServicesList.map((svc) => (
                    <div key={svc.id} className="flex justify-between text-sm font-mono">
                      <span className="text-muted-foreground truncate mr-2">{svc.name}</span>
                      <span className="text-foreground shrink-0">{svc.currency} {svc.basePrice}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between text-sm font-mono">
                      <span className="text-muted-foreground">Complejidad: {complexityLabels[complexity]}</span>
                      <span className="text-yellow-500">x{complexityMultipliers[complexity]}</span>
                    </div>
                    {urgent && (
                      <div className="flex justify-between text-sm font-mono">
                        <span className="text-muted-foreground">Urgente</span>
                        <span className="text-destructive">x1.25</span>
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
  );
}
