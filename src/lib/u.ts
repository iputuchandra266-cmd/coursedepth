// Prefix internal URLs with the site base ("/" for the coursedepth.com custom domain).
const BASE: string = import.meta.env.BASE_URL;
export const u = (p: string = ""): string =>
  /^(https?:)?\/\//.test(p) || p.startsWith("data:") ? p : `${BASE}${p.replace(/^\/+/, "")}`;
