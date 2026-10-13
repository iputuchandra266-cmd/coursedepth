import coursesData from "./courses.json";

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
}

/**
 * Single source of truth, editable through the local admin dashboard
 * (`astro dev` → http://localhost:4321/admin) which writes this JSON file.
 * Featured/unranked order matters: the homepage slices the first entries.
 */
export const courses: Course[] = coursesData as Course[];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function formatReviews(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return String(n);
}

export const providers = ["Udemy", "Coursera", "edX", "Udacity", "Pluralsight", "YouTube", "LinkedIn Learning"];
