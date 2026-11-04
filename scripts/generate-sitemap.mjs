// Genera public/sitemap.xml con las rutas fijas + posts y productos (.md).
// Se ejecuta automáticamente antes de `npm run build` (script "prebuild").
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://bitcriollo.pages.dev";
const STATIC_ROUTES = ["/", "/servicios", "/tienda", "/software", "/cotizador", "/proceso", "/blog", "/sobre-mi"];

function collect(dir, prefix) {
  const full = join(root, dir);
  if (!existsSync(full)) return [];
  return readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const text = readFileSync(join(full, file), "utf8");
      if (/^draft:\s*true/m.test(text)) return null;
      const date = text.match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
      return { loc: `${prefix}/${file.replace(/\.md$/, "")}`, date };
    })
    .filter(Boolean);
}

const entries = [
  ...STATIC_ROUTES.map((loc) => ({ loc })),
  ...collect("src/content/blog", "/blog"),
  ...collect("src/content/products", "/tienda"),
];

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map(
    ({ loc, date }) =>
      `  <url><loc>${SITE_URL}${loc === "/" ? "" : loc}</loc>${date ? `<lastmod>${date}</lastmod>` : ""}</url>`
  ),
  "</urlset>",
  "",
].join("\n");

mkdirSync(join(root, "public"), { recursive: true });
writeFileSync(join(root, "public", "sitemap.xml"), xml);
console.log(`[sitemap] ${entries.length} URLs → public/sitemap.xml`);
