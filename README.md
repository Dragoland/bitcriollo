# BitCriollo — Soluciones Digitales con Sabor

> Sitio web profesional para servicios informáticos y tecnológicos en Falcón, Placetas, Villa Clara.

![BitCriollo](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan) ![Vite](https://img.shields.io/badge/Vite-7.2-purple) ![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-deployed-orange)

## 📖 Descripción

**BitCriollo** es el sitio web de un técnico informático independiente que ofrece servicios de software a la comunidad de Falcón, Placetas, y de forma remota. El proyecto combina un diseño moderno y atractivo con una experiencia de usuario clara y funcional, destacando la cercanía y el trato personal.

El sitio incluye:

- **Landing page** con terminal interactiva que simula la personalidad del desarrollador.
- **Perfil profesional** con biografía, habilidades técnicas y proyectos personales.
- **Listado de servicios** categorizados (software, diseño, multimedia, remoto).
- **Cotizador interactivo** que calcula un presupuesto estimado en CUP según los servicios seleccionados.
- **Proceso de trabajo** explicado paso a paso.
- **Stack tecnológico** mostrando las herramientas utilizadas.
- **Sección de contacto** con métodos directos (WhatsApp, Telegram, Email) y formulario.
- **Menú de navegación** fijo y responsive.
- **Pie de página** con enlaces, redes sociales y copyright.

## 🚀 Tecnologías

- **React 19** con Hooks y componentes funcionales.
- **TypeScript** para tipado estático.
- **Vite** como bundler y servidor de desarrollo.
- **Tailwind CSS 3.4** con tema personalizado (colores, fuentes, animaciones).
- **shadcn/ui** como base para componentes UI (40+ componentes disponibles).
- **GSAP** y **ScrollTrigger** para animaciones al hacer scroll.
- **Lucide React** para iconos.
- **Cloudflare Pages** para alojamiento y despliegue continuo.

## 📁 Estructura del Proyecto

```
/
├── public/                 # Archivos estáticos (imágenes, favicon, etc.)
├── src/
│   ├── components/         # Componentes reutilizables (CustomCursor, etc.)
│   ├── hooks/              # Hooks personalizados (useScrollAnimations, use-mobile)
│   ├── lib/                # Utilidades (cn)
│   ├── sections/           # Secciones principales de la página
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
│   ├── App.tsx             # Componente raíz
│   ├── main.tsx            # Punto de entrada
│   ├── index.css           # Estilos globales (Tailwind + custom)
│   └── App.css             # Estilos específicos (poco usado)
├── index.html              # HTML principal
├── package.json
├── package-lock.json
├── tsconfig.json           # Configuración TypeScript (referencias)
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── components.json         # Configuración de shadcn/ui
├── .npmrc                  # (opcional) legacy-peer-deps
├── .nvmrc                  # (opcional) versión de Node.js
└── README.md
```

## 🛠️ Instalación y Desarrollo Local

### Requisitos

- Node.js 20+ (recomendado) o 22+
- npm 10+

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/Dragoland/bitcriollo.git
cd bitcriollo

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abrir http://localhost:3000
```

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con HMR |
| `npm run build` | Genera la build de producción (solo Vite, sin verificación de tipos) |
| `npm run preview` | Previsualiza la build localmente |
| `npm run lint` | Ejecuta ESLint para revisar el código |

## 🌐 Despliegue en Cloudflare Pages

El proyecto está configurado para desplegarse en Cloudflare Pages mediante conexión con GitHub.

### Configuración recomendada

- **Framework preset**: Vite
- **Build command**: `npm install && npm run build`
- **Build output directory**: `dist`
- **Node.js version**: 20 (definida en `.nvmrc`)

### Archivos de configuración adicionales

- `.npmrc` → `legacy-peer-deps=true` (evita conflictos de dependencias)
- `.nvmrc` → `20` (fija la versión de Node)

### Variables de entorno (opcional)

Si necesitas añadir claves de API u otros secretos, configúralos en el panel de Cloudflare Pages → Settings → Environment Variables.

## 📦 Dependencias principales

| Paquete | Versión | Uso |
|---------|---------|-----|
| react | 19.2.0 | UI |
| react-dom | 19.2.0 | Renderizado |
| tailwindcss | 3.4.19 | Estilos |
| gsap | 3.15.0 | Animaciones |
| lucide-react | 0.562.0 | Iconos |
| @radix-ui/* | varios | Componentes accesibles |
| react-hook-form | 7.70.0 | Manejo de formularios |
| sonner | 2.0.7 | Toast notifications |

## 🧑‍💻 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir los cambios.

1. Haz un fork del repositorio.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## 📄 Licencia

Este proyecto es de código abierto y se distribuye bajo la licencia **MIT**. Puedes usarlo, modificarlo y distribuirlo libremente, siempre que se mantenga el aviso de copyright.

## ✨ Créditos

- **Desarrollador**: Norland Chávez (Dragoland)
- **Diseño y contenido**: Propio del autor
- **Frameworks y herramientas**: React, Vite, Tailwind, shadcn/ui, GSAP, Cloudflare.

---

**Visita el sitio en producción:** [https://bitcriollo.pages.dev](https://bitcriollo.pages.dev)

---

> *Hecho con `</>` y paciencia — Falcón, Placetas, Villa Clara, Cuba.*
