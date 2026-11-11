import { isValidElement, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Check, Copy } from 'lucide-react'

/** Bloque de código con el nombre del lenguaje y un botón para copiar. */
function CodeBlock({ children }: { children?: ReactNode }) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  const language = isValidElement<{ className?: string }>(children)
    ? /language-([\w-]+)/.exec(children.props.className ?? '')?.[1]
    : undefined

  const copy = async () => {
    const text = (preRef.current?.innerText ?? '').replace(/\n$/, '')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* sin permiso para el portapapeles: no hacemos nada */
    }
  }

  return (
    <div className="code-block">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{language ?? 'código'}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-primary"
          aria-label={copied ? 'Código copiado' : 'Copiar código'}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-remote" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
          {copied ? '¡Copiado!' : 'Copiar'}
        </button>
      </div>
      <pre ref={preRef}>{children}</pre>
    </div>
  )
}

/** Renderiza Markdown con estilos `.prose`, resaltado de código (colores en index.css, clases .hljs-*)
 *  y botón de copiar en los bloques. Los enlaces externos abren en pestaña nueva. La página ya tiene su
 *  <h1>, así que un "# " dentro del Markdown se degrada a <h2>.
 *  size="reading": tipografía más grande y con más aire, pensada para leer entradas largas. */
export default function Markdown({ children, size = 'base' }: { children: string; size?: 'base' | 'reading' }) {
  return (
    <div className={size === 'reading' ? 'prose prose-reading' : 'prose'}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
        components={{
          h1: ({ children: heading }) => <h2>{heading}</h2>,
          a: ({ href, children: label }) => {
            const external = !!href && /^https?:\/\//.test(href)
            return (
              <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {label}
              </a>
            )
          },
          img: ({ src, alt }) => <img src={src} alt={alt ?? ''} loading="lazy" />,
          pre: ({ children: code }) => <CodeBlock>{code}</CodeBlock>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
