# Changelog

## [1.0.0] - Base

### 🚀 Lanzamiento inicial

Versión fundacional de **BitCriollo** — Sitio web profesional para servicios informáticos y tecnológicos en Falcón, Placetas, Villa Clara.

### ✨ Características principales

#### Landing Page
- **Terminal interactiva** que simula la personalidad del desarrollador.
- Diseño moderno y atractivo con experiencia de usuario clara y funcional.

#### Perfil Profesional
- Biografía del técnico informático independiente.
- Habilidades técnicas y proyectos personales destacados.

#### Servicios
- Listado de servicios **categorizados**: software, diseño, multimedia y remoto.

#### Cotizador Interactivo
- Calcula un presupuesto estimado en **CUP** según los servicios seleccionados.

#### Proceso de Trabajo
- Flujo de trabajo explicado paso a paso.

#### Stack Tecnológico
- Muestra las herramientas utilizadas en el desarrollo.

#### Contacto
- Métodos directos: **WhatsApp**, **Telegram** y **Email**.
- Formulario de contacto integrado.

#### Navegación y Pie de Página
- **Menú de navegación** fijo y responsive.
- **Pie de página** con enlaces, redes sociales y copyright.

### 🛠️ Tecnologías implementadas

| Tecnología | Uso |
|------------|-----|
| **React 19** | Hooks y componentes funcionales |
| **TypeScript** | Tipado estático |
| **Vite** | Bundler y servidor de desarrollo |
| **Tailwind CSS 3.4** | Tema personalizado (colores, fuentes, animaciones) |
| **shadcn/ui** | Base para componentes UI (40+ componentes disponibles) |
| **GSAP + ScrollTrigger** | Animaciones al hacer scroll |
| **Lucide React** | Iconos |
| **Cloudflare Pages** | Alojamiento y despliegue continuo |

### 📁 Estructura del Proyecto

```
/
├── public/               # Archivos estáticos (imágenes, favicon, etc.)
├── src/
│   ├── components/       # Componentes reutilizables (CustomCursor, etc.)
│   ├── hooks/            # Hooks personalizados (useScrollAnimations, use-mobile)
│   ├── lib/              # Utilidades (cn)
│   ├── sections/         # Secciones principales de la página
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Perfil.tsx
│   │   ├── Servicios.tsx
│   │   ├── Cotizador.tsx
│   │   ├── Proceso.tsx
│   │   ├── Stack.tsx
│   │   ├── LaVallita.tsx
│   │   ├── Contacto.tsx
│   │   └── Footer.tsx
│   ├── App.tsx           # Componente raíz
│   ├── main.tsx          # Punto de entrada
│   ├── index.css         # Estilos globales (Tailwind + custom)
│   └── App.css           # Estilos específicos (poco usado)
├── index.html
├── package.json
├── ... (configuraciones)
└── README.md
```


---

## 🗺️ Planes

### Próximas implementaciones

| # | Feature | Descripción |
|---|---------|-------------|
| 1 | **Tema Blanco** | Implementación de un tema claro (light mode) como alternativa al tema oscuro actual. |
| 2 | **Enrutamiento** | Migración de SPA a múltiples páginas con React Router, permitiendo navegación entre secciones mediante URLs dedicadas. |
| 3 | **Blog "DIUA"** | Integración del blog **"Diario de un Informático Universitario y Artista"** (abreviado **DIUA**), proveniente del canal de Telegram [@diario_del_informatico](https://t.me/diario_del_informatico). El blog alojará las publicaciones del canal en formato artículo dentro del sitio web. |
