import { lazy } from 'react'
import { Link, RouterProvider, createBrowserRouter } from 'react-router'
import { Layout } from './components/Layout'
import Home from './pages/Home'

// Las demás páginas se cargan bajo demanda (react-markdown solo baja en blog/tienda)
const ServiciosPage = lazy(() => import('./pages/ServiciosPage'))
const Software = lazy(() => import('./pages/Software'))
const Proceso = lazy(() => import('./pages/Proceso'))
const CotizadorPage = lazy(() => import('./pages/CotizadorPage'))
const SobreMi = lazy(() => import('./pages/SobreMi'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Marketplace = lazy(() => import('./pages/Marketplace'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="mb-4 font-mono text-4xl font-bold text-destructive">Error</h1>
        <p className="mb-6 text-muted-foreground">Algo salió mal al cargar esta página.</p>
        <Link to="/" reloadDocument className="font-mono text-primary hover:underline">
          ← Volver al inicio
        </Link>
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
      { path: 'proceso', element: <Proceso /> },
      { path: 'cotizador', element: <CotizadorPage /> },
      { path: 'proyectos', element: <ProjectsPage /> },
      { path: 'software', element: <Software /> },
      { path: 'tienda', element: <Marketplace /> },
      { path: 'tienda/:slug', element: <ProductDetail /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'sobre-mi', element: <SobreMi /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
