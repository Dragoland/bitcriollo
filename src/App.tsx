import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import { ServiciosPage } from './pages/Servicios';
import Perfil from './pages/Perfil';
import Proceso from './pages/Proceso';
import Stack from './pages/Stack';
import Contacto from './pages/Contacto';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
    <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/servicios" element={<ServiciosPage />} />
    <Route path="/perfil" element={<Perfil />} />
    <Route path="/proceso" element={<Proceso />} />
    <Route path="/stack" element={<Stack />} />
    <Route path="/contacto" element={<Contacto />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
    </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
