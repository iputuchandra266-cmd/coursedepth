import fs from "node:fs";
import path from "node:path";

const SRC = "/home/josh/udemy catalog";
const OUT = path.join(process.cwd(), "src/data/udemy-catalog.ts");

const nameOfSlug = {
  "web-development": "Web Development",
  "python": "Python",
  "sql": "SQL",
  "javascript": "JavaScript",
  "data-science": "Data Science",
  "artificial-intelligence": "Artificial Intelligence",
  "it-and-software": "IT & Software",
  "it-certifications": "IT Certifications",
  "hacking": "Hacking",
  "aws": "AWS",
  "graphic-design": "Graphic Design",
  "ux-design": "UX Design",
  "photoshop": "Photoshop",
  "3d-modeling": "3D Modeling",
  "business": "Business",
  "data-analysis": "Data Analysis",
  "project-management": "Project Management",
  "leadership": "Leadership & Management",
  "digital-marketing": "Digital Marketing",
  "seo": "SEO",
  "social-media-marketing": "Social Media Marketing",
  "excel": "Excel",
  "office-productivity": "Office Productivity",
  "finance-and-accounting": "Finance & Accounting",
  "photography": "Photography",
  "video-editing-and-animation": "Video Editing & Animation",
  "personal-development": "Personal Development",
  "health-and-fitness": "Health & Fitness",
  "music": "Music",
  "guitar": "Guitar",
  "language-learning": "Language Learning",
  "engineering": "Engineering",
  "lifestyle": "Lifestyle",
};

const RULES = [
  [/guitar/, "guitar"],
  [/java|spring ninja|spring/, "javascript"],
  [/react|node\.?js|typescript|angular|vue/, "javascript"],
  [/python|django|flask/, "python"],
  [/\bsql\b|postgres|mysql|database|oracle e-bus|azure logic|fastapi/, "sql"],
  [/flutter|android|ios|kotlin|swift|mobile/, "web-development"],
  [/\bhtml\b|\bcss\b|wordpress|web development|website/, "web-development"],
  [/power ?bi|tableau|data analysis|data analyst/, "data-analysis"],
  [/data science|pandas|machine learning|deep learning/, "data-science"],
  [/llm|large language|langchain|chatgpt|generative|ai engineer|artificial intelligence|neural|vibe coding/, "artificial-intelligence"],
  [/cyber|ciberseguridad|gcih|issap|hack|pentest|security|incident/, "hacking"],
  [/az-900|sc-900|azure|aws|cloud|devops|certification|exam prep|iso 2000|simulados?/i, "aws"],
  [/salesforce|sap|commvault|brfplus|hmi|unix|network/, "it-certifications"],
  [/photoshop|illustrator|graphic|drawing|paint|aquarell|malen|portrait|réaliste|realista|dibujo|art|escribir|escritura|mockups/, "graphic-design"],
  [/video editing|documentary|premiere|film|cutting/, "video-editing-and-animation"],
  [/excel|spreadsheet/, "excel"],
  [/powerpoint|\bword\b|notion|office/, "office-productivity"],
  [/seo|pinterest|tiktok|facebook|instagram|affiliate|marketing|traffic|ads|social media|brand|\bpitch|pr playbook/, "digital-marketing"],
  [/fotografi|photography|\bphoto/ , "photography"],
  [/musical|music|audio|mixing|grabación/, "music"],
  [/cooking|food|culinary|resep/, "lifestyle"],
  [/dropshipping|startup|business|entrepreneur|consult|nonprofit|fundraising|board/, "business"],
  [/tax|accounting|enrolled agent|invest|finance|money|financial/, "finance-and-accounting"],
  [/project management|pmp|agile|scrum|event planning/, "project-management"],
  [/leadership|church|coach|coaching|management|team/, "leadership"],
  [/français|franç|franc|spanish|korean|french|nt2|language|100 mots|palabras/, "language-learning"],
  [/electr|elétrico|electric|robot|civil|engineering|quantity|surveying|qeletrotech/, "engineering"],
  [/pharmacy|dental|clinical|psycholog|therapy|heilen|healing|skin|health|fitness|wellness|yoga|iv therapy|remedies/, "health-and-fitness"],
  [/tarot|spiritual|esoterik|meditation|lucid|goal hacking|purpose|propósito|self|personality|rebirth|ico ching|i ching|mind/, "personal-development"],
];

const FALLBACK = "personal-development";

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function pickRating(h) {
  return +(3.9 + (h % 11) / 10).toFixed(1);
}
function pickReviews(h) {
  return 80 + (h % 8000);
}
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const xml = fs.readFileSync(SRC, "utf8");
const rawItems = [...xml.matchAll(/<Item>([\s\S]*?)<\/Item>/g)].map((m) => m[1]);
const get = (block, tag) => {
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return m ? m[1].trim() : "";
};

const rows = rawItems
  .map((b) => ({
    id: get(b, "CatalogItemId"),
    name: get(b, "Name"),
    cat: get(b, "Category"),
    price: get(b, "CurrentPrice"),
    img: get(b, "ImageUrl"),
    url: get(b, "Url"),
    desc: get(b, "Description"),
  }))
  .filter((r) => r.name);

const existingSlugs = new Set();
const existingPath = path.join(process.cwd(), "src/data/courses.ts");
if (fs.existsSync(existingPath)) {
  const src = fs.readFileSync(existingPath, "utf8");
  for (const m of src.matchAll(/slug: "([^"]+)"/g)) existingSlugs.add(m[1]);
}

const used = new Set(existingSlugs);
const courses = rows.map((r, i) => {
  const hay = (r.cat + " " + r.name).toLowerCase();
  let catSlug = FALLBACK;
  for (const [re, slug] of RULES) {
    if (re.test(hay)) {
      catSlug = slug;
      break;
    }
  }
  let base = slugify(r.name) || "course";
  let slug = base;
  let n = 1;
  while (used.has(slug)) {
    slug = `${base}-${n++}`;
    if (slug === base) slug = `${base}-${n++}`;
    if (n > 100) slug = `${base}-${i}-${n}`;
  }
  used.add(slug);
  const h = hashStr(r.name);
  const price = Number.parseFloat(r.price.replace?.(/[^0-9.]/g, "") ?? "") || 0;
  return `  {
    slug: ${JSON.stringify(slug)},
    title: ${JSON.stringify(r.name)},
    provider: "Udemy",
    category: ${JSON.stringify(nameOfSlug[catSlug] ?? "Personal Development")},
    categorySlug: ${JSON.stringify(catSlug)},
    instructor: "Udemy Instructor",
    instructorSlug: "udemy-instructor",
    rating: ${pickRating(h)},
    reviews: ${pickReviews(h)},
    price: ${price},
    oldPrice: 0,
    level: "All levels",
    duration: "Self-paced",
    updated: "10/2026",
    gradient: "linear-gradient(135deg,#111827,#1e3a8a)",
    emoji: "🎓",
    bestseller: false,
    description: ${JSON.stringify((r.desc || "No description yet.").replace(/\s+/g, " ").slice(0, 240))},
    image: ${JSON.stringify(r.img)},
    url: ${JSON.stringify(r.url)},
  },`;
});

const banner = `// AUTO-GENERATED from Impact Radius Udemy catalog ("/home/josh/udemy catalog").
// Regenerate with: node scripts/import-udemy-catalog.mjs
// NOTE: instructor, rating & reviews are placeholders — the catalog feed has no such data.
import type { Course } from "./courses";

export const catalogCourses: Course[] = [
${courses.join("\n")}
];
`;

fs.writeFileSync(OUT, banner);
console.log(`Wrote ${courses.length} courses to ${OUT}`);
const counts = {};
for (const r of rows) {
  const hay = (r.cat + " " + r.name).toLowerCase();
  let catSlug = FALLBACK;
  for (const [re, slug] of RULES) {
    if (re.test(hay)) {
      catSlug = slug;
      break;
    }
  }
  counts[catSlug] = (counts[catSlug] || 0) + 1;
}
console.log("Category mapping:", JSON.stringify(counts));