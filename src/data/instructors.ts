import { courses } from "./courses";

export interface Instructor {
  slug: string;
  name: string;
  courses: number;
  reviews: string;
  students: string;
  rating: number;
  emoji: string;
  gradient: string;
  specialty: string;
  /** Avatar: local path ("/images/instructors/my-avatar.jpg") or absolute URL ("https://…"). Defaults to "/images/instructors/<slug>.svg". */
  image?: string;
}

/** Info tambahan (foto, emoji, specialty) untuk instructor yang sudah dikenal. */
const meta: Record<string, Partial<Instructor>> = {
  "jose-portilla": { emoji: "🧑‍🏫", image: "https://img-c.udemycdn.com/user/200_H/9685726_67e7_4.jpg", specialty: "Python, SQL, Data" },
  "365-careers": { emoji: "📊", image: "https://img-c.udemycdn.com/user/200_H/8280056_7887_3.jpg", specialty: "Data, Finance, Excel" },
  "angela-yu": { emoji: "👩‍💻", image: "https://img-c.udemycdn.com/user/200_H/31334738_a13c_3.jpg", specialty: "Web Dev, iOS, Python" },
  "stephane-maarek": { emoji: "☁️", image: "https://img-c.udemycdn.com/user/200_H/16122994_284f_18.jpg", specialty: "AWS, Kafka, Cloud" },
  academind: { emoji: "⚛️", image: "https://img-c.udemycdn.com/user/200_H/13952972_e853.jpg", specialty: "React, Angular, Next.js" },
  "kyle-pew": { emoji: "📗", image: "https://img-c.udemycdn.com/user/200_H/16649710_ee35_3.jpg", specialty: "Excel, Office" },
  "maven-analytics": { emoji: "📈", image: "https://img-c.udemycdn.com/user/200_H/75004102_f8b0_2.jpg", specialty: "Power BI, SQL" },
  "colt-steele": { emoji: "🌐", image: "https://img-c.udemycdn.com/user/200_H/4466306_6fd8_3.jpg", specialty: "Web Dev, JS" },
};

const fmt = (n: number) => (n >= 1e6 ? `${+(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${+(n / 1e3).toFixed(0)}K` : String(n));
const slugify = (s: string) => String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "unknown";

/** Instruktur diturunkan langsung dari courses.json — kursus baru otomatis muncul di sini. */
export const instructors: Instructor[] = (() => {
  const map = new Map<string, Instructor>();
  for (const c of courses) {
    const slug = c.instructorSlug || slugify(c.instructor || "unknown");
    const rev = Number(c.reviews) || 0;
    const stu = Number(c.students) || 0;
    const rating = Number(c.rating) || 4.5;
    const m = meta[slug] ?? {};
    const cur = map.get(slug);
    if (cur) {
      const totalRating = cur.rating * cur.courses + rating;
      const totalReviews = Number(String(cur.reviews).replace(/[KM]/g, "")) * (String(cur.reviews).endsWith("M") ? 1e6 : String(cur.reviews).endsWith("K") ? 1e3 : 1) + rev;
      const totalStudents = Number(String(cur.students).replace(/[KM]/g, "")) * (String(cur.students).endsWith("M") ? 1e6 : String(cur.students).endsWith("K") ? 1e3 : 1) + stu;
      cur.courses += 1;
      cur.rating = +(totalRating / cur.courses).toFixed(1);
      cur.reviews = fmt(totalReviews);
      cur.students = fmt(totalStudents);
      continue;
    }
    map.set(slug, {
      slug,
      name: c.instructor || slug,
      courses: 1,
      reviews: fmt(rev),
      students: fmt(stu),
      rating: +rating.toFixed(1),
      emoji: m.emoji ?? "🎓",
      gradient: c.gradient ?? "linear-gradient(135deg,#4f8cff,#7a5cff)",
      specialty: m.specialty ?? c.category ?? "",
      image: c.instructorImage || m.image,
    });
  }
  const num = (s: string) => (s.endsWith("M") ? parseFloat(s) * 1e6 : s.endsWith("K") ? parseFloat(s) * 1e3 : parseFloat(s) || 0);
  return [...map.values()].sort((a, b) => num(b.students) - num(a.students));
})();
