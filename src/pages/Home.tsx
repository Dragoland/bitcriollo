import Hero from '../sections/Hero';
import Perfil from '../sections/Perfil';
import Servicios from '../sections/Servicios';
import Cotizador from '../sections/Cotizador';
import SoftwareStore from '../sections/SoftwareStore';
import Proceso from '../sections/Proceso';
import Stack from '../sections/Stack';
import LaVallita from '../sections/LaVallita';
import Contacto from '../sections/Contacto';

export default function Home() {
  return (
    <>
    <Hero />
    <Perfil />
    <Servicios />
    <Cotizador />
    <SoftwareStore />
    <Proceso />
    <Stack />
    <LaVallita />
    <Contacto />
    </>
  );
}
