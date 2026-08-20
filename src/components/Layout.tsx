import { Outlet } from 'react-router'
import { Navigation } from './Navigation'
import { Footer } from './Footer'
import ScrollToTop from './ScrollToTop'

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-mono antialiased">
      <ScrollToTop />
      <Navigation />
      <main className="flex-1 pt-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
