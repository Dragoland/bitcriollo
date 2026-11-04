import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { WA, waLink } from '../lib/site'

const NAV_ITEMS = [
  { label: 'Servicios', to: '/servicios' },
  { label: 'Tienda', to: '/tienda' },
  { label: 'Cotizar', to: '/cotizador' },
  { label: 'Proceso', to: '/proceso' },
  { label: 'Blog', to: '/blog' },
  { label: 'Proyectos', to: '/proyectos' },  
  { label: 'Sobre mí', to: '/sobre-mi' },
]

export const Navigation = () => {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`)

  // Cerrar el menú móvil con Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav aria-label="Principal" className="site-container flex h-14 items-center justify-between">
        <Link to="/" aria-label="BitCriollo — inicio" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-current={isActive(item.to) ? 'page' : undefined}
              className={`group relative text-sm font-medium transition-colors ${
                isActive(item.to) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-200 ${
                  isActive(item.to) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
          <a
            href={waLink(WA.equipo)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Escríbeme
          </a>
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="p-2 text-muted-foreground hover:text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="menu-movil" className="border-t border-border bg-background lg:hidden">
          <div className="site-container flex flex-col gap-1 py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={isActive(item.to) ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={`rounded-md px-2 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.to) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={waLink(WA.equipo)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Escríbeme por WhatsApp
            </a>
            <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">Tema</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
