import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../sections/Hero'
import { Perfil } from '../sections/Perfil'
import { Servicios } from '../sections/Servicios'
import { Cotizador } from '../sections/Cotizador'
import { Proceso } from '../sections/Proceso'
import { Stack } from '../sections/Stack'
import { LaVallita } from '../sections/LaVallita'
import { Contacto } from '../sections/Contacto'

export const Home = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location])

  return (
    <>
      <Hero />
      <Perfil />
      <Servicios />
      <Cotizador />
      <Proceso />
      <Stack />
      <LaVallita />
      <Contacto />
    </>
  )
}
