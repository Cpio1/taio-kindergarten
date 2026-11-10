import fs from "node:fs";
import path from "node:path";

/**
 * Файлдарды build кезінде public/ ішінен іздейді.
 * Тек шынымен бар файлдар қолданылады — бос немесе сынған карточкалар болмайды.
 *
 * public/images/main-page.(jpg|png|webp)   — басты экран суреті
 * public/images/main-page2.(mp4|webm|mov)  — «Біз туралы» бейнесі
 * public/images/logo.(svg|png|webp|jpg)    — логотип (шапка + favicon)
 * public/images/food-*.(jpg|png|webp)      — «Тамақтану» бөлімінің суреттері
 * public/images/* (қалғандары)              — галерея
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;
const VIDEO_EXT = /\.(mp4|webm|mov)$/i;
const LOGO_EXT = /\.(svg|png|webp|jpe?g)$/i;

export type SiteMedia = {
  hero: string | null;
  video: { src: string; type: string } | null;
  logo: string | null;
  food: string[];
  gallery: string[];
};

const base = (file: string) => file.replace(/\.[^.]+$/, "").toLowerCase();

function list(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => !f.startsWith("."))
      .filter((f) => {
        try {
          return fs.statSync(path.join(dir, f)).isFile();
        } catch {
          return false;
        }
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  } catch {
    return [];
  }
}

const url = (prefix: string, file: string) => `${prefix}/${encodeURIComponent(file)}`;

const videoType = (file: string) => {
  const ext = file.split(".").pop()?.toLowerCase();
  return ext === "webm" ? "video/webm" : ext === "mov" ? "video/quicktime" : "video/mp4";
};

let cache: SiteMedia | null = null;

export function getSiteMedia(): SiteMedia {
  if (cache && process.env.NODE_ENV === "production") return cache;

  const files = list(IMAGES_DIR);
  const rootFiles = list(PUBLIC_DIR);

  const findIn = (names: string[], ext: RegExp) => {
    for (const name of names) {
      const f = files.find((x) => base(x) === name && ext.test(x));
      if (f) return url("/images", f);
      const r = rootFiles.find((x) => base(x) === name && ext.test(x));
      if (r) return url("", r);
    }
    return null;
  };

  const hero = findIn(["main-page"], IMAGE_EXT);
  const logo = findIn(["logo"], LOGO_EXT);

  const videoFile =
    files.find((f) => base(f) === "main-page2" && VIDEO_EXT.test(f)) ??
    rootFiles.find((f) => base(f) === "main-page2" && VIDEO_EXT.test(f));
  const video = videoFile
    ? {
        src: files.includes(videoFile) ? url("/images", videoFile) : url("", videoFile),
        type: videoType(videoFile),
      }
    : null;

  const reserved = new Set(["main-page", "main-page2", "logo"]);
  const images = files.filter((f) => IMAGE_EXT.test(f) && !reserved.has(base(f)));
  const isFood = (f: string) => /^(food|tamaq|pitanie)/i.test(f);

  cache = {
    hero,
    video,
    logo,
    food: images.filter(isFood).map((f) => url("/images", f)),
    gallery: images.filter((f) => !isFood(f)).map((f) => url("/images", f)),
  };
  return cache;
}
