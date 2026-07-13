import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import { ServiciosPage } from './pages/Servicios'
import Perfil from './pages/Perfil'
import Proceso from './pages/Proceso'
import Stack from './pages/Stack'
import Contacto from './pages/Contacto'
import Software from './pages/Software'
import Cotizador from './pages/Cotizador'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'servicios', element: <ServiciosPage /> },
      { path: 'perfil', element: <Perfil /> },
      { path: 'proceso', element: <Proceso /> },
      { path: 'stack', element: <Stack /> },
      { path: 'contacto', element: <Contacto /> },
      { path: 'software', element: <Software /> },
      { path: 'cotizador', element: <Cotizador /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
