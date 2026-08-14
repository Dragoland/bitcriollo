import { Coffee, Zap } from "lucide-react"
import { Link } from 'react-router'

export default function SoftwareStore() {
  const handleWhatsApp = (productName: string) => {
    const message = `Hola Dragoland! Me interesa adquirir el software "${productName}". Quisiera más información sobre precios y personalización.`
    window.open(`https://wa.me/5356418463?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <div className="py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw]">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center justify-center gap-2">
            <span className="text-primary">//</span> SOFTWARE_PARA_VENDER
          </div>
          <h2 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-foreground mb-4">
            Software listo para tu negocio
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-[600px] mx-auto">
            Soluciones digitales desarrolladas por mí, que puedes adquirir e implementar en tu negocio. 
            Incluye instalación, configuración y capacitación básica.
          </p>
        </div>

        {/* Producto destacado — BomApettite */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2">
            {/* Info */}
            <div className="p-8 lg:p-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-semibold mb-6">
                <span>★</span> Producto destacado
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-mono font-bold text-2xl text-foreground">BomApettite</h3>
                  <p className="font-body text-sm text-muted-foreground">Sistema de gestión de pedidos QR para restaurantes</p>
                </div>
              </div>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">
                Permite a los clientes ordenar directamente desde sus dispositivos móviles, 
                eliminando la necesidad de menús físicos y optimizando el proceso de toma de pedidos. 
                Ideal para restaurantes, cafeterías y bares que quieran modernizar su servicio.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Menú digital interactivo optimizado para móviles",
                  "Gestión ilimitada de mesas con códigos QR únicos",
                  "Pedidos en tiempo real con notificaciones sonoras",
                  "Reportes y estadísticas exportables a Excel",
                  "Flujo completo de estados de pedido",
                  "Funciona en red local sin necesidad de internet",
                  "Multiplataforma: cualquier dispositivo con WiFi y navegador",
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                    <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-code text-4xl font-bold text-primary">Desde 100 USD</span>
                <span className="font-body text-sm text-muted-foreground">(incluye instalación y soporte)</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://github.com/Dragoland/bom-apettite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-border text-muted-foreground hover:text-foreground hover:border-primary rounded-lg text-sm font-mono transition-all"
                >
                  Ver repositorio
                </a>
                <button
                  onClick={() => handleWhatsApp("BomApettite")}
                  className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:brightness-110 transition-all"
                >
                  Me interesa
                </button>
              </div>
            </div>

            {/* Mockup visual */}
            <div className="bg-gradient-to-br from-primary/5 to-orange-400/5 border-l border-border flex items-center justify-center p-8 lg:p-12">
              <div className="relative">
                {/* Phone mockup */}
                <div className="w-[260px] h-[520px] bg-card border-2 border-border rounded-[32px] overflow-hidden shadow-2xl">
                  {/* Notch */}
                  <div className="h-6 bg-card border-b border-border flex items-center justify-center">
                    <div className="w-20 h-4 bg-background rounded-full" />
                  </div>
                  {/* Screen */}
                  <div className="p-4 space-y-3">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground font-mono">BomApettite</div>
                      <div className="text-[10px] text-muted-foreground">Menú Digital</div>
                    </div>
                    {/* Menu items */}
                    <div className="bg-secondary rounded-xl p-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="h-2 w-20 bg-border rounded" />
                        <div className="h-2 w-8 bg-primary/30 rounded" />
                      </div>
                      <div className="h-1.5 w-full bg-border/50 rounded" />
                      <div className="h-1.5 w-3/4 bg-border/50 rounded" />
                    </div>
                    <div className="bg-secondary rounded-xl p-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="h-2 w-24 bg-border rounded" />
                        <div className="h-2 w-8 bg-primary/30 rounded" />
                      </div>
                      <div className="h-1.5 w-full bg-border/50 rounded" />
                      <div className="h-1.5 w-2/3 bg-border/50 rounded" />
                    </div>
                    {/* QR */}
                    <div className="bg-white rounded-xl p-4 mx-auto w-32">
                      <div className="grid grid-cols-5 gap-0.5">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div
                            key={i}
                            className={`aspect-square rounded-[1px] ${
                              [0,2,4,6,10,12,14,18,20,22,24].includes(i) ? 'bg-card' : 'bg-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-center text-[9px] text-muted-foreground">Escanea para ordenar</div>
                    {/* Order button */}
                    <div className="bg-primary text-primary-foreground text-center py-2 rounded-lg text-xs font-semibold">
                      Ver carrito
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -right-4 top-20 bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
                  <div className="text-[10px] text-muted-foreground font-mono">Mesa 3</div>
                  <div className="text-xs text-primary font-semibold">Nuevo pedido 🔔</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA personalizado */}
        <div className="bg-card border border-border border-dashed rounded-xl p-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-xl">💡</span>
          </div>
          <h3 className="font-mono font-bold text-xl text-foreground mb-2">
            ¿Buscas algo a tu medida?
          </h3>
          <p className="font-body text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Si necesitas un software personalizado para tu negocio, hablemos. 
            Desde gestores de inventario hasta automatizaciones con Python.
          </p>
          <a
            href="https://wa.me/5356418463"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold text-sm rounded-lg hover:bg-primary/10 transition-all"
          >
            Contáctame por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
