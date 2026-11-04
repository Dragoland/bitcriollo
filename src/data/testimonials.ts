// Testimonios para la portada. ⚠️ SON DE EJEMPLO: sustitúyelos por citas reales
// de clientes (con su permiso) en cuanto las tengas. Publicar testimonios
// inventados resta credibilidad si alguien lo descubre.
//
// stars: 1–5 · service: categoría del catálogo (local|hardware|dev) para el color

export type TestimonialService = 'local' | 'hardware' | 'dev'

export interface Testimonial {
  quote: string
  author: string
  /** Dónde vive o de dónde es el cliente. */
  location: string
  /** Servicio contratado (etiqueta visible). */
  serviceLabel: string
  service: TestimonialService
  stars: 1 | 2 | 3 | 4 | 5
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'La PC estaba llena de virus y anuncios, no se podía usar. Me la devolvió limpia el mismo día y me explicó cómo no volver a infectarla. Cobra lo que dice, sin sorpresas.',
    author: 'Yusleidys R.',
    location: 'Falcón, Placetas',
    serviceLabel: 'Limpieza de virus',
    service: 'local',
    stars: 5,
  },
  {
    quote:
      'Windows se había vuelto imposible en mi laptop vieja. Me migró a Linux y quedó volando; hasta me enseñó lo básico para defenderme. Lo recomiendo si tu equipo ya no da más.',
    author: 'Carlos M.',
    location: 'Placetas',
    serviceLabel: 'Migración a Linux',
    service: 'local',
    stars: 5,
  },
  {
    quote:
      'Se me dañó el disco con las fotos de la familia. No pudo salvarlo todo —me lo advirtió desde el inicio— pero recuperó casi todo y me ayudó a hacer respaldo para que no vuelva a pasar.',
    author: 'María T.',
    location: 'Villa Clara',
    serviceLabel: 'Recuperación de datos',
    service: 'hardware',
    stars: 4,
  },
  {
    quote:
      'Necesitaba un script para procesar facturas cada mes. Lo entregó en dos días, documentado, y cuando surgió un ajuste lo hizo sin cobrarme de nuevo. Muy profesional a distancia.',
    author: 'Laura G.',
    location: 'Cliente remoto, España',
    serviceLabel: 'Script a medida',
    service: 'dev',
    stars: 5,
  },
]
