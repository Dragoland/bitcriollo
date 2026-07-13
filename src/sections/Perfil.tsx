const skillTags = [
  "Python",
  "Bash",
  "Linux",
  "GIMP",
  "Blender",
  "FL Studio",
  "Emuladores",
  "C++",
  "Java",
  "Arch Linux",
];

export default function Perfil() {
  return (
    <section id="perfil" className="bg-[#121820] border-y border-[#1E2D3D]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw] py-24 lg:py-32">
        {/* Section header */}
        <div className="animate-fade-up mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[#64748B] mb-4 flex items-center gap-2">
            <span className="text-[#1793D1]">//</span> PERFIL_DE_USUARIO
          </div>
          <h2 className="font-mono font-extrabold text-3xl lg:text-[42px] tracking-tight text-[#E2E8F0] mb-4">
            ¿Quién es este tipo?
          </h2>
          <p className="font-body text-base text-[#94A3B8] max-w-[550px]">
            Spoiler: no soy un robot. Tampoco un genio. Solo un vecino con
            paciencia y Linux.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-[350px_1fr] gap-12 animate-stagger">
          {/* Avatar column */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative mb-6">
              <div className="w-64 h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border-2 border-[#1E2D3D] bg-[#0B0F17] shadow-glow">
                <img
                  src="/images/avatar-cartoon.png"
                  alt="BitCriollo Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#121820] border border-[#1E2D3D] rounded-lg px-3 py-1.5 text-xs font-code text-[#1793D1]">
                @Dragoland
              </div>
            </div>

            {/* Info card */}
            <div className="w-full max-w-[300px] bg-[#0B0F17] border border-[#1E2D3D] rounded-lg p-4 font-code text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Nombre:</span>
                <span className="text-[#E2E8F0]">Norland Chávez</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Ubicación:</span>
                <span className="text-[#E2E8F0]">Falcón, Placetas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Rol:</span>
                <span className="text-[#E2E8F0]">Técnico Informático</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Estudios:</span>
                <span className="text-[#E2E8F0]">UCI - 3er año</span>
              </div>
            </div>
          </div>

          {/* Bio column */}
          <div>
            <h3 className="font-mono font-bold text-lg text-[#1793D1] mb-5">
              Hey, soy Norland (Dragoland en internet, porque los nicks raros
              son ley)
            </h3>

            <div className="font-body text-[#94A3B8] space-y-4 leading-relaxed mb-6">
              <p className="text-[#E2E8F0]">
                Estudio <strong>Ingeniería de Ciencias Informáticas en la UCI</strong>,
                La Habana. Voy para tercer año. No soy senior, no trabajo en
                Google, no tengo certificaciones de Cisco. Pero me defiendo:{" "}
                <strong>Java, Python, Bash</strong>, y <strong>C++</strong> me
                está comiendo la cabeza en este momento (lo normal).
              </p>
              <p>
                Vivo en <strong className="text-[#E2E8F0]">Falcón, Placetas</strong>, y entre semestres arreglo PCs,
                instalo Linux (especialmente <strong>Arch Linux</strong>), diseño flyers y escribo scripts que automatizan
                tareas que nadie debería hacer a mano.
              </p>
              <p>
                Tengo un canal en Telegram —{" "}
                <em>Diario de un Informático Universitario y Artista</em> —
                donde hablo de tecnología sin pretender ser un experto de
                YouTube.
              </p>
            </div>

            {/* Info block - más allá del código */}
            <div className="bg-[#0B0F17] border border-[#1E2D3D] rounded-lg p-5 mb-6 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#1793D1]" />
              <p className="text-[#E2E8F0] font-body text-sm leading-relaxed mb-3">
                <strong className="text-[#E2E8F0]">Más allá del código:</strong>{" "}
                También soy productor musical (FL Studio, LMMS), diseñador
                gráfico (Krita, GIMP, Blender), y tengo una obsesión sana con
                los videojuegos retro y los emuladores. No me gusta el desarrollo
                web — prefiero software desktop nativo, especialmente para Linux.
                Me gusta que las cosas sean ligeras, rápidas y no dependan de 40
                librerías externas.
              </p>
              <div className="flex flex-wrap gap-2">
                {skillTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-mono font-medium text-[#1793D1] bg-[rgba(23,147,209,0.08)] border border-[rgba(23,147,209,0.2)] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-[rgba(230,57,70,0.05)] border-l-[3px] border-[#E63946] rounded-r-lg p-4 mb-4">
              <p className="text-[#94A3B8] font-body text-sm leading-relaxed">
                <strong className="text-[#E63946]">Lo que NO hago:</strong> No
                abro torres de PC, no soldo, no cambio pantallas, no toco
                hardware interno. Si tu problema es físico, te diagnostico
                gratis y te digo a quién acudir. Mi territorio es el software:
                sistemas operativos, virus, configuraciones, recuperación de
                datos, y todo lo que se arregla con clicks y comandos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}