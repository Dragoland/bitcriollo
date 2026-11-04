import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/** Renderiza Markdown con estilos `.prose`; los enlaces externos abren en pestaña nueva. */
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
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
