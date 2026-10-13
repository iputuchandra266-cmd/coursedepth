// @ts-check
import { defineConfig } from 'astro/config';
import coursesAdminApi from './scripts/courses-admin-api.mjs';
import sitemap from './scripts/sitemap.mjs';

// https://astro.build/config
export default defineConfig({
  site: "https://coursedepth.com",
  base: "/",
  integrations: [coursesAdminApi(), sitemap()],
});
