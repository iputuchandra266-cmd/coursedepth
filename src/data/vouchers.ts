import { courses, type Course } from "./courses";

/**
 * A voucher is a course deal we can point readers to. Most provider discounts
 * are applied automatically through the outbound link, so `code` is optional.
 * Add real codes to `codesBySlug` when a provider gives us one — never invent
 * a code, because a broken code is worse than no code.
 */
export interface Voucher {
  id: string;
  course: Course;
  price: number;
  oldPrice?: number;
  /** Whole-number discount, 0 when the provider does not publish a was-price. */
  discount: number;
  /** Money saved in USD, 0 when unknown. */
  saving: number;
  code?: string;
  expires?: string;
}

/**
 * Udemy's official certification exam voucher page (affiliate links).
 * Both land on the same page; the second is used for the main banner CTA so
 * each placement can be tracked separately.
 */
export const certificationVoucherUrl =
  "https://trk.udemy.com/c/8130614/4052981/39854";
export const certificationVoucherUrlAlt =
  "https://trk.udemy.com/c/8130614/4052982/39854";

const codesBySlug: Record<string, string> = {
  // "example-course-slug": "REALCODE",
};

const expiryBySlug: Record<string, string> = {
  // "example-course-slug": "2026-12-31",
};

export const vouchers: Voucher[] = courses
  .filter((course) => typeof course.price === "number" && course.price > 0)
  .map((course) => {
    const price = Number(course.price);
    const oldPrice =
      typeof course.oldPrice === "number" && course.oldPrice > price
        ? course.oldPrice
        : undefined;
    const discount = oldPrice
      ? Math.round((1 - price / oldPrice) * 100)
      : 0;

    return {
      id: course.slug,
      course,
      price,
      oldPrice,
      discount,
      saving: oldPrice ? Number((oldPrice - price).toFixed(2)) : 0,
      code: codesBySlug[course.slug],
      expires: expiryBySlug[course.slug],
    };
  })
  .sort(
    (a, b) =>
      b.discount - a.discount ||
      b.course.rating - a.course.rating ||
      b.course.reviews - a.course.reviews,
  );

export const featuredVoucher = vouchers[0];

export const voucherStats = {
  total: vouchers.length,
  under20: vouchers.filter((v) => v.price < 20).length,
  maxDiscount: vouchers.reduce((max, v) => Math.max(max, v.discount), 0),
  rated45: vouchers.filter((v) => v.course.rating >= 4.5).length,
};
