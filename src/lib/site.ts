// Datos de contacto y helpers de enlaces. Cámbialos aquí y se actualizan en todo el sitio.
export const SITE = {
  name: 'BitCriollo',
  tagline: 'Soluciones Digitales con Sabor',
  url: 'https://bitcriollo.pages.dev',
  owner: 'Norland Chávez',
  handle: 'Dragoland',
  phone: '5356418463',
  phoneDisplay: '+53 5 6418463',
  email: 'norland.chavez333@gmail.com',
  telegram: 'diario_del_informatico',
  github: 'Dragoland',
  hours: 'Lun–Sáb 9:00–18:00',
  location: 'Falcón, Placetas, Villa Clara, Cuba',
} as const

/** Enlace de WhatsApp con el texto correctamente codificado. */
export const waLink = (text?: string, phone: string = SITE.phone) =>
  `https://wa.me/${phone}${text ? `?text=${encodeURIComponent(text)}` : ''}`

/** Mensajes predefinidos para los botones de contacto. */
export const WA = {
  equipo: 'Hola Dragoland, tengo un problema con mi equipo',
  proyecto: 'Hola Dragoland, me interesa un proyecto de desarrollo',
  duda: 'Hola Dragoland, tengo una duda sobre mi equipo',
  vender: 'Hola Dragoland, tengo algo para vender en la tienda',
} as const

export const telegramUrl = `https://t.me/${SITE.telegram}`
export const githubUrl = `https://github.com/${SITE.github}`
export const mailtoUrl = `mailto:${SITE.email}`
