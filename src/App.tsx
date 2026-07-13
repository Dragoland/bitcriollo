import { useEffect } from "react";
import Navigation from "./sections/Navigation";
import Hero from "./sections/Hero";
import Perfil from "./sections/Perfil";
import Servicios from "./sections/Servicios";
import Cotizador from "./sections/Cotizador";
import Proceso from "./sections/Proceso";
import Stack from "./sections/Stack";
import LaVallita from "./sections/LaVallita";
import Contacto from "./sections/Contacto";
import Footer from "./sections/Footer";
import SoftwareStore from "./sections/SoftwareStore"; 
import CustomCursor from "./components/CustomCursor";
import { initScrollAnimations } from "./hooks/useScrollAnimations";

function App() {
  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#E2E8F0] font-mono">
      <CustomCursor />
      <Navigation />
      <Hero />
      <Perfil />
      <Servicios />
      <Cotizador />
      <Proceso />
      <Stack />
      <SoftwareStore />
      <LaVallita />
      <Contacto />
      <Footer />
    </div>
  );
}

export default App;
