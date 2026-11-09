# CourseDepth

Independent course reviews and price checks, built with Astro and deployed to GitHub Pages at **https://coursedepth.com**.

## Development

```sh
npm install
npm run dev        # http://localhost:4325
npm run admin      # http://localhost:4326 (local content dashboard)
npm run dev:stop
npm run dev:status
npm run dev:logs
```

> `npm run build` builds **and deploys** (commits + pushes to `main`). Use `npx astro build` when you only want to check the build locally.

## Analytics

The site ships with first-party affiliate-click tracking. Every outbound affiliate link is tagged with `data-course`, `data-provider` and `data-placement`, and the script in `src/layouts/Layout.astro` sends:

- `affiliate_click` — any link with `rel="sponsored"` or a known affiliate host (`trk.udemy.com`, etc.)
- `outbound_click` — any other external link

### Enable GA4

1. Create a GA4 property at <https://analytics.google.com/>.
2. Copy `.env.example` to `.env` and paste the measurement ID:

```sh
PUBLIC_GA_ID=G-XXXXXXXXXX
```

3. For production, add `PUBLIC_GA_ID` as a **repository variable** in GitHub: *Settings → Secrets and variables → Actions → Variables*. The deploy workflow passes it to the build. For local builds, put it in `.env`.

Events appear under **Reports → Engagement → Events** (`affiliate_click`), with `course_slug`, `provider` and `placement` parameters.

Until `PUBLIC_GA_ID` is set, events are pushed to `window.dataLayer` but no pageviews are recorded. You can also set `PUBLIC_ANALYTICS_ENDPOINT` to a JSON endpoint if you prefer a custom collector.

> The Impact affiliate script already tracks clicks on `trk.udemy.com` links in the Impact dashboard, so affiliate clicks are measurable there even before GA4 is configured.

## Content

- `src/data/courses.json` — course catalogue (single source of truth).
- `src/data/reviews.json` — editorial review notes used by the local admin. The public site does **not** display these as verbatim student reviews.
- `src/data/vouchers.ts` — deals are derived from courses that have a real `price`.

## Deploy

Push to `main`; GitHub Pages serves `dist/` via the `CNAME` file. The sitemap is regenerated on every build and excludes `login`, `search`, `review-course` and `admin`.
