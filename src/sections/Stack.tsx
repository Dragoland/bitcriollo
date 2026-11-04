import { useState } from 'react'
import {
  Bot, Box, Brush, Code, Cpu, Database, FileText, Film, GitBranch, HardDrive, Palette, ShieldCheck, Terminal, Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'

interface Tool {
  name: string
  description: string
  /** Nombre del icono en Simple Icons (https://simpleicons.org). Sin `slug` se usa solo el icono de respaldo. */
  slug?: string
  /** Icono local que se muestra si no hay `slug` o si el enlace no carga (sin internet, bloqueado, etc.). */
  fallback: LucideIcon
}

const TOOLS: Tool[] = [
  { name: 'Arch Linux', description: 'Distro principal (rolling release)', slug: 'archlinux', fallback: Terminal },
  { name: 'Linux Mint', description: 'Para usuarios que vienen de Windows', slug: 'linuxmint', fallback: Terminal },
  { name: 'Python', description: 'Scripts, automatización, backends', slug: 'python', fallback: Code },
  { name: 'Bash', description: 'Terminal magic y automatización', slug: 'gnubash', fallback: Terminal },
  { name: 'Docker', description: 'Contenedores y despliegue', slug: 'docker', fallback: Box },
  { name: 'FastAPI', description: 'APIs REST con Python', slug: 'fastapi', fallback: Zap },
  { name: 'Git', description: 'Control de versiones', slug: 'git', fallback: GitBranch },
  { name: 'PostgreSQL', description: 'Bases de datos SQL', slug: 'postgresql', fallback: Database },
  { name: 'Ollama', description: 'LLMs locales', slug: 'ollama', fallback: Bot },
  { name: 'GIMP', description: 'Edición de imágenes', slug: 'gimp', fallback: Palette },
  { name: 'Blender', description: '3D y diseño', slug: 'blender', fallback: Cpu },
  { name: 'Krita', description: 'Arte digital', slug: 'krita', fallback: Brush },
  { name: 'TestDisk', description: 'Recuperación de datos', fallback: HardDrive },
  { name: 'ClamAV', description: 'Antivirus open source', slug: 'clamav', fallback: ShieldCheck },
  { name: 'LibreOffice', description: 'Ofimática libre', slug: 'libreoffice', fallback: FileText },
  { name: 'FFmpeg', description: 'Conversión de video', slug: 'ffmpeg', fallback: Film },
]

/** Icono de la herramienta cargado desde un enlace; si falla, muestra el icono local de respaldo. */
function ToolIcon({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false)
  const Fallback = tool.fallback

  return (
    // Fondo claro fijo para que los colores de cada marca se vean bien en ambos temas
    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-border">
      {tool.slug && !failed ? (
        <img
          src={`https://cdn.simpleicons.org/${tool.slug}`}
          alt=""
          width={26}
          height={26}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-[26px] w-[26px]"
          onError={() => setFailed(true)}
        />
      ) : (
        <Fallback className="h-5 w-5 text-slate-700" aria-hidden="true" />
      )}
    </div>
  )
}

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
              className="rounded-lg border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-glow"
            >
              <ToolIcon tool={tool} />
              <h3 className="mb-1 font-code text-sm text-foreground">{tool.name}</h3>
              <p className="font-body text-xs leading-snug text-muted-foreground">{tool.description}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
