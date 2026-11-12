// Lógica del feed del blog (RSS 2.0 + JSON Feed). Son funciones puras para poder probarlas
// con Vitest (scripts/feed.test.mjs). scripts/generate-rss.mjs las usa en cada build.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

// ⚠️ Mantener igual que src/lib/site.ts (scripts/feed.test.mjs lo comprueba).
export const SITE = {
  name: "BitCriollo",
  url: "https://bitcriollo.pages.dev",
  owner: "Norland Chávez",
  handle: "Dragoland",
  email: "norland.chavez333@gmail.com",
  phone: "5356418463",
};

export const BLOG_URL = `${SITE.url}/blog`;
export const FEED_URL = `${SITE.url}/feed.xml`;
export const JSON_FEED_URL = `${SITE.url}/feed.json`;
export const FEED_LIMIT = 50;

export const FEED = {
  title: "Blog DIUA — BitCriollo",
  description:
    "Diario de un Informático Universitario y Artista: tutoriales de Linux, Python, Bash, IA local, recuperación de datos y casos reales de reparación desde Cuba.",
  language: "es",
};

/* ─────────────── XML ─────────────── */

// Caracteres que XML 1.0 no admite: si se cuela uno, TODO el feed deja de ser válido.
const INVALID_XML = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g;

export const cleanXml = (s) => String(s).replace(INVALID_XML, "");

export const esc = (s) =>
  cleanXml(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Bloque CDATA seguro: si el texto trae "]]>", se parte para no cerrar el bloque antes de tiempo. */
export const cdata = (s) => `<![CDATA[${cleanXml(s).split("]]>").join("]]]]><![CDATA[>")}]]>`;

/* ─────────────── Fechas ─────────────── */

// Las entradas solo tienen día; se fija el mediodía UTC para que ninguna zona horaria lo cambie de día.
const toDate = (day) => new Date(`${day}T12:00:00Z`);
export const isValidDay = (day) => /^\d{4}-\d{2}-\d{2}$/.test(day) && !Number.isNaN(toDate(day).getTime());
export const rfc822 = (day) => toDate(day).toUTCString();
export const iso8601 = (day) => toDate(day).toISOString().replace(".000Z", "Z");

/* ─────────────── Contenido ─────────────── */

/** La entrada ya muestra el título aparte: se quita un "# Título" al inicio del Markdown. */
export const stripLeadingH1 = (md) => md.replace(/^\s*# [^\n]*\n+/, "");

/** Las rutas "/imagen.png" y "/blog/x" no sirven dentro de un lector RSS: se vuelven absolutas. */
export function absolutizeUrls(html, base = SITE.url) {
  return html.replace(/\b(href|src)="\/(?!\/)([^"]*)"/g, (_, attr, path) => `${attr}="${base}/${path}"`);
}

/** Quita lo peligroso o inútil dentro de un feed (scripts, iframes, manejadores on*, javascript:). */
export function sanitizeHtml(html) {
  return html
    .replace(/<(script|style|iframe|object|embed|form)\b[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<\/?(script|style|iframe|object|embed|form|link|meta)\b[^>]*>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\b(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"');
}

/** Resumen en texto plano (para entradas sin `excerpt`). */
export function plainSummary(md, max = 280) {
  const text = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^[#>\-*+\s|]+/gm, " ")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return `${cut.slice(0, space > 120 ? space : max).trimEnd()}…`;
}

/** Conversor mínimo (párrafos, títulos y bloques de código) por si `marked` no estuviera instalado. */
export function basicMarkdownToHtml(md) {
  const out = [];
  const paragraph = (chunk) => {
    for (const block of chunk.split(/\n{2,}/)) {
      const text = block.trim();
      if (!text) continue;
      const heading = /^(#{1,6})\s+(.*)$/.exec(text);
      if (heading && !text.includes("\n")) out.push(`<h${heading[1].length}>${esc(heading[2])}</h${heading[1].length}>`);
      else out.push(`<p>${esc(text).replace(/\n/g, "<br />")}</p>`);
    }
  };
  let last = 0;
  for (const m of md.matchAll(/```[^\n]*\n([\s\S]*?)```/g)) {
    paragraph(md.slice(last, m.index));
    out.push(`<pre><code>${esc(m[1])}</code></pre>`);
    last = m.index + m[0].length;
  }
  paragraph(md.slice(last));
  return out.join("\n");
}

/** Devuelve la función Markdown→HTML: `marked` si está instalado, o el conversor mínimo. */
export async function loadMarkdownEngine() {
  try {
    const { marked } = await import("marked");
    return (md) => marked.parse(md, { gfm: true, async: false });
  } catch {
    console.warn("[rss] 'marked' no está instalado: se usa un conversor básico (npm install -D marked).");
    return basicMarkdownToHtml;
  }
}

const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".gif": "image/gif" };
export const absoluteUrl = (url) => (/^https?:\/\//.test(url) ? url : `${SITE.url}${url.startsWith("/") ? "" : "/"}${url}`);

/** Datos de la portada para <enclosure>; solo si el archivo existe en public/ (hace falta su tamaño). */
export function coverInfo(cover, publicDir) {
  if (!cover || !cover.startsWith("/")) return null;
  const file = join(publicDir, cover);
  const type = MIME[extname(cover).toLowerCase()];
  if (!type || !existsSync(file)) return null;
  return { url: absoluteUrl(cover), length: statSync(file).size, type };
}

/** HTML completo de una entrada: portada + texto + pie con enlace de vuelta a la web. */
export function renderPostHtml(post, toHtml) {
  let body = toHtml(stripLeadingH1(post.markdown));
  body = body.replace(/<(\/?)h1\b/g, "<$1h2"); // la entrada ya tiene su título
  body = absolutizeUrls(sanitizeHtml(body));

  const cover = post.cover ? `<p><img src="${esc(absoluteUrl(post.cover))}" alt="" /></p>\n` : "";
  const wa = `https://wa.me/${SITE.phone}?text=${encodeURIComponent(`Hola ${SITE.handle}, leí "${post.title}" en tu blog`)}`;
  const caso = post.caso ? " En la web puedes descargar el expediente técnico de este caso." : "";
  const footer =
    `\n<hr />\n<p><em>Publicado en <a href="${esc(post.link)}">${esc(SITE.name)}</a>.${caso} ` +
    `¿Necesitas ayuda con algo parecido? <a href="${esc(wa)}">Escríbeme por WhatsApp</a>.</em></p>`;
  return `${cover}${body}${footer}`;
}

/* ─────────────── Lectura de las entradas ─────────────── */

// Mismo contrato que src/lib/frontmatter.ts
export function parseFrontmatter(source) {
  const match = source.replace(/\r\n/g, "\n").match(/^---[^\S\n]*\n([\s\S]*?)\n---[^\S\n]*(?:\n([\s\S]*))?$/);
  if (!match) return { data: {}, content: source };
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

/** Entradas publicadas (sin borradores ni fechas inválidas), de más nueva a más antigua. */
export function readPosts(root) {
  const blogDir = join(root, "src/content/blog");
  const casosDir = join(root, "src/content/casos");
  if (!existsSync(blogDir)) return [];

  return readdirSync(blogDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data, content } = parseFrontmatter(readFileSync(join(blogDir, file), "utf8"));
      const title = typeof data.title === "string" ? data.title : "";
      const date = typeof data.date === "string" ? data.date : "";
      if (data.draft === true || !title) return null;
      if (!isValidDay(date)) {
        console.warn(`[rss] "${slug}" ignorada: fecha inválida (${date || "vacía"}); usa AAAA-MM-DD`);
        return null;
      }
      const casoId = typeof data.caso === "string" && data.caso.trim() ? data.caso.trim() : slug;
      return {
        slug,
        title,
        date,
        tags: Array.isArray(data.tags) ? data.tags : [],
        excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
        cover: typeof data.cover === "string" ? data.cover : "",
        caso: existsSync(join(casosDir, `${casoId}.md`)),
        markdown: content,
        link: `${BLOG_URL}/${slug}`,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
    .slice(0, FEED_LIMIT);
}

/* ─────────────── Salida: RSS 2.0 ─────────────── */

export function buildRss(posts, { publicDir = "", logo = false } = {}) {
  const newest = posts[0]?.date;
  const year = newest ? newest.slice(0, 4) : String(new Date().getFullYear());

  const items = posts
    .map((p) => {
      const cover = coverInfo(p.cover, publicDir);
      const lines = [
        `    <item>`,
        `      <title>${esc(p.title)}</title>`,
        `      <link>${esc(p.link)}</link>`,
        `      <guid isPermaLink="true">${esc(p.link)}</guid>`,
        `      <pubDate>${rfc822(p.date)}</pubDate>`,
        `      <dc:creator>${esc(`${SITE.owner} (${SITE.handle})`)}</dc:creator>`,
        ...p.tags.map((t) => `      <category>${esc(t)}</category>`),
        `      <description>${esc(p.excerpt || plainSummary(p.markdown))}</description>`,
        `      <content:encoded>${cdata(p.html)}</content:encoded>`,
      ];
      if (cover) lines.push(`      <enclosure url="${esc(cover.url)}" length="${cover.length}" type="${cover.type}" />`);
      lines.push(`    </item>`);
      return lines.join("\n");
    })
    .join("\n");

  const image = logo
    ? `    <image>
      <url>${SITE.url}/rss-logo.png</url>
      <title>${esc(FEED.title)}</title>
      <link>${BLOG_URL}</link>
      <width>144</width>
      <height>144</height>
    </image>
`
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(FEED.title)}</title>
    <link>${BLOG_URL}</link>
    <description>${esc(FEED.description)}</description>
    <language>${FEED.language}</language>
    <copyright>© ${year} ${esc(SITE.name)}</copyright>
    <managingEditor>${esc(`${SITE.email} (${SITE.owner})`)}</managingEditor>
${newest ? `    <lastBuildDate>${rfc822(newest)}</lastBuildDate>\n` : ""}    <generator>BitCriollo · scripts/generate-rss.mjs</generator>
    <ttl>180</ttl>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${image}${items}
  </channel>
</rss>
`;
}

/* ─────────────── Salida: JSON Feed 1.1 ─────────────── */

export function buildJsonFeed(posts) {
  const author = { name: SITE.owner, url: `${SITE.url}/sobre-mi` };
  return `${JSON.stringify(
    {
      version: "https://jsonfeed.org/version/1.1",
      title: FEED.title,
      home_page_url: BLOG_URL,
      feed_url: JSON_FEED_URL,
      description: FEED.description,
      icon: `${SITE.url}/feed-icon.png`,
      language: FEED.language,
      authors: [author],
      items: posts.map((p) => ({
        id: p.link,
        url: p.link,
        title: p.title,
        summary: p.excerpt || plainSummary(p.markdown),
        content_html: p.html,
        date_published: iso8601(p.date),
        ...(p.cover ? { image: absoluteUrl(p.cover) } : {}),
        tags: p.tags,
        authors: [author],
      })),
    },
    null,
    2
  )}\n`;
}
