import { useState } from "react";
import { MessageCircle, Send, Mail, MapPin } from "lucide-react";

const contactMethods = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+53 5 6418463",
    href: "https://wa.me/5356418463?text=Hola%20Dragoland%2C%20tengo%20una%20duda%20sobre%20mi%20equipo",
    description: "Respuesta rapida, atencion directa",
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
    label: "Ubicacion",
    value: "Falcon, Placetas, Villa Clara",
    href: null,
    description: "Atencion presencial",
  },
];

export default function Contacto() {
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
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw] py-24 lg:py-32">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
          {/* Left - Contact info */}
          <div className="animate-fade-up">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center gap-2">
              <span className="text-primary">//</span> CONEXION
            </div>
            <h2 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-foreground mb-4">
              Contacto
            </h2>
            <p className="font-body text-base text-muted-foreground mb-10 max-w-[450px]">
              Dudas pequenas, problemas grandes o simplemente quieres saber si
              tu PC se puede salvar. Escribeme.
            </p>

            {/* Contact methods */}
            <div className="space-y-4 animate-stagger">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                const content = (
                  <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-all duration-200 group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-mono font-bold text-sm text-foreground mb-0.5">
                        {method.label}
                      </h4>
                      <p className="font-body text-xs text-muted-foreground mb-1">
                        {method.description}
                      </p>
                      {method.href ? (
                        <a
                          href={method.href}
                          target={method.external ? "_blank" : undefined}
                          rel={method.external ? "noopener noreferrer" : undefined}
                          className="font-code text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <span className="font-code text-sm text-muted-foreground">
                          {method.value}
                        </span>
                      )}
                    </div>
                  </div>
                );
                return <div key={index}>{content}</div>;
              })}
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-destructive/5 border-l-[3px] border-destructive rounded-r-lg">
              <p className="text-muted-foreground font-body text-sm">
                <strong className="text-destructive">IMPORTANTE:</strong> No
                realizo trabajos de hardware (no abro equipos ni toco
                componentes internos). Todo mi trabajo es a nivel de software.
                Si tu problema es fisico, te diagnostico gratis y te recomiendo a
                quien acudir.
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="animate-fade-up">
            <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
              <h3 className="font-mono font-bold text-lg text-foreground mb-6">
                Enviar mensaje
              </h3>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="font-mono font-bold text-foreground mb-2">
                    Mensaje enviado!
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    Te respondo pronto por WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-md px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-md px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                      Servicio
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-md px-4 py-2.5 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="virus">Limpieza de virus</option>
                      <option value="linux">Migracion a Linux</option>
                      <option value="optimizar">Optimizacion</option>
                      <option value="recuperar">Recuperacion de datos</option>
                      <option value="diseno">Diseno grafico</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                      Mensaje
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-md px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                      placeholder="Describe tu problema..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-semibold text-sm py-3 rounded-md hover:brightness-110 transition-all duration-200"
                  >
                    Enviar mensaje
                  </button>

                  <p className="text-center text-xs text-muted-foreground font-mono pt-2">
                    O escribeme directo por{" "}
                    <a
                      href="https://wa.me/5356418463"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
