// Tulis dist/sitemap.xml dari semua halaman hasil build (kecuali /admin dan noindex).
import fs from "node:fs";
import path from "node:path";

const EXCLUDE = new Set(["login", "search", "review-course", "admin"]);

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
            return seg && !EXCLUDE.has(seg.split("/")[0]);
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
