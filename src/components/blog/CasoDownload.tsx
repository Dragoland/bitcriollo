import { useState } from 'react'
import { Download, FileText } from 'lucide-react'
import { casoFileName } from '../../lib/casoId'
import { getCasoUrl } from '../../lib/casos'
import { SITE, waLink } from '../../lib/site'

/** Tarjeta de descarga del expediente técnico (.md) de un caso. Solo se muestra si el caso existe. */
export default function CasoDownload({ id, title }: { id: string; title: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle')

  const download = async () => {
    setState('loading')
    try {
      const url = await getCasoUrl(id)
      if (!url) throw new Error('caso no encontrado')
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      // Se reconstruye como UTF-8 para que las tildes se vean bien al abrirlo
      const blob = new Blob([await response.text()], { type: 'text/markdown;charset=utf-8' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = casoFileName(id)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.setTimeout(() => URL.revokeObjectURL(link.href), 2000)
      setState('idle')
    } catch {
      setState('error')
    }
  }

  return (
    <aside
      aria-labelledby="caso-titulo"
      className="mt-12 flex flex-col gap-5 rounded-xl border border-primary/30 bg-primary/5 p-6 sm:flex-row sm:items-center"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <h2 id="caso-titulo" className="mb-1 font-mono text-base font-bold text-foreground">
          Descarga el expediente técnico de este caso
        </h2>
        <p className="font-body text-sm leading-relaxed text-muted-foreground">
          La documentación completa en Markdown: equipo, herramientas, cronología, comandos usados, problemas y
          soluciones, y lecciones aprendidas. Sirve para consultarla sin conexión.
        </p>
        {state === 'error' && (
          <p role="alert" className="mt-2 font-body text-sm text-destructive">
            No se pudo descargar ahora.{' '}
            <a
              href={waLink(`Hola ${SITE.handle}, no pude descargar el caso "${title}". ¿Me lo envías?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Escríbeme y te lo envío
            </a>
            .
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={download}
        disabled={state === 'loading'}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        {state === 'loading' ? 'Preparando…' : 'Descargar caso (.md)'}
      </button>
    </aside>
  )
}
