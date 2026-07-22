import { useState } from "react";
import { MessageCircle, Send, Mail, MapPin, Clock, Globe, Code, Music, Palette, Gamepad2 } from "lucide-react";

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
    value: "Lun–Sáb 9:00–18:00",
    href: null,
    description: "Respuesta en 24–48h",
  },
];

const skillTags = [
  { label: "Python", icon: Code },
  { label: "Bash", icon: Terminal },
  { label: "Linux", icon: Globe },
  { label: "GIMP", icon: Palette },
  { label: "Blender", icon: Palette },
  { label: "FL Studio", icon: Music },
  { label: "Emuladores", icon: Gamepad2 },
  { label: "C++", icon: Code },
  { label: "Java", icon: Code },
  { label: "Arch Linux", icon: Globe },
];

// Inline Terminal icon para skillTags (no existe en lucide como tal, usamos Code)
function Terminal(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

export default function PerfilContacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contacto" className="bg-secondary border-y border-border">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-[6vw] py-24 lg:py-32">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center justify-center gap-2">
            <span className="text-primary">//</span> CONECTEMOS
          </div>
          <h2 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-foreground mb-4">
            Contacto
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-[500px] mx-auto">
            ¿Quién soy? Un vecino con paciencia y Linux. Escribime y resolvemos tu problema.
          </p>
        </div>

        {/* Grid estilo Kirart */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Left column — Bio + Contact info */}
          <div className="space-y-8">
            {/* Bio card */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-mono font-bold text-lg text-primary mb-4">
                Sobre mí
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Estudio <strong className="text-foreground">Ingeniería de Ciencias Informáticas en la UCI</strong>,
                La Habana. Entre semestres arreglo PCs, instalo Linux (especialmente <strong>Arch Linux</strong>),
                diseño flyers y escribo scripts que automatizan tareas.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Tengo un canal en Telegram — <em>Diario de un Informático Universitario y Artista</em> —
                donde hablo de tecnología sin pretender ser un experto de YouTube.
              </p>
              <div className="bg-destructive/5 border-l-[3px] border-destructive rounded-r-lg p-3">
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  <strong className="text-destructive">No hago hardware:</strong> no abro torres, no soldo, no cambio pantallas.
                  Si tu problema es físico, te diagnostico gratis y te recomiendo a alguien de confianza.
                </p>
              </div>
            </div>

            {/* Contact methods */}
            <div className="space-y-3">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
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
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {skillTags.map((tag) => (
                <span
                  key={tag.label}
                  className="px-3 py-1.5 text-xs font-mono font-medium text-primary bg-primary/10 border border-primary/20 rounded-lg"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right column — Avatar + CTA + Form */}
          <div className="space-y-6">
            {/* Avatar / Illustration area */}
            <div className="relative aspect-square max-w-[400px] mx-auto lg:mx-0 rounded-2xl overflow-hidden border-2 border-border bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <img
                src="/images/avatar-cartoon.png"
                alt="BitCriollo Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-center">
                <span className="font-mono font-bold text-sm text-foreground">Dragoland</span>
                <span className="block text-xs text-muted-foreground font-mono">@Dragoland_OP · UCI 3er año</span>
              </div>
            </div>

            {/* CTA WhatsApp */}
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
                    <option value="diseno">Diseño gráfico</option>
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
    </section>
  );
}
