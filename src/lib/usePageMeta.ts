import { useEffect } from 'react'
import { SITE } from './site'

interface PageMeta {
  title: string
  description?: string
  /** Ruta canónica (por defecto, la ruta actual). */
  path?: string
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Actualiza <title>, description, canonical y Open Graph por página (sin duplicar etiquetas). */
export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    const fullTitle = title.includes(SITE.name) ? title : `${title} — ${SITE.name}`
    const url = `${SITE.url}${path ?? window.location.pathname}`
    document.title = fullTitle

    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:url', url)
    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:description', description)
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, path])
}
