import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { getSiteMedia } from "@/lib/media";
import { siteUrl } from "@/lib/site-url";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

/* Nunito қазақ әріптерін толық қолдайды: ә, ғ, қ, ң, ө, ұ, ү, һ, і */
const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-nunito",
  display: "swap",
});


const title = "TAIO — балалық шақтың бақытты мекені! | Ясли-бақша, Көктерек";
const description =
  "TAIO ясли-бақшасы — 1,5 жастан 6 жасқа дейінгі балаларға арналған жайлы әрі мейірімді балабақша. 3 топ, қазақ тілінде оқыту, 4 мезгіл тамақтану, дүйсенбі – жұма 08:00–18:00. Алматы облысы, Іле ауданы, Көктерек ауылы, Римова көшесі, 48.";

export async function generateMetadata(): Promise<Metadata> {
  const { hero, logo } = getSiteMedia();
  const icon = logo ?? "/favicon.svg";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: "TAIO",
    keywords: [
      "TAIO",
      "балабақша",
      "ясли-бақша",
      "детский сад",
      "ясли-сад",
      "Көктерек",
      "Іле ауданы",
      "Илийский район",
      "Алматы облысы",
      "қазақ тілді балабақша",
    ],
    alternates: { canonical: "/" },
    icons: { icon: [{ url: icon }], apple: [{ url: icon }] },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: "TAIO",
      locale: "kk_KZ",
      alternateLocale: ["ru_RU"],
      type: "website",
      ...(hero ? { images: [{ url: hero, alt: "TAIO балабақшасы" }] } : {}),
    },
    twitter: { card: hero ? "summary_large_image" : "summary", title, description },
    formatDetection: { telephone: false, address: false, email: false },
    other: { "color-scheme": "light only" },
  };
}

export const viewport: Viewport = {
  themeColor: "#BDE8F6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: "TAIO",
  legalName: "ТОО «Бай қонақ», ясли-сад «TAIO»",
  url: siteUrl,
  telephone: siteConfig.phones.map((p) => p.display),
  address: {
    "@type": "PostalAddress",
    streetAddress: "улица Римова, 48",
    addressLocality: "село Көктерек",
    addressRegion: "Алматинская область, Илийский район",
    addressCountry: "KZ",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: [siteConfig.instagram.url],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="kk"
      className={nunito.variable}
      style={{ colorScheme: "light", backgroundColor: "#ffffff" }}
      suppressHydrationWarning
    >
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
