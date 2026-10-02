import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import { ServiciosPage } from './pages/ServiciosPage'
import Software from './pages/Software'
import Proceso from './pages/Proceso'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import SobreMi from './pages/SobreMi'
import CotizadorPage from './pages/CotizadorPage'
import Marketplace from './pages/Marketplace'
import ProductDetail from './pages/ProductDetail'

function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="font-mono text-4xl font-bold text-destructive mb-4">Error</h1>
        <p className="text-muted-foreground mb-6">Algo salió mal al cargar esta página.</p>
        <a href="/" className="text-primary hover:underline font-mono">← Volver al inicio</a>
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'servicios', element: <ServiciosPage /> },
      { path: 'software', element: <Software /> },
      { path: 'proceso', element: <Proceso /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'sobre-mi', element: <SobreMi /> },
      { path: 'cotizador', element: <CotizadorPage /> },
      { path: 'tienda', element: <Marketplace /> },
      { path: 'tienda/:slug', element: <ProductDetail /> },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
