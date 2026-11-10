# CourseDepth SEO & Keyword Map

Last updated: November 2026
Site: https://coursedepth.com
Language: English (single locale)

This is the working keyword plan for CourseDepth. It maps one primary keyword to each
indexable page, lists supporting keywords, and records the on-page elements that must
stay consistent. Update it whenever a new page or content cluster is added.

## 1. Positioning

CourseDepth is an **independent online course review and comparison site**. The core
promise is: public student ratings + review counts + last-update dates + editorial
pros/cons, with **no paid placement**.

Search intent we target:

1. **Comparison / commercial** — "best X course", "X course review", "X vs Y course".
2. **Trust / evaluation** — "are online courses worth it", "are course reviews fake",
   "are course certificates worth it".
3. **Transactional / deal** — "course vouchers", "Udemy deals", "certification exam vouchers".
4. **Navigational** — a specific course or instructor name.

We do **not** target generic "learn X" informational queries with thin content. Those
are covered by the category pages only when they contain real course data.

## 2. Page → keyword map

| Page | Primary keyword | Supporting keywords | Intent |
| --- | --- | --- | --- |
| `/` | online course reviews | best online courses 2026, course ratings, compare online courses, honest course reviews | Commercial |
| `/courses/` | all online courses A-Z | online course list, course catalogue, compare courses | Navigational |
| `/programming/` | online course categories | browse courses by topic, course subjects | Navigational |
| `/programming/{category}/` | best {category} courses | {category} course reviews, {category} certification course, {category} courses 2026 | Commercial |
| `/course/{slug}/` | {course title} review | {course} rating, is {course} worth it, {course} price | Commercial |
| `/vouchers/` | course vouchers | Udemy course deals, online course discounts, certification exam vouchers, course coupon codes | Transactional |
| `/instructors/` | best online course instructors | top Udemy instructors, course instructor reviews | Commercial |
| `/about-us/` | about CourseDepth | independent course reviews, who writes CourseDepth | Trust |
| `/how-we-rate-courses/` | how we rate courses | course review methodology, course ranking factors | Trust |
| `/how-to-choose-an-online-course/` | how to choose an online course | online course checklist, what to check before buying a course | Informational |
| `/are-udemy-courses-worth-it/` | are online courses worth it | are Udemy courses worth it, online course value | Informational |
| `/are-udemy-reviews-fake/` | are course reviews fake | are Udemy reviews fake, fake course reviews, bought reviews | Informational |
| `/udemy-certificate-worth-it/` | are course certificates worth it | are Udemy certificates worth it, online course certificate value | Informational |
| `/udemy-python-course-reviews/` | Udemy Python course reviews | best Python course Udemy, Python bootcamp reviews | Commercial |
| `/contact/` | contact CourseDepth | report wrong course price, course review correction | Navigational |

### Non-indexed pages

`/login/`, `/search/`, `/review-course/`, `/admin/` and empty category pages are
`noindex` and excluded from `sitemap.xml`. Do not add keywords to them.

## 3. Keyword clusters

### Cluster A — Course comparison (money pages)

- Primary: best {category} courses, {category} course reviews, {course} review.
- Supporting: {category} course ratings, {category} certification, {category} course 2026,
  is {course} worth it, {course} price, {course} pros and cons.
- Landing pages: `/programming/{category}/`, `/course/{slug}/`.
- Rule: the course title is the H1 and the first words of the title tag. The category
  name appears in the breadcrumb, the URL and the description.

### Cluster B — Trust and methodology

- Primary: how we rate courses, are online courses worth it, are course reviews fake,
  are course certificates worth it.
- Supporting: course review methodology, fake reviews, course certificate value,
  online course refund, course update date.
- Landing pages: `/how-we-rate-courses/`, `/are-udemy-courses-worth-it/`,
  `/are-udemy-reviews-fake/`, `/udemy-certificate-worth-it/`.
- Rule: every review page links back to `/how-we-rate-courses/` so the methodology
  page collects internal authority.

### Cluster C — Deals and vouchers

- Primary: course vouchers, online course deals.
- Supporting: Udemy course deals, course discount codes, certification exam vouchers,
  AWS exam voucher, Azure exam voucher, CompTIA exam voucher.
- Landing page: `/vouchers/`.
- Rule: never publish an invented coupon code. If a real code exists, add it to
  `codesBySlug` in `src/data/vouchers.ts`; otherwise the card says "No code needed".

### Cluster D — Beginner guides

- Primary: how to choose an online course, Udemy Python course reviews.
- Supporting: online course checklist, best Python bootcamp, Python course ratings.
- Landing pages: `/how-to-choose-an-online-course/`, `/udemy-python-course-reviews/`.

## 4. Title and meta rules

- Title: `Primary keyword | CourseDepth` or `Primary keyword — qualifier | CourseDepth`.
  Target 45–60 characters; never exceed ~68. Never duplicate a title.
- Meta description: 120–158 characters, include the primary keyword once and a concrete
  benefit or number. Never duplicate a description.
- H1: exactly one per page, close to the primary keyword but written for humans.
- Canonical: always self-referencing (`Layout.astro` handles it).
- Structured data: Organization + WebSite globally; Course + BreadcrumbList + FAQPage on
  course pages; CollectionPage + ItemList + FAQPage on category pages; Article +
  FAQPage + BreadcrumbList on guides; FAQPage + ItemList + BreadcrumbList on vouchers.
- Images: descriptive `alt`, width/height set, lazy loading below the fold. Course pages
  use the course cover as the Open Graph image.

## 5. Internal linking rules

1. Every course page links up to its category and across to 3 related courses.
2. Every category page links to its courses, 9 related categories and one buying guide.
3. Every guide links to `/how-we-rate-courses/` and to at least one category or course.
4. The homepage links to the 6 main guides plus the top categories and vouchers.
5. Footer links every guide and every legal page on every page.
6. Anchor text is descriptive: "best Python courses", not "click here".

## 6. Content gaps / next opportunities

These are not built yet; add them only when there is real data to back them up.

- `best-{category}-courses-2026` roundups for the categories with 5+ tracked courses.
- `{course-a}-vs-{course-b}` comparisons for the top search pairs.
- `udemy-vs-coursera` platform comparison.
- `is-{course}-worth-it` pages generated from the existing course FAQ data.
- A deals archive by category (e.g. `/vouchers/python/`) once voucher volume justifies it.

## 7. Measurement

- Google Search Console: watch impressions/clicks for the primary keywords above.
- Track affiliate clicks via the existing `affiliate_click` event in `Layout.astro`.
- Re-check titles/descriptions after adding courses: run `npx astro build` and confirm
  there are no duplicate titles or descriptions in the generated HTML.
