import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, ShoppingBag, X } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [broken, setBroken] = useState<Set<number>>(new Set())
  const closeRef = useRef<HTMLButtonElement>(null)
  const count = images.length

  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count])
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count])
  const markBroken = (i: number) => setBroken((s) => new Set(s).add(i))

  // Lightbox: teclado (Esc, flechas), bloqueo de scroll y foco inicial
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, prev, next])

  const placeholder = (
    <div className="flex h-full w-full items-center justify-center">
      <ShoppingBag className="h-20 w-20 text-muted-foreground opacity-20" aria-hidden="true" />
    </div>
  )

  if (count === 0) {
    return <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border bg-secondary">{placeholder}</div>
  }

  const navButton =
    'absolute top-1/2 -translate-y-1/2 rounded-full border border-border bg-card/80 p-2 text-foreground shadow-md transition-colors hover:bg-card'

  return (
    <div>
      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl border border-border bg-secondary">
        {broken.has(index) ? (
          placeholder
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group h-full w-full cursor-zoom-in"
            aria-label="Ver imagen en pantalla completa"
          >
            <img
              src={images[index]}
              alt={`${title} — imagen ${index + 1} de ${count}`}
              className="h-full w-full object-cover"
              onError={() => markBroken(index)}
            />
            <span className="absolute right-3 top-3 rounded-lg border border-border bg-card/85 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Maximize2 className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        )}
        {count > 1 && (
          <>
            <button type="button" onClick={prev} className={`${navButton} left-3`} aria-label="Imagen anterior">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={next} className={`${navButton} right-3`} aria-label="Imagen siguiente">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-md border border-border bg-card/80 px-2.5 py-1 font-mono text-xs text-muted-foreground backdrop-blur-sm">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={i === index}
              className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border bg-secondary transition-all ${
                i === index ? 'border-primary opacity-100 ring-2 ring-primary/20' : 'border-border opacity-60 hover:opacity-100'
              }`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Imágenes de ${title}`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="relative flex h-full max-h-[90vh] w-full max-w-5xl items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[index]}
              alt={`${title} — completa`}
              className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            {count > 1 && (
              <>
                <button type="button" onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/80" aria-label="Anterior">
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button type="button" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/80" aria-label="Siguiente">
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 font-mono text-xs text-white">
                  {index + 1} / {count}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
