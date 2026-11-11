import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

/** Barra fina bajo el menú que muestra cuánto del texto llevas leído. */
export default function ReadingProgress({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const target = targetRef.current
      const bar = barRef.current
      if (!target || !bar) return
      const rect = target.getBoundingClientRect()
      // Se completa cuando el final del texto llega a la parte baja de la pantalla
      const total = rect.height - window.innerHeight * 0.6
      const done = Math.min(Math.max(56 - rect.top, 0), Math.max(total, 1))
      bar.style.transform = `scaleX(${total > 0 ? done / total : 1})`
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [targetRef])

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-14 z-40 h-[3px]">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-primary" />
    </div>
  )
}
