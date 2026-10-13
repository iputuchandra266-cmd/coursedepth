// Isi otomatis field editorial untuk kursus baru / yang belum lengkap.
const rnd = (seed) => { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
const hash = (str) => [...String(str)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7);
const hoursOf = (d) => { const m = String(d).match(/([\d.]+)\s*h/); return m ? parseFloat(m[1]) : 8; };
const empty = (v) => v === undefined || v === null || v === "" || (Array.isArray(v) && !v.length);

export function autofill(c) {
  if (!c || !c.slug) return c;
  const r = rnd(Math.abs(hash(c.slug)));
  const H = hoursOf(c.duration);
  const rating = Number(c.rating) || 4.5;
  const reviews = Number(c.reviews) || 500;
  const cat = c.category || "online courses";
  const inst = c.instructor || "the instructor";
  const prov = c.provider || "Udemy";

  if (empty(c.instructorSlug)) c.instructorSlug = String(c.instructor || "unknown").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "unknown";
  if (empty(c.language)) c.language = "English";
  if (empty(c.certificate)) c.certificate = true;
  if (empty(c.students)) c.students = Math.round(reviews * (1.4 + r() * 0.8));
  if (empty(c.sections)) c.sections = Math.max(4, Math.min(20, Math.round(H / 3.5) + 3));
  if (empty(c.lectures)) c.lectures = Math.max(20, Math.round(H * (3 + r())));
  if (empty(c.access)) c.access = "Lifetime access";
  if (empty(c.moneyBack)) c.moneyBack = true;
  if (c.level === "beginner") c.level = "Beginner";

  if (empty(c.learn)) c.learn = [
    `Core ${cat} fundamentals with ${inst}'s step-by-step method`,
    `Real-world ${cat} projects you can add to a portfolio`,
    "Practical workflows and best practices used on the job",
    `How to troubleshoot and debug ${cat} problems on your own`,
  ];
  if (empty(c.curriculum) || new Set((c.curriculum||[]).map(s=>s.lectures+"|"+s.duration)).size === 1) {
    const titles = ["Getting started", "Core foundations", "Building real projects", "Intermediate techniques", "Deep dive & best practices", "Capstone project", "Next steps"];
    const n = Math.max(1, Math.min(c.sections || 7, titles.length));
    const totalLectures = c.lectures || n * 10;
    const w = titles.slice(0, n).map((_, i) => 0.7 + r() * 0.6);
    const wSum = w.reduce((a, b) => a + b, 0);
    let leftL = totalLectures, leftH = H;
    c.curriculum = titles.slice(0, n).map((t, i) => {
      const last = i === n - 1;
      const lectures = last ? Math.max(1, leftL) : Math.max(1, Math.round((totalLectures * w[i]) / wSum));
      const hours = last ? Math.max(0.3, +leftH.toFixed(1)) : Math.max(0.3, +((H * w[i]) / wSum).toFixed(1));
      leftL -= lectures; leftH = +(leftH - hours).toFixed(1);
      return { title: t, lectures, duration: `${hours}h` };
    });
  }
  if (empty(c.summary)) c.summary = `${c.title || "This course"} is a ${String(c.level || "beginner").toLowerCase()} ${cat} course from ${inst} on ${prov}. It runs about ${String(c.duration || `${H}h`).replace(" total", "")}, and holds ${rating}★ from ${reviews.toLocaleString()} students in our Udemy course reviews.`;
  if (empty(c.pros)) c.pros = ["Clear explanations that start from zero", "Hands-on exercises after every major topic", `Fresh ${c.updated || "2026"} content and lifetime access`];
  if (empty(c.cons)) c.cons = ["Pace accelerates in the middle sections", "Limited advanced, production-scale projects", H < 10 ? "Short — best as a supplement, not a full path" : "Long: budget several weeks to finish"];
  if (empty(c.bestFor)) c.bestFor = `${String(c.level || "beginner").toLowerCase()} learners who want one guided path through ${cat}`;
  if (empty(c.skipIf)) c.skipIf = `You already work professionally in ${cat} and need advanced architecture patterns`;
  if (empty(c.suits)) c.suits = "Complete beginners, career switchers, and self-taught devs who want structure";
  if (empty(c.requirements)) c.requirements = "A computer with internet. No prior experience needed.";
  if (empty(c.quality)) {
    const q = (base, spread) => Math.max(3, Math.min(5, +(base + (r() - 0.45) * spread).toFixed(1)));
    c.quality = { content: q(rating, 0.5), video: q(rating, 0.4), instructor: q(rating, 0.35), pace: q(rating, 0.6), depth: q(rating, 0.7) };
    c.quality.total = Math.round(((c.quality.content + c.quality.video + c.quality.instructor + c.quality.pace + c.quality.depth) / 5) * 20);
  }
  const bdEmpty = !c.ratingBreakdown || typeof c.ratingBreakdown !== "object" || Object.values(c.ratingBreakdown).every(v => !Number(v));
  if (bdEmpty) {
    const p5 = Math.round(Math.max(45, Math.min(88, (rating - 2.6) * 55)));
    const p4 = Math.round((100 - p5) * 0.55);
    const p3 = Math.round((100 - p5 - p4) * 0.6);
    const p2 = Math.round((100 - p5 - p4 - p3) * 0.6);
    c.ratingBreakdown = { 5: p5, 4: p4, 3: p3, 2: p2, 1: 100 - p5 - p4 - p3 - p2 };
  }
  if (empty(c.instructorBio)) c.instructorBio = `${inst} teaches ${cat} on ${prov} with a practical, project-first style.`;
  if (empty(c.faq)) c.faq = [
    { q: `Is ${c.title || "this course"} suitable for beginners?`, a: `Yes — it is rated "${c.level || "Beginner"}" and starts from the fundamentals, though beginners should budget extra time for the practice exercises.` },
    { q: "How often is the course updated?", a: `Last updated ${c.updated || "recently"}. Lifetime access means future refreshes are included at no extra cost.` },
    { q: "Is it worth the price?", a: `At $${c.price ?? 0} with a ${rating}★ average from ${reviews.toLocaleString()} students, our Udemy course reviews put it above most ${cat} alternatives.` },
  ];
  return c;
}
