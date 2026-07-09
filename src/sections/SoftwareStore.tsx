import { Package, ShoppingCart, Zap, Coffee, Users } from "lucide-react";

interface SoftwareProduct {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: string;
  features: string[];
  repoUrl: string;
  image?: string;
  icon: React.ReactNode;
}

const softwareProducts: SoftwareProduct[] = [
  {
    id: "bom-apettite",
    name: "BomApettite",
    description: "Sistema de gestión de pedidos para restaurantes mediante códigos QR",
    longDescription:
      "Permite a los clientes ordenar directamente desde sus dispositivos móviles, eliminando la necesidad de menús físicos y optimizando el proceso de toma de pedidos. Ideal para restaurantes, cafeterías y bares que quieran modernizar su servicio.",
    price: "Desde 5,000 CUP",
    features: [
      "Menú digital interactivo optimizado para móviles",
      "Gestión ilimitada de mesas con códigos QR únicos",
      "Pedidos en tiempo real con notificaciones sonoras",
      "Reportes y estadísticas exportables a Excel",
      "Flujo completo de estados de pedido",
      "Funciona en red local sin necesidad de internet",
      "Multiplataforma: cualquier dispositivo con WiFi y navegador"
    ],
    repoUrl: "https://github.com/Dragoland/bom-apettite",
    icon: <Coffee className="w-8 h-8 text-[#1793D1]" />,
  },
  // Aquí puedes añadir más productos en el futuro
];

export default function SoftwareStore() {
  const handleWhatsApp = (productName: string) => {
    const message = `Hola BitCriollo! Me interesa adquirir el software "${productName}". Quisiera más información sobre precios y personalización.`;
    window.open(`https://wa.me/5356418463?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="software" className="bg-[#121820] border-y border-[#1E2D3D]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw] py-24 lg:py-32">
        {/* Encabezado */}
        <div className="text-center animate-fade-up mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B] mb-4 flex items-center justify-center gap-2">
            <span className="text-[#1793D1]">//</span> SOFTWARE_PARA_VENDER
          </div>
          <h2 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-[#E2E8F0] mb-4">
            Software listo para tu negocio
          </h2>
          <p className="font-body text-base text-[#94A3B8] max-w-[600px] mx-auto">
            Soluciones digitales desarrolladas por mí, que puedes adquirir e implementar en tu negocio. 
            Incluye instalación, configuración y capacitación básica.
          </p>
        </div>

        {/* Grid de productos */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 animate-stagger">
          {softwareProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#0B0F17] border border-[#1E2D3D] rounded-xl overflow-hidden hover:border-[rgba(23,147,209,0.4)] hover:shadow-glow transition-all duration-300"
            >
              {/* Header del producto */}
              <div className="p-6 border-b border-[#1E2D3D] flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[rgba(23,147,209,0.08)] flex items-center justify-center shrink-0 group-hover:bg-[rgba(23,147,209,0.15)] transition-colors">
                  {product.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-mono font-bold text-xl text-[#E2E8F0]">
                    {product.name}
                  </h3>
                  <p className="font-body text-sm text-[#94A3B8] mt-1">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Cuerpo */}
              <div className="p-6 space-y-4">
                <p className="font-body text-sm text-[#94A3B8] leading-relaxed">
                  {product.longDescription}
                </p>

                {/* Features */}
                <div className="space-y-1.5">
                  <p className="font-mono text-xs text-[#64748B] uppercase tracking-wider">
                    Características principales:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-1.5">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm font-body text-[#94A3B8]">
                        <Zap className="w-4 h-4 text-[#1793D1] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Precio y acciones */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#1E2D3D]">
                  <div>
                    <span className="font-code text-2xl font-bold text-[#1793D1]">
                      {product.price}
                    </span>
                    <span className="font-body text-xs text-[#64748B] ml-2">
                      (incluye instalación y soporte)
                    </span>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <a
                      href={product.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none text-center px-4 py-2 border border-[#1E2D3D] text-[#94A3B8] hover:text-[#E2E8F0] hover:border-[#1793D1] rounded-md text-sm font-mono transition-all duration-200"
                    >
                      Ver demo
                    </a>
                    <button
                      onClick={() => handleWhatsApp(product.name)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#1793D1] text-[#0B0F17] font-semibold text-sm px-6 py-2 rounded-md hover:brightness-110 transition-all duration-200"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Comprar ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nota adicional */}
        <div className="mt-12 text-center">
          <p className="font-body text-sm text-[#64748B]">
            ¿Buscas un software personalizado?{" "}
            <a
              href="#contacto"
              className="text-[#1793D1] hover:text-[#5BC0DE] transition-colors"
            >
              Contáctame
            </a>{" "}
            y construyamos algo a tu medida.
          </p>
        </div>
      </div>
    </section>
  );
}
