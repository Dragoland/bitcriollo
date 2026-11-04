import { Suspense } from 'react'
import { Outlet } from 'react-router'
import WhatsAppFloat from './WhatsAppFloat'
import { Footer } from './Footer'
import { Navigation } from './Navigation'
import ScrollToTop from './ScrollToTop'

export const Layout = () => (
  <div className="flex min-h-screen flex-col bg-background font-mono text-foreground antialiased">
    <a
      href="#contenido"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
    >
      Saltar al contenido
    </a>
    <ScrollToTop />
    <Navigation />
    <main id="contenido" tabIndex={-1} className="flex-1 pt-14 outline-none">
      <Suspense
        fallback={
          <div role="status" className="py-32 text-center font-mono text-sm text-muted-foreground">
            Cargando…
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </main>
    <WhatsAppFloat />
    <Footer />
  </div>
)
