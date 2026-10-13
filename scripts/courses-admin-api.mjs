// Dev-only admin API: dipakai oleh dashboard /admin saat `astro dev`.
// Menulis langsung src/data/courses.json. Tidak ikut ter-build (static site).
import fs from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), "src/data/courses.json");
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const read = () => JSON.parse(fs.readFileSync(FILE, "utf8"));
const save = (list) => fs.writeFileSync(FILE, JSON.stringify(list, null, 2) + "\n", "utf8");
const send = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(body));
};
const validate = (c) => {
  const slug = String(c.slug ?? "").trim();
  if (!slug) return "Slug wajib diisi";
  if (!SLUG_RE.test(slug)) return "Slug hanya boleh huruf kecil, angka dan tanda -";
  if (!String(c.title ?? "").trim()) return "Title wajib diisi";
  return null;
};
const readBody = (req) =>
  new Promise((resolve) => {
    let raw = "";
    req.on("data", (d) => (raw += d));
    req.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch {
        resolve(null);
      }
    });
  });

async function handler(req, res, next) {
  const url = new URL(req.url, "http://localhost");
  if (!url.pathname.startsWith("/api/courses")) return next();
  try {
    const slug = url.searchParams.get("slug");
    const list = read();

    if (req.method === "GET") return send(res, 200, list);

    if (req.method === "POST") {
      const body = await readBody(req);
      if (!body) return send(res, 400, { error: "Body bukan JSON valid" });
      const err = validate(body);
      if (err) return send(res, 400, { error: err });
      const s = String(body.slug).trim();
      if (list.some((c) => c.slug === s)) return send(res, 409, { error: `Slug "${s}" sudah dipakai` });
      list.unshift({ ...body, slug: s });
      save(list);
      return send(res, 201, { ok: true, courses: list });
    }

    if (req.method === "PUT") {
      if (!slug) return send(res, 400, { error: "Parameter slug tidak ada" });
      const body = await readBody(req);
      if (!body) return send(res, 400, { error: "Body bukan JSON valid" });
      const err = validate(body);
      if (err) return send(res, 400, { error: err });
      const idx = list.findIndex((c) => c.slug === slug);
      if (idx === -1) return send(res, 404, { error: "Tidak ditemukan" });
      const s = String(body.slug).trim();
      if (s !== slug && list.some((c) => c.slug === s)) return send(res, 409, { error: `Slug "${s}" sudah dipakai` });
      list[idx] = { ...body, slug: s };
      save(list);
      return send(res, 200, { ok: true, courses: list });
    }

    if (req.method === "DELETE") {
      if (!slug) return send(res, 400, { error: "Parameter slug tidak ada" });
      const next2 = list.filter((c) => c.slug !== slug);
      if (next2.length === list.length) return send(res, 404, { error: "Tidak ditemukan" });
      save(next2);
      return send(res, 200, { ok: true, courses: next2 });
    }

    return send(res, 405, { error: "Method tidak didukung" });
  } catch (e) {
    return send(res, 500, { error: String(e?.message || e) });
  }
}

/** Astro integration: pasang middleware hanya saat dev server berjalan. */
export default function coursesAdminApi() {
  return {
    name: "courses-admin-api",
    hooks: {
      "astro:server:setup": ({ server }) => {
        server.middlewares.use(handler);
      },
    },
  };
}
