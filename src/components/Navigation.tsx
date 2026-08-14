import { Link, useLocation } from 'react-router'
import { ThemeToggle } from './ThemeToggle'
import { Menu, X } from 'lucide-react'
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
        <Link to="/" className="font-mono font-bold text-primary text-lg">
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
          <div className="pt-2 border-t border-border">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  )
}
