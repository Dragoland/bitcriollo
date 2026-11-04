import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'

const TOOLS = [
  { name: 'Arch Linux', description: 'Distro principal (rolling release)', icon: 'Ar' },
  { name: 'Linux Mint', description: 'Para usuarios que vienen de Windows', icon: 'LM' },
  { name: 'Python', description: 'Scripts, automatización, backends', icon: 'Py' },
  { name: 'Bash', description: 'Terminal magic y automatización', icon: 'Sh' },
  { name: 'Docker', description: 'Contenedores y despliegue', icon: 'Dc' },
  { name: 'FastAPI', description: 'APIs REST con Python', icon: 'Fa' },
  { name: 'Git', description: 'Control de versiones', icon: 'Gt' },
  { name: 'PostgreSQL', description: 'Bases de datos SQL', icon: 'Pg' },
  { name: 'Ollama', description: 'LLMs locales', icon: 'Ol' },
  { name: 'GIMP', description: 'Edición de imágenes', icon: 'GM' },
  { name: 'Blender', description: '3D y diseño', icon: 'Bl' },
  { name: 'Krita', description: 'Arte digital', icon: 'Kr' },
  { name: 'TestDisk', description: 'Recuperación de datos', icon: 'TD' },
  { name: 'ClamAV', description: 'Antivirus open source', icon: 'CA' },
  { name: 'LibreOffice', description: 'Ofimática libre', icon: 'LO' },
  { name: 'FFmpeg', description: 'Conversión de video', icon: 'FF' },
]

/** Herramientas que uso. Se muestra dentro de /sobre-mi. */
export default function Stack() {
  return (
    <section>
      <SectionHeader
        eyebrow="HERRAMIENTAS"
        title="Mi stack"
        description="Las herramientas que uso para hacer el trabajo. Nada pirata, todo software libre cuando es posible."
      />
      <Reveal>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TOOLS.map((tool) => (
            <li
              key={tool.name}
              className="group rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-glow"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                <span className="font-code text-xs font-bold text-primary" aria-hidden="true">{tool.icon}</span>
              </div>
              <h3 className="mb-1 font-code text-sm text-foreground">{tool.name}</h3>
              <p className="font-body text-xs leading-snug text-muted-foreground">{tool.description}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
