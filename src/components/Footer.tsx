import { Link } from 'react-router'
import { Code, Globe, MapPin, Wrench } from 'lucide-react'
import { GitHubIcon, TelegramIcon, WhatsAppIcon } from './icons'
import Logo from './Logo'
import { SITE, githubUrl, telegramUrl, waLink } from '../lib/site'

const linkClass = 'text-sm text-muted-foreground transition-colors hover:text-primary'

export const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="site-container py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <Link to="/" aria-label="BitCriollo — inicio">
            <Logo />
          </Link>
          <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
            Soluciones informáticas en Cuba. Soporte local, desarrollo remoto y servicio técnico de hardware.
          </p>
          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {SITE.location}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded bg-primary/10 px-2 py-1 text-xs text-primary">
              <Code className="h-3 w-3" aria-hidden="true" /> Software
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-hardware/10 px-2 py-1 text-xs text-hardware">
              <Wrench className="h-3 w-3" aria-hidden="true" /> Hardware
            </span>
            <span className="inline-flex items-center gap-1 rounded bg-remote/10 px-2 py-1 text-xs text-remote">
              <Globe className="h-3 w-3" aria-hidden="true" /> Remoto
            </span>
          </div>
        </div>

        <nav aria-label="Sitio">
          <h2 className="mb-4 font-mono text-sm font-bold text-foreground">Sitio</h2>
          <div className="flex flex-col gap-2">
            <Link to="/" className={linkClass}>Inicio</Link>
            <Link to="/servicios" className={linkClass}>Servicios</Link>
            <Link to="/tienda" className={linkClass}>Tienda</Link>
            <Link to="/cotizador" className={linkClass}>Cotizador</Link>
            <Link to="/proceso" className={linkClass}>Proceso</Link>
          </div>
        </nav>

        <nav aria-label="Contenido">
          <h2 className="mb-4 font-mono text-sm font-bold text-foreground">Contenido</h2>
          <div className="flex flex-col gap-2">
            <Link to="/blog" className={linkClass}>Blog DIUA</Link>
            <Link to="/sobre-mi" className={linkClass}>Sobre mí</Link>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>GitHub</a>
            <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>Telegram</a>
          </div>
        </nav>

        <div>
          <h2 className="mb-4 font-mono text-sm font-bold text-foreground">Garantías</h2>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>Diagnóstico gratuito</li>
            <li>Garantía de 2 semanas en reparaciones</li>
            <li>Software libre y Open Source</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-border">
      <div className="site-container flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} BitCriollo. Hecho con &gt; y paciencia.
        </p>
        <div className="flex items-center gap-4">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-muted-foreground transition-colors hover:text-primary">
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <a href={telegramUrl} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-muted-foreground transition-colors hover:text-primary">
            <TelegramIcon className="h-5 w-5" />
          </a>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-primary">
            <GitHubIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
)
