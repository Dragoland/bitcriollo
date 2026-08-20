import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import { ServiciosPage } from './pages/ServiciosPage'
import Software from './pages/Software'
import Proceso from './pages/Proceso'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import SobreMi from './pages/SobreMi'
import CotizadorPage from './pages/CotizadorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'servicios', element: <ServiciosPage /> },
      { path: 'software', element: <Software /> },
      { path: 'proceso', element: <Proceso /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'sobre-mi', element: <SobreMi /> },
      { path: 'cotizador', element: <CotizadorPage /> },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
