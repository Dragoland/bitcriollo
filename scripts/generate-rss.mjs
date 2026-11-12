// Genera public/feed.xml (RSS 2.0) y public/feed.json (JSON Feed 1.1) con el TEXTO COMPLETO de
// las entradas del blog. Corre en "prebuild", antes de que Vite copie public/ a dist/.
// Si algo falla, avisa pero NO detiene el build: un feed roto no debe impedir publicar la web.
import { existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildJsonFeed, buildRss, loadMarkdownEngine, readPosts, renderPostHtml } from "./lib/feed.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

try {
  const posts = readPosts(root);
  const toHtml = await loadMarkdownEngine();
  for (const post of posts) post.html = renderPostHtml(post, toHtml);

  const logo = existsSync(join(publicDir, "rss-logo.png"));
  writeFileSync(join(publicDir, "feed.xml"), buildRss(posts, { publicDir, logo }));
  writeFileSync(join(publicDir, "feed.json"), buildJsonFeed(posts));
  console.log(`[rss] ${posts.length} entradas (texto completo) → public/feed.xml y public/feed.json`);
} catch (error) {
  console.error("[rss] No se pudo generar el feed; el build continúa sin actualizarlo:", error);
}
