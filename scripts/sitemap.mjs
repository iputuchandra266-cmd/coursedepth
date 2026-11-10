// Tulis dist/sitemap.xml dari semua halaman hasil build.
// Halaman /admin, /login, /search, /review-course dan semua halaman ber-noindex
// sengaja tidak dimasukkan supaya sitemap hanya berisi URL yang boleh di-index.
import fs from "node:fs";
import path from "node:path";

const EXCLUDE = new Set(["login", "search", "review-course", "admin", "404"]);

function isNoindex(pathname) {
  const clean = pathname.replace(/^\/+/, "");
  const candidates = clean
    ? [
        path.join(process.cwd(), "dist", clean, "index.html"),
        path.join(process.cwd(), "dist", `${clean}.html`),
      ]
    : [path.join(process.cwd(), "dist", "index.html")];

  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf8");
    if (/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html)) {
      return true;
    }
    return false;
  }
  return false;
}

export default function sitemap({ site = "https://coursedepth.com" } = {}) {
  const base = site.replace(/\/+$/, "");
  return {
    name: "sitemap",
    hooks: {
      "astro:build:done": ({ pages }) => {
        const lastmod = new Date().toISOString().slice(0, 10);
        const urls = pages
          .map((p) => p.pathname)
          .filter((p) => {
            const seg = (p || "").replace(/^\/+/, "").toLowerCase().replace(/\/+$/, "");
            if (!seg) return false;
            if (EXCLUDE.has(seg.split("/")[0])) return false;
            return !isNoindex(p);
          })
          .map((p) => `  <url><loc>${base}/${p.replace(/^\/+/, "").replace(/\/?$/, "/")}</loc><lastmod>${lastmod}</lastmod></url>`);
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
        fs.writeFileSync(path.join(process.cwd(), "dist", "sitemap.xml"), xml);
        const pub = path.join(process.cwd(), "public", "sitemap.xml");
        fs.mkdirSync(path.dirname(pub), { recursive: true });
        fs.writeFileSync(pub, xml);
        console.log(`sitemap: ${urls.length} URLs`);
      },
    },
  };
}
