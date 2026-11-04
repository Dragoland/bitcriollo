import { Link } from 'react-router'
import { usePageMeta } from '../lib/usePageMeta'

export default function NotFound() {
  usePageMeta({ title: 'Página no encontrada' })
  return (
    <section className="site-container py-32 text-center">
      <p className="mb-2 font-code text-6xl font-extrabold text-primary">404</p>
      <h1 className="mb-3 font-mono text-2xl font-bold text-foreground">Esta página no existe</h1>
      <p className="mb-8 font-body text-muted-foreground">Quizás el enlace cambió o tiene un error.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110">
          Ir al inicio
        </Link>
        <Link to="/servicios" className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary">
          Ver servicios
        </Link>
      </div>
    </section>
  )
}
