// Proyectos para /proyectos. Mete aquí los repos públicos que quieras mostrar.
// demo: enlace a demo desplegada · image: captura en /images/projects/<slug>.png (1200×630 aprox.)

export interface Project {
  name: string
  description: string
  tech: string[]
  repo: string
  demo?: string
  image?: string
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    name: 'Arch-Chan AI Assistant',
    description:
      'Asistente de IA local y nativo para Arch Linux, con interfaz moderna y voz completa. Corre 100% en tu máquina: privacidad total, sin nube.',
    tech: ['Python', 'IA local', 'Linux'],
    repo: 'https://github.com/Dragoland/Arch-Chan-AI-assistant',
    image: '/images/projects/arch-chan.png',
    featured: true,
  },
  {
    name: 'DragoHub',
    description:
      'Asistente de IA local avanzado que funciona completamente en tu computadora: productividad, creatividad y automatización con control total.',
    tech: ['Python', 'IA local'],
    repo: 'https://github.com/Dragoland/DragoHub',
    image: '/images/projects/dragohub.png',
  },
  {
    name: 'Automatizaciones KDE',
    description:
      'Scripts de Python y Bash para automatizar tareas en KDE Plasma: atajos, flujos repetitivos y ajustes del escritorio.',
    tech: ['Python', 'Bash', 'KDE'],
    repo: 'https://github.com/Dragoland/automatizaciones_kde',
  },
  {
    name: 'BitCriollo',
    description: 'Este mismo sitio: React 19 + Vite 7 + Cloudflare Pages, con blog en Markdown, tienda, cotizador y prerender estático.',
    tech: ['TypeScript', 'React', 'Vite'],
    repo: 'https://github.com/Dragoland/bitcriollo',
  },
  {
    name: 'BomApettite',
    description: 'Software gastronómico, sistema de servicios y productos con carta digital y offline para restaurantes.',
    tech: [],
    repo: 'https://github.com/Dragoland/bomapettite',
    demo: '#',
    image: '/images/projects/bomapettite.png',
    featured: true,
  },
  {
    name: 'NegocioEnZona',
    description: 'Software comercial. Sistema de gestion de productos y finanzas para Pymes.',
    tech: [],
    repo: 'https://github.com/Dragoland/negocioenzona',
    demo: '#',
    image: '/images/projects/negocioenzona.png',
    featured: true,
  },
]
