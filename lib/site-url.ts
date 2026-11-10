/**
 * Сайттың толық адресі (SEO, Open Graph, sitemap үшін).
 * Өз доменіңіз болса, Vercel-де NEXT_PUBLIC_SITE_URL айнымалысын орнатыңыз,
 * әйтпесе Vercel-дің production адресі автоматты түрде алынады.
 */
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");

export const siteUrl = (fromEnv || "http://localhost:3000").replace(/\/$/, "");
