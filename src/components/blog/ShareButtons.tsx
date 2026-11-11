import { useEffect, useRef, useState } from 'react'
import { ArrowUp, Check, Link2 } from 'lucide-react'
import { TelegramIcon, WhatsAppIcon } from '../icons'
import { SITE } from '../../lib/site'

interface ShareButtonsProps {
  title: string
  /** Ruta de la entrada, p. ej. "/blog/mi-post" */
  path: string
  orientation?: 'row' | 'col'
  /** Añade un botón "Subir" (para la columna lateral) */
  withTop?: boolean
}

const button =
  'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary'

export default function ShareButtons({ title, path, orientation = 'row', withTop = false }: ShareButtonsProps) {
  const url = `${SITE.url}${path}`
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copia este enlace:', url)
    }
  }

  return (
    <div
      className={`flex gap-2 ${orientation === 'col' ? 'flex-col' : 'items-center'}`}
      role="group"
      aria-label="Compartir esta entrada"
    >
      <button type="button" onClick={copy} className={button} aria-label={copied ? 'Enlace copiado' : 'Copiar enlace'} title="Copiar enlace">
        {copied ? <Check className="h-4 w-4 text-remote" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={button}
        aria-label="Compartir por WhatsApp"
        title="Compartir por WhatsApp"
      >
        <WhatsAppIcon className="h-4 w-4" />
      </a>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={button}
        aria-label="Compartir por Telegram"
        title="Compartir por Telegram"
      >
        <TelegramIcon className="h-4 w-4" />
      </a>
      {withTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`${button} mt-2`}
          aria-label="Volver arriba"
          title="Volver arriba"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
