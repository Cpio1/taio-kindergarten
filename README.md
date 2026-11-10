# TAIO — ясли-бақша лендингі

Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · ҚАЗ / РУС · әрқашан ашық тема.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production сборка
```

## Файлдарды қосу (`public/images`)

Файлдар build кезінде автоматты түрде табылады; жоқ файлдар үшін бос/сынған блок көрсетілмейді.
Файл қосқаннан кейін сайтты қайта жариялаңыз (Vercel-ге push / redeploy).

| Файл | Қайда шығады |
|---|---|
| `main-page.jpg` (.png/.webp) | Басты экран (Hero) + Open Graph суреті |
| `main-page2.mp4` (.webm/.mov) | «Біз туралы» бөліміндегі бейне |
| `logo.png` (.svg/.webp/.jpg) | Шапка, футер, favicon |
| `food-*.jpg` | «Тамақтану» бөлімі (ең көбі 4) |
| кез келген басқа сурет | Галерея (алғашында 6, қалғаны «Көбірек көрсету» арқылы) |

## Баптаулар — `lib/site-config.ts`

- `DOCUMENTS_URL` — Google Drive папкасының жария сілтемесі. Бос болса, батырма көрсетілмейді.
- `TWO_GIS_URL` — 2GIS-тегі балабақша карточкасының сілтемесі (бос болса, мекенжай бойынша іздеу ашылады).
- `TWO_GIS_EMBED_URL` — 2GIS карта виджетінің iframe `src` мәні. Орналасуы расталғаннан кейін ғана қойыңыз.

Мәтіндер (қазақша және орысша) — `lib/i18n.ts`.

## Vercel

Жобаны Vercel-ге импорттаңыз (Framework: Next.js, қосымша баптаусыз).
Өз доменіңіз болса, `NEXT_PUBLIC_SITE_URL=https://domain.kz` айнымалысын қосыңыз (SEO, sitemap үшін).
