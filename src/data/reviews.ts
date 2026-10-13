import raw from "./reviews.json";

export interface Review {
  id: string;
  slug: string; // course slug
  author: string;
  rating: number; // 1–5, halves allowed
  title: string;
  body: string;
  pros: string[];
  cons: string[];
  level: string;
  date: string; // YYYY-MM-DD
  helpful: number;
  subRatings?: { content?: number; instructor?: number; value?: number; ease?: number };
}

type Store = Record<string, Omit<Review, "slug">[]>;

/** reviews.json is keyed by course slug; flatten for easy lookup. */
export const reviews: Review[] = Object.entries(raw as Store).flatMap(([slug, list]) =>
  list.map((r) => ({ ...r, slug }))
);

export const reviewsFor = (slug: string): Review[] =>
  (raw as Store)[slug]?.slice().sort((a, b) => (a.date < b.date ? 1 : -1)) ?? [];

export const avg = (nums: number[]): number =>
  nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
