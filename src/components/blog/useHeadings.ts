import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { slugify } from '../../lib/blogSearch'

export interface Heading {
  id: string
  text: string
  level: 2 | 3
}

/** Lee los <h2>/<h3> ya renderizados, les pone un id único y devuelve la lista para el índice. */
export function useHeadings(ref: RefObject<HTMLElement | null>, key: string): Heading[] {
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const used = new Set<string>()
    const found: Heading[] = []

    root.querySelectorAll<HTMLHeadingElement>('h2, h3').forEach((el) => {
      const text = (el.textContent ?? '').trim()
      if (!text) return
      const base = slugify(text) || 'seccion'
      let id = base
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`
      used.add(id)
      el.id = id
      found.push({ id, text, level: el.tagName === 'H3' ? 3 : 2 })
    })
    setHeadings(found)
  }, [ref, key])

  return headings
}

/** id de la sección que se está leyendo (la última cuyo título ya pasó la parte alta de la pantalla). */
export function useActiveHeading(headings: Heading[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (headings.length === 0) return
    let frame = 0

    const update = () => {
      frame = 0
      let current: string | null = null
      for (const h of headings) {
        const el = document.getElementById(h.id)
        if (el && el.getBoundingClientRect().top <= 140) current = h.id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [headings])

  return active
}
