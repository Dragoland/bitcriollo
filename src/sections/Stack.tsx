interface Tool {
  name: string;
  description: string;
  icon: string;
}

const tools: Tool[] = [
  { name: "Arch Linux", description: "Distro principal (rolling release)", icon: "Ar" },
  { name: "Linux Mint", description: "Para usuarios que vienen de Windows", icon: "LM" },
  { name: "Python", description: "Scripts y automatizacion", icon: "Py" },
  { name: "Bash", description: "Terminal magic", icon: "Sh" },
  { name: "GIMP", description: "Edicion de imagenes", icon: "GM" },
  { name: "Blender", description: "3D y diseno", icon: "Bl" },
  { name: "Krita", description: "Arte digital", icon: "Kr" },
  { name: "TestDisk", description: "Recuperacion de datos", icon: "TD" },
  { name: "ClamAV", description: "Antivirus open source", icon: "CA" },
  { name: "LibreOffice", description: "Ofimatica libre", icon: "LO" },
  { name: "FFmpeg", description: "Conversion de video", icon: "FF" },
  { name: "Git", description: "Control de versiones", icon: "Gt" },
];

export default function Stack() {
  return (
    <section className="bg-[#121820] border-y border-[#1E2D3D]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw] py-24 lg:py-32">
        {/* Section header */}
        <div className="text-center animate-fade-up mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B] mb-4 flex items-center justify-center gap-2">
            <span className="text-[#1793D1]">//</span> HERRAMIENTAS
          </div>
          <h2 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-[#E2E8F0] mb-4">
            Mi stack
          </h2>
          <p className="font-body text-base text-[#94A3B8] max-w-[550px] mx-auto">
            Las herramientas que uso para hacer el trabajo. Nada pirata, todo
            software libre cuando es posible.
          </p>
        </div>

        {/* Tool grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 animate-stagger">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-[#0B0F17] border border-[#1E2D3D] rounded-lg p-5 hover:border-[rgba(23,147,209,0.3)] hover:shadow-glow transition-all duration-250 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[rgba(23,147,209,0.08)] flex items-center justify-center mb-3 group-hover:bg-[rgba(23,147,209,0.15)] transition-colors">
                <span className="font-code text-xs font-bold text-[#1793D1]">
                  {tool.icon}
                </span>
              </div>
              <h4 className="font-code text-sm text-[#E2E8F0] mb-1">
                {tool.name}
              </h4>
              <p className="text-[11px] text-[#64748B] font-body leading-snug">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}