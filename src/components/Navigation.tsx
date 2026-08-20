import { Link, useLocation } from 'react-router'
import { ThemeToggle } from './ThemeToggle'
import { Menu, X, Globe } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Software', to: '/software' },
  { label: 'Proceso', to: '/proceso' },
  { label: 'Blog', to: '/blog' },
  { label: 'Sobre mí', to: '/sobre-mi' },
]

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname === to
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        <Link to="/" className="font-mono font-bold text-primary text-lg flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-primary">
            <path d="M11 2C9.5 5 7 8.5 7 12c0 2.5 1.5 4.5 4 6.5C13.5 16.5 15 14.5 15 12c0-3.5-2.5-7-4-10z" fill="currentColor"/>
            <path d="M8.5 12.5c.3 1.2 1.2 2.8 2.5 4.5 1.3-1.7 2.2-3.3 2.5-4.5H8.5z" fill="#0B0F17" className="dark:fill-[#0B0F17] fill-white"/>
          </svg>
          Bit<span className="text-orange-400">Criollo</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <Link
              key={item.label}
              to={item.to}
              className={`text-sm font-medium transition-colors relative group ${
                isActive(item.to) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-200 ${
                isActive(item.to) ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
          <a
            href="https://wa.me/5356418463?text=Hola%20Dragoland%2C%20tengo%20un%20problema%20con%20mi%20equipo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-1.5 rounded-md hover:brightness-110 transition-all"
          >
            Escríbeme
          </a>
          <a
            href="https://wa.me/5356418463?text=Hola%20Dragoland%2C%20me%20interesa%20un%20proyecto%20de%20desarrollo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold border border-primary text-primary px-4 py-1.5 rounded-md hover:bg-primary/10 transition-all flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5" />
            Remoto
          </a>
          <ThemeToggle />
        </div>

        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 py-3 flex flex-col gap-3">
          {navItems.map(item => (
            <Link
              key={item.label}
              to={item.to}
              className={`text-sm font-medium transition-colors ${
                isActive(item.to) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5356418463?text=Hola%20Dragoland%2C%20tengo%20un%20problema%20con%20mi%20equipo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-md text-center"
            onClick={() => setIsOpen(false)}
          >
            Escríbeme por WhatsApp
          </a>
          <div className="pt-2 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Tema</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  )
}
