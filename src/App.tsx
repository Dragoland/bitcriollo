import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import { ServiciosPage } from './pages/Servicios'
import Proceso from './pages/Proceso'
import Stack from './pages/Stack'
import Contacto from './pages/Contacto'
import Software from './pages/Software'
import CotizadorPage from './pages/Cotizador'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'servicios', element: <ServiciosPage /> },
      { path: 'proceso', element: <Proceso /> },
      { path: 'stack', element: <Stack /> },
      { path: 'contacto', element: <Contacto /> },
      { path: 'software', element: <Software /> },
      { path: 'cotizador', element: <CotizadorPage /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
