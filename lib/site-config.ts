/**
 * TAIO балабақшасының негізгі деректері.
 * Барлық тұрақты ақпарат (телефон, мекенжай, сілтемелер) осы жерде өзгертіледі.
 */

/**
 * Құжаттар салынған Google Drive папкасының ЖАРИЯ сілтемесі.
 * Google Drive → папка → «Поделиться» → «Все, у кого есть ссылка» → сілтемені көшіріп қойыңыз.
 * Бос тұрса, «Құжаттар» бөлімінде батырма көрсетілмейді.
 * Мысал: "https://drive.google.com/drive/folders/XXXXXXXXXXXX"
 */
export const DOCUMENTS_URL: string = "";

/**
 * 2GIS картасы.
 * Нақты орналасуы расталғаннан кейін 2GIS-тегі балабақша карточкасының сілтемесін
 * немесе виджет конструкторынан алынған iframe src мәнін қойыңыз.
 * - TWO_GIS_URL: «2GIS-те ашу» батырмасы (бос болса, мекенжай бойынша іздеу ашылады)
 * - TWO_GIS_EMBED_URL: карта виджетінің iframe src (бос болса, карта ендірілмейді)
 * Кездейсоқ координаттарды қоймаңыз.
 */
export const TWO_GIS_URL: string = "";
export const TWO_GIS_EMBED_URL: string = "";

const phones = [
  { display: "+7 707 246 83 11", href: "tel:+77072468311" },
  { display: "+7 705 505 33 07", href: "tel:+77055053307" },
] as const;

export const siteConfig = {
  name: "TAIO",
  whatsapp: "https://wa.me/77072468311",
  phones,
  instagram: {
    handle: "@sadik_taio",
    url: "https://www.instagram.com/sadik_taio/",
  },
  hours: "08:00–18:00",
  /** 2GIS-те мекенжай бойынша іздеу (координаттарсыз) */
  twoGisSearch: `https://2gis.kz/almaty/search/${encodeURIComponent("Көктерек, улица Римова, 48")}`,
} as const;

export const twoGisLink = TWO_GIS_URL || siteConfig.twoGisSearch;
