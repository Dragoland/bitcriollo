import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

/** Renderiza Markdown con estilos `.prose` y resaltado de código (rehype-highlight);
 *  los enlaces externos abren en pestaña nueva. Los colores del código están en
 *  index.css (clases .hljs-*). La página ya tiene su <h1>, así que un "# " dentro
 *  del Markdown se degrada a <h2>. */
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose">
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
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
