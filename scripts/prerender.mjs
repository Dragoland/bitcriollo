// Prerender estático: genera un HTML por ruta con metas OG reales (sin JS).
// WhatsApp/Telegram/Facebook leen estas etiquetas al compartir el enlace.
// Se ejecuta DESPUÉS de `vite build` (ver package.json: "build": "vite build && node scripts/prerender.mjs").
// Sirve dist/<ruta>/index.html, que tiene prioridad sobre public/_redirects en Cloudflare Pages.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://bitcriollo.pages.dev";
const DIST = join(root, "dist");

// --- Rutas fijas: título y descripción por página --------------------------------
const STATIC_PAGES = {
  "/": {
    title: "BitCriollo — Soluciones Digitales con Sabor | Placetas, Cuba",
    description: "Servicios informáticos en Falcón, Placetas: Linux, limpieza de virus, recuperación de datos, reparación de PCs y desarrollo de software remoto. Diagnóstico gratis.",
  },
  "/servicios": {
    title: "Servicios — Soporte local, hardware y desarrollo remoto",
    description: "Catálogo completo: eliminación de virus, migración a Linux, recuperación de datos, mantenimiento de hardware y desarrollo remoto con Python, Bash y automatización.",
  },
  "/cotizador": {
    title: "Cotizador — Estima el precio de tu servicio",
    description: "Marca lo que necesitas, ajusta complejidad y urgencia, y obtén un estimado al momento. El presupuesto final se confirma antes de empezar.",
  },
  "/proceso": {
    title: "Cómo trabajo — Local, hardware y remoto",
    description: "El proceso paso a paso: diagnóstico gratis, precio antes de empezar y 2 semanas de garantía en soporte local y servicio técnico.",
  },
  "/tienda": {
    title: "Tienda — PCs, componentes y software",
    description: "Computadoras, componentes, periféricos y software propio en Placetas. Escríbeme por WhatsApp y cerramos el trato.",
  },
  "/software": {
    title: "Software propio — BomApettite, NegocioEnZona y más",
    description: "Aplicaciones y herramientas desarrolladas por BitCriollo, con demo y código fuente disponibles.",
  },
  "/blog": {
    title: "Blog DIUA — Diario de un Informático Universitario y Artista",
    description: "Tutoriales de Linux (Arch), Python, Bash, IA local con Ollama, recuperación de datos y seguridad. Contenido práctico y reproducible.",
  },
  "/sobre-mi": {
    title: "Sobre mí — Norland Chávez (Dragoland)",
    description: "Informático universitario y artista en Falcón, Placetas. Perfil, stack de herramientas y contacto directo por WhatsApp, Telegram y correo.",
  },
  "/proyectos": {
    title: "Proyectos — Código abierto de Dragoland",
    description: "Repositorios públicos: asistentes de IA local para Linux, automatizaciones con Python y Bash, y este mismo sitio. Con demos y capturas.",
  },
};

// --- Mini-parser de frontmatter (mismo contrato que src/lib/frontmatter.ts) ------
function parseFrontmatter(source) {
  const raw = source.replace(/\r\n/g, "\n");
  const match = raw.match(/^---[^\S\n]*\n([\s\S]*?)\n---[^\S\n]*(?:\n([\s\S]*))?$/);
  if (!match) return { data: {}, content: raw };
  const data = {};
  let currentKey = null;
  const unquote = (v) => v.trim().replace(/^["']|["']$/g, "");
  for (const line of match[1].split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    if (trimmed.startsWith("-") && currentKey) {
      const list = Array.isArray(data[currentKey]) ? data[currentKey] : [];
      list.push(unquote(trimmed.slice(1)));
      data[currentKey] = list;
      continue;
    }
    const inline = trimmed.match(/^(\w+):\s*\[(.*)\]$/);
    if (inline) {
      currentKey = inline[1];
      data[currentKey] = inline[2].split(",").map(unquote).filter(Boolean);
      continue;
    }
    const kv = trimmed.match(/^(\w+):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      const value = unquote(kv[2]);
      if (value === "") continue;
      data[currentKey] = value === "true" ? true : value === "false" ? false : value;
    }
  }
  return { data, content: match[2] ?? "" };
}

const asString = (v, fb = "") => (typeof v === "string" ? v : fb);
const asList = (v) => (Array.isArray(v) ? v : typeof v === "string" && v ? [v] : []);

// --- Colección de .md ------------------------------------------------------------
function collect(dir, prefix) {
  const full = join(root, dir);
  if (!existsSync(full)) return [];
  return readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const text = readFileSync(join(full, file), "utf8");
      const slug = file.replace(/\.md$/, "");
      const { data } = parseFrontmatter(text);
      if (data.draft === true) return null; // los borradores no se prerenderizan
      const title = asString(data.title);
      if (!title) return null;
      const images = asList(data.images);
      const cover = asString(data.cover) || images[0] || "";
      return {
        path: `${prefix}/${slug}`,
        title,
        description: asString(data.excerpt) || asString(data.description),
        image: cover,
        date: asString(data.date),
      };
    })
    .filter(Boolean);
}

// --- Inyección de metas ----------------------------------------------------------
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function renderPage(html, { path, title, description, image }) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const ogImage = image ? (image.startsWith("http") ? image : `${SITE_URL}${image}`) : `${SITE_URL}/og-image.png`;
  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  out = out.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(description)}" />`);
  out = out.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  out = out.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(title)}" />`);
  out = out.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(description)}" />`);
  out = out.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
  out = out.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${esc(ogImage)}" />`);
  return out;
}

// --- Main ------------------------------------------------------------------------
const indexHtml = readFileSync(join(DIST, "index.html"), "utf8");
const pages = [
  ...Object.entries(STATIC_PAGES).map(([path, v]) => ({ path, ...v })),
  ...collect("src/content/blog", "/blog").map((p) => ({
    ...p,
    title: `${p.title} — BitCriollo`,
    description: p.description || `Artículo del blog DIUA de BitCriollo${p.date ? ` (${p.date})` : ""}.`,
  })),
  ...collect("src/content/products", "/tienda").map((p) => ({
    ...p,
    title: `${p.title} — Tienda BitCriollo`,
    description: p.description || "Producto disponible en la tienda de BitCriollo. Escríbeme por WhatsApp.",
  })),
];

for (const page of pages) {
  const dir = page.path === "/" ? DIST : join(DIST, page.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), renderPage(indexHtml, page));
}

console.log(`[prerender] ${pages.length} rutas con Open Graph real (sin JS)`);
