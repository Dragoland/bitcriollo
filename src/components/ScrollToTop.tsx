import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** Sube al inicio al cambiar de página (salvo que la URL traiga #ancla). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
