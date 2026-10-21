import coursesData from "./courses.json";
import { autofill } from "../../scripts/course-autofill.mjs";

export interface Course {
  slug: string;
  title: string;
  provider: string;
  category: string;
  categorySlug: string;
  instructor: string;
  instructorSlug: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  level: string;
  duration: string;
  updated: string;
  gradient?: string;
  emoji?: string;
  bestseller?: boolean;
  description: string;
  /** Cover image: local path ("/images/courses/my-course.jpg") or absolute URL ("https://…"). Defaults to "/images/courses/<slug>.svg". */
  image?: string;
  /** Outbound course URL (e.g. the Udemy landing/affiliate link). Omit if unavailable. */
  url?: string;
  language?: string;
  certificate?: boolean;
  students?: number;
  sections?: number;
  lectures?: number;
  access?: string;
  moneyBack?: boolean;
  learn?: string[];
  curriculum?: { title: string; lectures: number; duration: string }[];
  summary?: string;
  pros?: string[];
  cons?: string[];
  bestFor?: string;
  skipIf?: string;
  suits?: string;
  requirements?: string;
  quality?: { content?: number; video?: number; instructor?: number; pace?: number; depth?: number; total?: number };
  ratingBreakdown?: Record<string, number>;
  instructorBio?: string;
  faq?: { q: string; a: string }[];
}

/**
 * Single source of truth, editable through the local admin dashboard
 * (`npm run admin` → http://localhost:4325/admin) which writes this JSON file.
 * Featured/unranked order matters: the homepage slices the first entries.
 */
export const courses: Course[] = (coursesData as Course[]).map((c) => autofill(c) as Course);

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function formatReviews(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return String(n);
}

export const providers = ["Udemy", "Coursera", "edX", "Udacity", "Pluralsight", "YouTube", "LinkedIn Learning"];
