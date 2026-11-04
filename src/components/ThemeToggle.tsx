import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-md border border-border p-2 transition-colors hover:border-primary"
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-store" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      )}
    </button>
  )
}
