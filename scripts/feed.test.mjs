import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  BLOG_URL, SITE, absolutizeUrls, basicMarkdownToHtml, buildJsonFeed, buildRss, cdata, cleanXml, esc,
  iso8601, isValidDay, loadMarkdownEngine, plainSummary, rfc822, renderPostHtml, sanitizeHtml, stripLeadingH1,
} from "./lib/feed.mjs";

const toHtml = await loadMarkdownEngine(); // `marked` si está instalado; si no, el conversor básico

const post = (slug, date, extra = {}) => ({
  slug, date, title: `Título ${slug}`, tags: ["linux", "tutorial"], excerpt: `Resumen ${slug}`,
  cover: "", caso: false, markdown: `# Título ${slug}\n\nTexto de **${slug}**.\n\n- uno\n- dos`,
  link: `${BLOG_URL}/${slug}`, ...extra,
});
const withHtml = (p) => ({ ...p, html: renderPostHtml(p, toHtml) });
const posts = [withHtml(post("b", "2026-10-26")), withHtml(post("a", "2026-07-16"))];

describe("XML", () => {
  it("escapa los caracteres especiales", () => {
    expect(esc(`a & b < c > "d"`)).toBe("a &amp; b &lt; c &gt; &quot;d&quot;");
  });
  it("elimina caracteres que XML 1.0 no admite", () => {
    expect(cleanXml("ho\u0000la\u000B!")).toBe("hola!");
  });
  it("CDATA no se cierra antes de tiempo", () => {
    expect(cdata("a ]]> b")).toBe("<![CDATA[a ]]]]><![CDATA[> b]]>");
  });
});

describe("fechas", () => {
  it("RFC-822 e ISO a mediodía UTC (sin saltos de día por zona horaria)", () => {
    expect(rfc822("2026-08-18")).toBe("Tue, 18 Aug 2026 12:00:00 GMT");
    expect(iso8601("2026-08-18")).toBe("2026-08-18T12:00:00Z");
  });
  it("valida el formato AAAA-MM-DD", () => {
    expect(isValidDay("2026-08-18")).toBe(true);
    expect(isValidDay("18/08/2026")).toBe(false);
    expect(isValidDay("2026-13-45")).toBe(false);
  });
});

describe("contenido", () => {
  it("quita el # Título inicial", () => {
    expect(stripLeadingH1("# Hola\n\nTexto")).toBe("Texto");
    expect(stripLeadingH1("Texto\n\n# Otro")).toBe("Texto\n\n# Otro");
  });
  it("vuelve absolutas las rutas locales y respeta el resto", () => {
    const html = `<a href="/blog/x">a</a><img src="/images/y.png"><a href="https://z.com">b</a><a href="//cdn.com/q">c</a><a href="#top">d</a>`;
    const out = absolutizeUrls(html);
    expect(out.includes(`href="${SITE.url}/blog/x"`)).toBe(true);
    expect(out.includes(`src="${SITE.url}/images/y.png"`)).toBe(true);
    expect(out.includes(`href="https://z.com"`)).toBe(true);
    expect(out.includes(`href="//cdn.com/q"`)).toBe(true);
    expect(out.includes(`href="#top"`)).toBe(true);
  });
  it("sanea scripts, iframes, manejadores y javascript:", () => {
    const out = sanitizeHtml(`<p onclick="x()">hola</p><script>alert(1)</script><iframe src="x"></iframe><a href="javascript:alert(1)">m</a>`);
    expect(out).toBe(`<p>hola</p><a href="#">m</a>`);
  });
  it("resume en texto plano", () => {
    expect(plainSummary("# Título\n\nTexto con **negrita** y [un enlace](http://x.com).\n\n```bash\nls\n```")).toBe("Título Texto con negrita y un enlace.");
    expect(plainSummary("palabra ".repeat(100)).endsWith("…")).toBe(true);
  });
  it("el conversor básico respeta párrafos, títulos y código", () => {
    const html = basicMarkdownToHtml("## Hola\n\nLínea <b>1</b>\n\n```bash\necho \"a\" && ls\n```");
    expect(html.includes("<h2>Hola</h2>")).toBe(true);
    expect(html.includes("&lt;b&gt;")).toBe(true);
    expect(html.includes("<pre><code>echo &quot;a&quot; &amp;&amp; ls\n</code></pre>")).toBe(true);
  });
  it("el HTML de una entrada trae texto, enlace de vuelta y sin título repetido", () => {
    const html = posts[0].html;
    expect(html.includes("<strong>b</strong>") || html.includes("**b**")).toBe(true);
    expect(html.includes("Título b")).toBe(false);
    expect(html.includes(`href="${BLOG_URL}/b"`)).toBe(true);
    expect(html.includes("wa.me/")).toBe(true);
  });
  it("menciona el expediente solo si existe", () => {
    expect(renderPostHtml(post("c", "2026-01-01", { caso: true }), toHtml).includes("expediente técnico")).toBe(true);
    expect(posts[0].html.includes("expediente técnico")).toBe(false);
  });
});

describe("RSS", () => {
  const xml = buildRss(posts, { logo: true });
  it("declara los espacios de nombres y el enlace al propio feed", () => {
    expect(xml.includes('xmlns:atom="http://www.w3.org/2005/Atom"')).toBe(true);
    expect(xml.includes('xmlns:content="http://purl.org/rss/1.0/modules/content/"')).toBe(true);
    expect(xml.includes(`<atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />`)).toBe(true);
  });
  it("una <item> por entrada, la más nueva primero, con texto completo y etiquetas", () => {
    expect(xml.split("<item>").length - 1).toBe(2);
    expect(xml.indexOf("Título b") < xml.indexOf("Título a")).toBe(true);
    expect(xml.split("<content:encoded>").length - 1).toBe(2);
    expect(xml.split("<category>linux</category>").length - 1).toBe(2);
  });
  it("fecha de última construcción = la entrada más nueva (el feed no cambia sin motivo)", () => {
    expect(xml.includes("<lastBuildDate>Mon, 26 Oct 2026 12:00:00 GMT</lastBuildDate>")).toBe(true);
    expect(xml.includes("<copyright>© 2026 BitCriollo</copyright>")).toBe(true);
  });
  it("incluye el logo solo si se pide", () => {
    expect(xml.includes("<image>")).toBe(true);
    expect(buildRss(posts).includes("<image>")).toBe(false);
  });
  it("funciona sin entradas", () => {
    const empty = buildRss([]);
    expect(empty.includes("<item>")).toBe(false);
    expect(empty.includes("<lastBuildDate>")).toBe(false);
  });
});

describe("JSON Feed", () => {
  const json = JSON.parse(buildJsonFeed(posts));
  it("cumple lo esencial de JSON Feed 1.1", () => {
    expect(json.version).toBe("https://jsonfeed.org/version/1.1");
    expect(json.feed_url).toBe(`${SITE.url}/feed.json`);
    expect(json.items).toHaveLength(2);
    expect(json.items[0].id).toBe(`${BLOG_URL}/b`);
    expect(json.items[0].date_published).toBe("2026-10-26T12:00:00Z");
  });
});

describe("datos del sitio", () => {
  it("coinciden con src/lib/site.ts", () => {
    const ts = readFileSync(new URL("../src/lib/site.ts", import.meta.url), "utf8");
    const field = (name) => new RegExp(`${name}:\\s*['"]([^'"]+)['"]`).exec(ts)?.[1];
    expect(SITE.url).toBe(field("url"));
    expect(SITE.email).toBe(field("email"));
    expect(SITE.phone).toBe(field("phone"));
    expect(SITE.owner).toBe(field("owner"));
    expect(SITE.handle).toBe(field("handle"));
  });
});
