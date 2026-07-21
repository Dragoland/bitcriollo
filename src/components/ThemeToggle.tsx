import { useTheme } from '../context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border border-border hover:border-primary transition-colors"
      aria-label="Cambiar tema"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
    </button>
  )
}
