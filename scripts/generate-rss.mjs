// Genera public/feed.xml (RSS 2.0) con las entradas del blog.
// Corre en "prebuild", antes de que Vite copie public/ a dist/.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://bitcriollo.pages.dev";
const BLOG_URL = `${SITE_URL}/blog`;

// Mismo mini-parser que prerender.mjs (contrato idéntico a src/lib/frontmatter.ts)
function parseFrontmatter(source) {
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

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const blogDir = join(root, "src/content/blog");
let posts = [];
if (existsSync(blogDir)) {
  posts = readdirSync(blogDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = parseFrontmatter(readFileSync(join(blogDir, f), "utf8"));
      if (data.draft === true || !data.title || !data.date) return null;
      const slug = f.replace(/\.md$/, "");
      const words = content.split(/\s+/).filter(Boolean).length;
      return {
        slug,
        title: String(data.title),
        date: String(data.date),
        excerpt: typeof data.excerpt === "string" ? data.excerpt : "",
        minutes: Math.max(1, Math.round(words / 200)),
        link: `${BLOG_URL}/${slug}`,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date));
}

const items = posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${p.link}</link>
      <guid isPermaLink="true">${p.link}</guid>
      <pubDate>${new Date(p.date + "T12:00:00Z").toUTCString()}</pubDate>
      <description>${esc(p.excerpt || p.title)}</description>
    </item>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
  <channel>
    <title>Blog DIUA — BitCriollo</title>
    <link>${BLOG_URL}</link>
    <description>Diario de un Informático Universitario y Artista: Linux, Python, Bash, IA local y recuperación de datos.</description>
    <language>es</language>
${items}
  </channel>
</rss>
`;

writeFileSync(join(root, "public", "feed.xml"), xml);
console.log(`[rss] ${posts.length} entradas → public/feed.xml`);
