# Changelog

Todas las versiones notables de **BitCriollo** serán documentadas en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/), y el versionado sigue [Semantic Versioning](https://semver.org/lang/es/).

---
## [2.4.0] - 2026-11-12

### Cambiado
- Feed RSS rehecho: ahora publica el **texto completo** de cada entrada (`content:encoded`), con autor, etiquetas como categorías, portada (`enclosure`), enlaces e imágenes absolutos, `atom:link rel="self"`, `lastBuildDate`, copyright, editor y logo del canal.
- La fecha de última construcción es la de la entrada más reciente (el feed ya no cambia en cada build sin motivo).

### Añadido
- JSON Feed 1.1 en `/feed.json` (con enlace de descubrimiento en `index.html`).
- Cabeceras correctas para ambos feeds en `public/_headers` y caché de una hora.
- Logos `rss-logo.png` (144 px) y `feed-icon.png` (512 px).
- Pruebas del feed (`scripts/feed.test.mjs`) y `marked` como dependencia de desarrollo.

### Corregido
- Caracteres de control o `]]>` en un texto ya no pueden dejar el feed inválido.
- Un fallo al generar el feed ya no detiene el build.

---

## [2.3.0] - 2026-11-11

### Añadido
- Casos descargables: si existe `src/content/casos/<slug-del-post>.md` (o el post indica `caso:` en el frontmatter), la entrada muestra al final un botón para descargar el expediente técnico en Markdown, y la tarjeta del listado una insignia "Expediente".
- Se incluyen los 7 expedientes actuales (Chromebook 3310, Torre Fantasma, Torre Zombi, Laptop Guasón, Servidor Caído, Torre Epiléptica y Redmi A2). El del Redmi A2 queda listo para cuando se publique su post.

---

## [2.2.0] - 2026-11-08

### Cambiado
- Blog rediseñado: buscador (título, etiquetas, resumen y contenido, sin importar tildes), última entrada destacada, cuadrícula de dos columnas, "Mostrar más", filtros por etiqueta y por mes con estado en la URL, barra lateral con etiquetas/archivo/suscripción y atajo `/` para buscar.
- Entradas rediseñadas: texto más grande y cómodo, índice lateral con la sección activa, barra de progreso de lectura, botones para compartir (copiar, WhatsApp, Telegram), anterior/siguiente y entradas relacionadas.
- Bloques de código con el nombre del lenguaje y botón "Copiar".
- Datos estructurados `BlogPosting` en cada entrada.

---
## [2.1.0] - 2026-11-07

### Añadido
- Catálogo único de servicios (`src/data/services.ts`) y cotizador con lógica testeada (`lib/quote.ts`).
- SEO: metadatos por página, prerender de metadatos para compartir enlaces, sitemap y RSS generados en cada build.
- Portada: garantías, servicios y productos destacados, preguntas frecuentes, botón flotante de WhatsApp.
- Página de proyectos, fecha de actualización de precios y pruebas con Vitest.
- Resaltado de código en el blog con paleta propia para tema claro y oscuro.

### Corregido
- El logo ("Bit") era invisible en el tema claro.
- El resaltado de código no mostraba colores (el tema nunca se importaba).
- La categoría `laptops` no existía: el ASUS ROG G16 aparecía como "Otros" y no salía en los filtros.
- Los posts mostraban dos títulos principales (`<h1>` repetido) y el blog, unas 50 etiquetas.
- Las capturas de proyectos inexistentes aparecían como imagen rota.
- `/proyectos` faltaba en el sitemap; el analytics tenía un token de ejemplo.
- Los testimonios de ejemplo ya no se publican hasta marcarlos `verified: true`.
- Import sin usar en el cotizador y erratas en las preguntas frecuentes.

### Eliminado
- Código sin uso: shadcn/ui, GSAP, cursor personalizado, páginas y secciones antiguas.

---
## [2.0.0] - 2026-08-14

### Navegación
- **Inicio** (`/`) — Solo el Hero de bienvenida
- **Servicios** (`/servicios`) — Todos los servicios con tags de color por categoría
- **Software** (`/software`) — BomApettite con mockup visual + CTA personalizado
- **Proceso** (`/proceso`) — Cómo funciona el workflow
- **Blog** (`/blog`) — Posts desde Markdown
- **Sobre mí** (`/sobre-mi`) — Fusión de Perfil + Contacto
- **Cotizador** (`/cotizador`) — Calculadora de precios

### Eliminado
- `/perfil` y `/contacto` separados → fusionados en `/sobre-mi`
- `/stack` → integrado en Sobre mí
- La Vallita de la home → movida al footer

### Mejoras
- **Servicios**: sin "Software-only" repetido, tags de color por categoría (Software/Diseño/Multimedia/Remoto)
- **Software**: mockup visual de BomApettite (simulación de app móvil con QR)
- **Footer**: La Vallita integrada como banner antes del footer principal
- **Navegación**: links activos con indicador visual, CTA de WhatsApp siempre visible

## [1.1.0] - 2026-07-13

### ✨ Añadido
- **Tema claro (Light Mode)**: Implementación completa con toggle en la navegación. La preferencia se guarda en `localStorage` y respeta el tema del sistema operativo.
- **Enrutamiento con React Router**: Migración de SPA a múltiples páginas. Ahora existen rutas dedicadas para:
  - `/` → Inicio (con scroll suave a secciones mediante hash).
  - `/servicios`, `/proceso`, `/stack`, `/contacto`, `/perfil` → Páginas independientes.
  - `/blog` → Listado de artículos.
  - `/blog/:slug` → Vista individual de cada artículo.
- **Blog DIUA (Diario de un Informático Universitario y Artista)**:
  - Integración de archivos **Markdown** como fuente de contenido (`src/content/blog/`).
  - Uso de `gray-matter` para parsear el frontmatter (título, fecha, etiquetas).
  - Renderizado con `react-markdown` y soporte para GFM (tablas, tachados, etc.).
  - Diseño de tarjetas estilo terminal, fiel al prototipo original.
- **Componente `Layout`**: Envoltorio común que centraliza la barra de navegación y el pie de página.
- **Soporte para `import.meta.glob`**: Carga dinámica y eficiente de los archivos Markdown en tiempo de compilación.

### 🔄 Modificado
- **`Navigation.tsx`**: Ahora utiliza `Link` de React Router. Se añadió el botón de cambio de tema y se mejoró la lógica de enlaces activos (incluyendo hashes).
- **`Footer.tsx`**: Actualizado con enlaces funcionales a redes sociales y al blog.
- **`App.tsx`** y **`main.tsx`**: Reestructurados para envolver la aplicación con `BrowserRouter` y `ThemeProvider`.
- **`index.css`**: Refactorizado para usar variables CSS nativas (`rgb(var(--bg))`), permitiendo el cambio fluido entre temas. Se añadieron estilos globales para el contenido del blog (`.prose`).
- **`tailwind.config.js`**: Configurado para usar `darkMode: 'class'` y mapear las variables CSS a colores de Tailwind.

### 🧹 Eliminado
- (N/A) No se eliminaron funcionalidades existentes; el sitio sigue siendo completamente compatible con la versión anterior.

---

## [1.0.0] - 2026-07-12

### 🚀 Lanzamiento inicial

Versión fundacional de **BitCriollo** — Sitio web profesional para servicios informáticos y tecnológicos en Falcón, Placetas, Villa Clara.

#### ✨ Características principales

**Landing Page**
- Terminal interactiva que simula la personalidad del desarrollador.
- Diseño moderno y atractivo con experiencia de usuario clara y funcional.

**Perfil Profesional**
- Biografía del técnico informático independiente.
- Habilidades técnicas y proyectos personales destacados.

**Servicios**
- Listado de servicios **categorizados**: software, diseño, multimedia y remoto.

**Cotizador Interactivo**
- Calcula un presupuesto estimado en **CUP** según los servicios seleccionados.

**Proceso de Trabajo**
- Flujo de trabajo explicado paso a paso.

**Stack Tecnológico**
- Muestra las herramientas utilizadas en el desarrollo.

**Contacto**
- Métodos directos: **WhatsApp**, **Telegram** y **Email**.
- Formulario de contacto integrado.

**Navegación y Pie de Página**
- **Menú de navegación** fijo y responsive.
- **Pie de página** con enlaces, redes sociales y copyright.

#### 🛠️ Tecnologías implementadas (v1.0)

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

---

## 🗺️ Planes y Metas (Roadmap)

Aquí están los objetivos planificados para futuras versiones (`v1.2`, `v1.3`, etc.).

### 🔜 Próximos pasos (Corto plazo)

1.  **SEO y Metadatos Dinámicos**:
    - Implementar `React Helmet` o `react-helmet-async` para gestionar el `<head>` de cada página (títulos, descripciones, Open Graph).
    - Mejorar la indexación en buscadores y el compartir en redes sociales.

2.  **Sistema de Búsqueda en el Blog**:
    - Añadir una barra de búsqueda que filtre los posts por título, contenido o etiquetas en tiempo real.
    - Opcional: usar `Fuse.js` para búsqueda difusa.

3.  **Feed RSS / Atom**:
    - Generar un feed RSS automático a partir de los archivos Markdown para que los lectores puedan suscribirse.

### 🚀 Visión a futuro (Mediano plazo)

4.  **Optimización de Rendimiento**:
    - Lazy loading de imágenes y componentes pesados.
    - Code Splitting a nivel de rutas (ya soportado por React Router, pero se puede perfeccionar).

5.  **Mejoras en el Cotizador**:
    - Guardar presupuestos en el `localStorage` para que el usuario no pierda el progreso.
    - Añadir más opciones de personalización (descuentos, paquetes).

6.  **Sincronización con Telegram (DIUA)**:
    - Explorar un script o GitHub Action que convierta automáticamente los mensajes del canal de Telegram en archivos `.md` dentro del repositorio, manteniendo el blog actualizado de forma semiautomática.

7.  **Internacionalización (i18n)**:
    - Soporte para múltiples idiomas (Español/Inglés) usando `react-i18next`.

8.  **Panel de Administración ligero**:
    - Interfaz simple para escribir y publicar posts directamente desde el navegador (utilizando `localStorage` o integración con GitHub API).

---

*¡Mantente al tanto de las próximas actualizaciones!* 🚀
