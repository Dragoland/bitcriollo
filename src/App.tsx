import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { ServiciosPage } from './pages/Servicios'
import { ProcesoPage } from './pages/Proceso'
import { StackPage } from './pages/Stack'
import { ContactoPage } from './pages/Contacto'
import { PerfilPage } from './pages/Perfil'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="servicios" element={<ServiciosPage />} />
        <Route path="proceso" element={<ProcesoPage />} />
        <Route path="stack" element={<StackPage />} />
        <Route path="contacto" element={<ContactoPage />} />
        <Route path="perfil" element={<PerfilPage />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
      </Route>
    </Routes>
  )
}

export default App
