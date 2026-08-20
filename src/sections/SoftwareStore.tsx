import { Coffee, Zap, ShoppingBag, BarChart3, Bot } from "lucide-react"

interface Product {
  icon: React.ElementType
  name: string
  tagline: string
  description: string
  features: string[]
  price: string
  priceNote: string
  repoUrl: string
  highlighted?: boolean
}

const products: Product[] = [
  {
    icon: Coffee,
    name: "BomApettite",
    tagline: "Sistema de gestión de pedidos QR para restaurantes",
    description: "Permite a los clientes ordenar directamente desde sus dispositivos móviles, eliminando la necesidad de menús físicos y optimizando el proceso de toma de pedidos.",
    features: [
      "Menú digital interactivo optimizado para móviles",
      "Gestión ilimitada de mesas con códigos QR únicos",
      "Pedidos en tiempo real con notificaciones sonoras",
      "Reportes y estadísticas exportables a Excel",
      "Flujo completo de estados de pedido",
      "Funciona en red local sin necesidad de internet",
      "Multiplataforma: cualquier dispositivo con WiFi y navegador",
    ],
    price: "Desde $100 USD",
    priceNote: "Incluye instalación, configuración y capacitación",
    repoUrl: "https://github.com/Dragoland/bom-apettite",
    highlighted: true,
  },
  {
    icon: ShoppingBag,
    name: "NegocioEnZona",
    tagline: "Sistema integral de gestión para PYMES",
    description: "Software desktop para gestionar inventario, ventas, clientes y proveedores. Diseñado para pequeños negocios que necesitan control sin complejidad.",
    features: [
      "Gestión de inventario con alertas de stock bajo",
      "Registro de ventas y facturación simple",
      "Base de datos de clientes y proveedores",
      "Reportes de ventas por período",
      "Funciona 100% offline",
      "Exportación a Excel y PDF",
      "Interfaz ligera, sin dependencias web",
    ],
    price: "Desde $150 USD",
    priceNote: "Personalizable según el negocio",
    repoUrl: "https://github.com/Dragoland/NegocioEnZona",
  },
  {
    icon: Bot,
    name: "Arch-Chan / DragoHub",
    tagline: "Asistente de IA local para Linux",
    description: "Asistente de inteligencia artificial que corre completamente en tu computadora. Máxima privacidad, cero dependencias de la nube. Ideal para usuarios de Arch Linux.",
    features: [
      "Procesamiento de lenguaje natural local",
      "Integración con el escritorio Linux",
      "Capacidades de voz y automatización",
      "Compatible con Ollama y modelos locales",
      "Código abierto (MIT License)",
      "Personalizable según tus necesidades",
    ],
    price: "Desde $80 USD",
    priceNote: "Instalación y configuración incluidas",
    repoUrl: "https://github.com/Dragoland/Arch-Chan-AI-assistant",
  },
]

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

        {/* Products */}
        <div className="space-y-8">
          {products.map((product, idx) => (
            <div 
              key={idx} 
              className={`bg-card border rounded-2xl overflow-hidden ${
                product.highlighted 
                  ? 'border-primary/40 shadow-glow' 
                  : 'border-border'
              }`}
            >
              <div className="grid lg:grid-cols-2">
                {/* Info */}
                <div className="p-8 lg:p-12">
                  {product.highlighted && (
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-semibold mb-6">
                      <span>★</span> Producto destacado
                    </div>
                  )}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      product.highlighted ? 'bg-primary/10' : 'bg-secondary'
                    }`}>
                      <product.icon className={`w-7 h-7 ${product.highlighted ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-2xl text-foreground">{product.name}</h3>
                      <p className="font-body text-sm text-muted-foreground">{product.tagline}</p>
                    </div>
                  </div>
                  <p className="font-body text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                        <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="font-code text-3xl font-bold text-primary">{product.price}</span>
                    <span className="font-body text-sm text-muted-foreground">({product.priceNote})</span>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <a
                      href={product.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 border border-border text-muted-foreground hover:text-foreground hover:border-primary rounded-lg text-sm font-mono transition-all"
                    >
                      Ver repositorio
                    </a>
                    <button
                      onClick={() => handleWhatsApp(product.name)}
                      className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:brightness-110 transition-all"
                    >
                      Me interesa
                    </button>
                  </div>
                </div>

                {/* Visual */}
                <div className={`border-l border-border flex items-center justify-center p-8 lg:p-12 ${
                  product.highlighted 
                    ? 'bg-gradient-to-br from-primary/5 to-orange-400/5' 
                    : 'bg-secondary'
                }`}>
                  <div className="relative">
                    <div className="w-[260px] h-[460px] bg-card border-2 border-border rounded-[32px] overflow-hidden shadow-2xl">
                      <div className="h-6 bg-card border-b border-border flex items-center justify-center">
                        <div className="w-20 h-4 bg-background rounded-full" />
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground font-mono">{product.name}</div>
                          <div className="text-[10px] text-muted-foreground">{product.tagline.split(' ').slice(0,3).join(' ')}</div>
                        </div>
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="bg-secondary rounded-xl p-3 space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="h-2 w-20 bg-border rounded" />
                              <div className="h-2 w-8 bg-primary/30 rounded" />
                            </div>
                            <div className="h-1.5 w-full bg-border/50 rounded" />
                            <div className="h-1.5 w-3/4 bg-border/50 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute -right-4 top-20 bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
                      <div className="text-[10px] text-muted-foreground font-mono">Demo</div>
                      <div className="text-xs text-primary font-semibold">Disponible 🚀</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA personalizado */}
        <div className="bg-card border border-border border-dashed rounded-xl p-10 text-center mt-12">
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
            href="https://wa.me/5356418463?text=Hola%20Dragoland%2C%20me%20interesa%20un%20software%20personalizado"
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
