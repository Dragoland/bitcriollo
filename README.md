<div align="center">

# 🔥 BitCriollo

**Soluciones Digitales con Sabor** — sitio web de servicios informáticos en Falcón, Placetas (Villa Clara, Cuba) y desarrollo de software remoto.

[![Sitio](https://img.shields.io/badge/sitio-bitcriollo.pages.dev-1793D1?style=flat-square)](https://bitcriollo.pages.dev)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Licencia](https://img.shields.io/badge/licencia-MIT-green?style=flat-square)

</div>

## ¿Qué es?

Web de BitCriollo: presenta los **servicios** (soporte local, servicio técnico de hardware y desarrollo remoto), un **cotizador** que arma el presupuesto y lo envía por WhatsApp, una **tienda** de PCs, componentes y software, y un **blog** (DIUA). Todo el contacto se canaliza por WhatsApp, Telegram y correo.

## Características

- 🧾 **Catálogo único de servicios** (`src/data/services.ts`): alimenta la página de servicios, el cotizador y la portada. Un solo lugar para cambiar precios.
- 🧮 **Cotizador** con complejidad, urgencia y horas (para servicios por hora). Genera el mensaje de WhatsApp correctamente codificado.
- 🛒 **Tienda** con filtros y búsqueda (sin tildes ni mayúsculas) guardados en la URL (`/tienda?categoria=pcs&q=laptop`), galería con *lightbox* accesible y detalle por producto.
- 📝 **Blog en Markdown** con **buscador** (título, etiquetas, resumen y contenido; ignora tildes; atajo `/`), filtros por etiqueta y mes guardados en la URL, última entrada destacada y barra lateral con archivo y suscripción (RSS/Telegram).
- 📖 **Entradas cómodas de leer**: índice lateral con la sección activa, barra de progreso, botones para compartir, bloques de código con botón "Copiar", anterior/siguiente y entradas relacionadas. Cada entrada incluye datos estructurados `BlogPosting`.
- 🌗 **Tema claro/oscuro** que respeta la preferencia del sistema, sin parpadeo al cargar, con colores ajustados para cumplir contraste WCAG AA.
- 🔎 **SEO**: título, descripción, canonical y Open Graph por página (`usePageMeta`), datos estructurados `LocalBusiness`, `sitemap.xml` generado en cada build, `robots.txt` e imagen para compartir en WhatsApp/Telegram.
- ♿ **Accesibilidad**: enlace "Saltar al contenido", etiquetas en formularios, navegación por teclado, `aria-*` en menús y botones, respeto de `prefers-reduced-motion`.
- ⚡ **Rendimiento**: páginas cargadas bajo demanda, tipografías **autoalojadas** (sin Google Fonts) y animaciones con `IntersectionObserver` (sin GSAP).
- 📚 **Blog con contenido inicial**: tutoriales prácticos (recuperación de datos, Python, IA local con Ollama, respaldos con rsync, instalación de Linux Mint, seguridad en WhatsApp, atajos de Bash) y curiosidades de la informática.
- 🖥️ **Terminal animada** en la portada (decorativa, con resumen para lectores de pantalla).

## Stack

| Área | Tecnología |
| --- | --- |
| UI | React 19 + TypeScript |
| Rutas | React Router 7 (`createBrowserRouter`) |
| Estilos | Tailwind CSS 3.4 con variables CSS (`hsl(var(--token))`) |
| Iconos | lucide-react |
| Markdown | react-markdown + remark-gfm |
| Tipografías | Inter y JetBrains Mono (`@fontsource-variable`) |
| Build | Vite 7 |
| Hosting | Cloudflare Pages |

## Inicio rápido

Requiere **Node.js 20.19+** (recomendado 22).

```bash
git clone https://github.com/Dragoland/bitcriollo.git
cd bitcriollo
npm install
npm run dev        # http://localhost:5173
```

### Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo (los borradores `draft: true` sí se ven) |
| `npm run build` | Genera el sitemap (`prebuild`) y compila a `dist/` |
| `npm run preview` | Sirve el build local |
| `npm run typecheck` | Revisa los tipos con TypeScript |
| `npm run lint` | ESLint |
| `npm run sitemap` | Regenera `public/sitemap.xml` a mano |

## Estructura

```
bitcriollo/
├── index.html                 # meta/OG/JSON-LD, script de tema anti-parpadeo
├── public/
│   ├── _redirects             # SPA: /* → /index.html (Cloudflare Pages)
│   ├── _headers               # cabeceras de seguridad y caché
│   ├── robots.txt · sitemap.xml · favicon.svg · og-image.png
│   └── images/                # avatar y fotos de productos
├── scripts/
│   ├── generate-sitemap.mjs   # rutas fijas + posts + productos
│   ├── generate-rss.mjs       # feed.xml (RSS 2.0) y feed.json (JSON Feed) con texto completo
│   ├── prerender.mjs          # Open Graph por ruta para compartir enlaces
│   ├── lib/feed.mjs           # lógica del feed (funciones puras, con pruebas)
│   └── feed.test.mjs
└── src/
    ├── App.tsx                # rutas (páginas lazy) y 404
    ├── main.tsx               # fuentes, tema y arranque
    ├── index.css              # tokens de color, .prose, utilidades
    ├── components/            # Layout, Navigation, Footer, Logo, Reveal,
    │                          # SectionHeader, ProductCard, ImageGallery,
    │                          # Markdown, ThemeToggle, ScrollToTop, icons
    ├── context/ThemeContext.tsx
    ├── data/
    │   ├── services.ts        # ★ catálogo de servicios, categorías y precios
    │   └── productCategories.ts
    ├── lib/
    │   ├── site.ts            # ★ teléfono, correo, enlaces y waLink()
    │   ├── frontmatter.ts     # parser compartido por blog y tienda
    │   ├── blogSearch.ts      # búsqueda, filtros y relacionados del blog (con pruebas)
    │   ├── posts.ts · products.ts
    │   └── usePageMeta.ts     # SEO por página
    ├── sections/              # bloques reutilizables (Hero, Servicios,
    │                          # Cotizador, Proceso, Stack, SoftwareStore…)
    ├── pages/                 # una por ruta: Home, ServiciosPage, Software,
    │                          # Proceso, CotizadorPage, Marketplace,
    │                          # ProductDetail, Blog, BlogPost, SobreMi, NotFound
    └── content/
        ├── blog/*.md          # entradas del blog
        ├── casos/*.md         # expedientes técnicos descargables (uno por post)
        └── products/*.md      # productos de la tienda
```

### Rutas

| Ruta | Página |
| --- | --- |
| `/` | Portada: hero, garantías, servicios destacados, productos destacados |
| `/servicios` | Catálogo completo (`?categoria=local\|hardware\|dev`) |
| `/cotizador` | Cotizador (`?servicio=<id>` preselecciona un servicio) |
| `/proceso` | Cómo trabajo: local, hardware y remoto |
| `/tienda`, `/tienda/:slug` | Marketplace y detalle de producto |
| `/software` | Software propio a la venta |
| `/blog`, `/blog/:slug` | Blog DIUA |
| `/sobre-mi` | Perfil, contacto, formulario y stack |

## Editar contenido

### Datos de contacto
Todo (teléfono, correo, Telegram, GitHub, horario, ubicación) está en [`src/lib/site.ts`](src/lib/site.ts). Los enlaces de WhatsApp se generan con `waLink(texto)`, que codifica el mensaje de forma segura.

### Servicios y precios
Edita [`src/data/services.ts`](src/data/services.ts). Cada servicio tiene `id`, `name`, `description`, `price`, `currency` (`CUP`/`USD`), `category` (`local`/`hardware`/`dev`) e `icon`. Con `unit: 'hora'` el cotizador pide horas, y con `featured: true` aparece en la portada.

### Entradas del blog
Crea `src/content/blog/mi-entrada.md`:

```md
---
title: "Cómo instalar Arch Linux"
date: 2026-09-01
tags: [linux, arch]
excerpt: "Resumen corto que aparece en el listado."
draft: false
---

# Contenido en Markdown…
```

El nombre del archivo es la URL (`/blog/mi-entrada`). Con `draft: true` solo se ve en desarrollo. Las fechas van como `AAAA-MM-DD`.

Opcionalmente puedes añadir `cover: "/images/blog/mi-portada.jpg"` para mostrar una imagen de portada en el post y en las tarjetas. En el cuerpo, usa `##` y `###` para los títulos: con 3 o más se genera el índice lateral automáticamente.

### Feed del blog (RSS y JSON Feed)
Cada build genera dos feeds con el **texto completo** de las entradas (no solo el resumen), listos para cualquier lector:

| Formato | Dirección |
| --- | --- |
| RSS 2.0 | `/feed.xml` |
| JSON Feed 1.1 | `/feed.json` |

Qué incluyen: título, enlace permanente, fecha, autor, etiquetas (como categorías), resumen, el artículo en HTML (con enlaces e imágenes absolutos, tablas y bloques de código), la portada como `<enclosure>` si la hay, un pie con enlace de vuelta y WhatsApp, y el logo del canal. La fecha de "última construcción" es la de la entrada más reciente, así que el feed solo cambia cuando publicas algo.

- Los borradores (`draft: true`) y las entradas con fecha inválida no entran. Se publican las 50 más recientes.
- El Markdown se convierte con [`marked`](https://marked.js.org) (dependencia de desarrollo). Si faltara, se usa un conversor básico y el build sigue.
- Si algo falla al generar el feed, el build **no se detiene**: avisa en el log y sigue.
- `public/_headers` sirve cada feed con su tipo correcto (`application/rss+xml` / `application/feed+json`).
- Los datos de `scripts/lib/feed.mjs` (URL, correo, teléfono) deben coincidir con `src/lib/site.ts`; una prueba lo comprueba.

Para revisar el feed tras publicar, pega `https://bitcriollo.pages.dev/feed.xml` en el [validador del W3C](https://validator.w3.org/feed/).

### Casos descargables (expediente técnico de un post)
Cada post puede ofrecer un botón **"Descargar caso (.md)"** al final de la lectura con la documentación completa del caso (equipo, herramientas, cronología, comandos, problemas y lecciones). El botón **solo aparece si el archivo existe**:

1. Guarda el expediente en `src/content/casos/` con **el mismo nombre que el post**:
   `src/content/blog/2026-09-13-laptop-guason.md` → `src/content/casos/2026-09-13-laptop-guason.md`
2. Si el archivo tiene otro nombre, indícalo en el frontmatter del post: `caso: telefono-en-cirugia`.
3. Listo: el post muestra el botón y su tarjeta en el listado lleva la insignia "Expediente". Para quitarlo, borra el archivo.

Los casos no se incluyen en el JavaScript de la web: se descargan solo cuando alguien pulsa el botón. El archivo descargado se llama `caso-<nombre>.md` (sin la fecha). En desarrollo, la consola avisa de los casos que ningún post está usando.

### Productos de la tienda
Crea `src/content/products/mi-producto.md`:

```md
---
title: "Laptop Dell Latitude"
price: "$250 USD"
category: pcs          # pcs | componentes | perifericos | software
condition: usado       # nuevo | usado
seller: BitCriollo
location: "Falcón, Placetas"
whatsapp: "5356418463" # opcional; por defecto, el de site.ts
featured: true
images:
  - "/images/products/laptop-1.jpg"
  - "/images/products/laptop-2.jpg"
description: "Texto corto para la tarjeta."
---

## Detalle en Markdown
```

> Si no existe ningún `.md` en `content/blog` o `content/products`, el sitio muestra contenido de ejemplo definido en `lib/posts.ts` y `lib/products.ts`. Al crear tus propios archivos, ese contenido de ejemplo deja de usarse.

### Stack de herramientas
Está en [`src/sections/Stack.tsx`](src/sections/Stack.tsx). Cada herramienta lleva un `slug` de [Simple Icons](https://simpleicons.org) y su icono se carga desde `https://cdn.simpleicons.org/<slug>`. Si el enlace no carga (sin internet, bloqueado o el icono ya no existe), se muestra automáticamente un icono local de respaldo (`fallback`, de lucide-react). Para añadir una herramienta basta con agregar una línea a la lista `TOOLS`; si no tiene icono en Simple Icons, déjala sin `slug`.

### Imágenes
Van en `public/images/` y se referencian con ruta absoluta (`/images/...`). Para la portada de *Sobre mí* se usa `public/images/avatar-cartoon.png`.

## Temas y colores

Los colores son variables CSS definidas en `src/index.css` para `:root` (claro) y `.dark`. Además de los de shadcn (`primary`, `card`, `muted`…), hay tres semánticos por línea de servicio:

| Token | Uso | Clases |
| --- | --- | --- |
| `primary` | Soporte local | `text-primary`, `bg-primary/10` |
| `hardware` | Servicio técnico | `text-hardware`, `border-hardware/30` |
| `remote` | Desarrollo remoto | `text-remote`, `bg-remote/10` |
| `store` | Destacados / tienda | `text-store` |

No uses colores fijos (`text-emerald-500`, `#1793D1`…): rompen el contraste en el tema claro.

## Despliegue (Cloudflare Pages)

| Ajuste | Valor |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Variable de entorno | `NODE_VERSION` = `22` |

`public/_redirects` hace que entrar directo a `/servicios` o `/blog/mi-entrada` no dé 404, y `public/_headers` añade cabeceras de seguridad y caché para `/assets/*`. Cada `git push` a la rama principal despliega automáticamente.

## Novedades v1.2.0

- Catálogo único de servicios (adiós a la triple duplicación y a los precios que no coincidían).
- Cotizador y formularios envían por WhatsApp con el texto bien codificado; el formulario de *Sobre mí* ya no finge enviar.
- Navegación y pie por rutas reales; todo el sitio sigue el tema claro/oscuro.
- Contraste corregido en tema claro y tokens de color por línea de servicio.
- SEO por página, sitemap automático, `_redirects`, cabeceras, 404 y datos estructurados.
- Portada más corta y enfocada; tienda y blog con filtros en la URL.
- Fecha de los posts sin desfase de un día por zona horaria.
- Fuentes autoalojadas, páginas bajo demanda y eliminación de GSAP, shadcn/Radix y otras dependencias sin uso.

## Licencia

[MIT](LICENSE) © Norland Chávez (Dragoland)
