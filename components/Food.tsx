"use client";

import Image from "next/image";
import { MessageCircle, Soup } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Sparkle, Star } from "./Decorations";
import { useLang } from "./LanguageProvider";
import Reveal from "./Reveal";

const dotColors = ["bg-sky", "bg-mint", "bg-butter", "bg-sky"];

export default function Food({ images }: { images: string[] }) {
  const { t } = useLang();
  const photos = images.slice(0, 4);

  return (
    <section id="food" aria-labelledby="food-title" className="relative isolate overflow-hidden py-16 sm:py-24">
      <Sparkle className="animate-twinkle absolute top-16 right-[8%] -z-10 w-6" color="#FFD27A" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className={`grid items-center gap-10 ${photos.length ? "lg:grid-cols-[1fr_1.1fr] lg:gap-14" : ""}`}>
          <Reveal
            className={`relative overflow-hidden rounded-[2.25rem] bg-butter-soft p-7 sm:p-10 ${
              photos.length ? "" : "mx-auto w-full max-w-3xl"
            }`}
          >
            <Star className="absolute -top-3 -right-3 w-20 opacity-60" color="#FFE6AE" />
            <div className={`flex flex-col gap-7 ${photos.length ? "" : "sm:flex-row sm:items-center"}`}>
              <div className="flex shrink-0 items-center gap-4">
                <span className="relative grid h-24 w-24 place-items-center rounded-full bg-white shadow-soft">
                  <span className="font-display text-5xl font-bold text-butter-deep">4</span>
                  <Soup className="absolute -right-1 -bottom-1 h-9 w-9 rounded-full bg-butter p-1.5 text-ink" aria-hidden />
                </span>
                <div aria-hidden className="flex gap-1.5">
                  {dotColors.map((c, i) => (
                    <span key={i} className={`h-3 w-3 rounded-full ${c}`} />
                  ))}
                </div>
              </div>
              <div className={photos.length ? "" : "text-center sm:text-left"}>
                <span className="kicker bg-white!">{t.food.kicker}</span>
                <h2 id="food-title" className="section-title">
                  {t.food.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-[1.05rem]">{t.food.text}</p>
                <p className="mt-2 text-[0.95rem] text-ink-soft">{t.food.note}</p>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp mt-6"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {t.food.ask}
                </a>
              </div>
            </div>
          </Reveal>

          {photos.length > 0 && (
            <ul className={`grid gap-3 sm:gap-4 ${photos.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
              {photos.map((src, i) => (
                <Reveal
                  as="li"
                  key={src}
                  from="scale"
                  delay={i * 0.07}
                  className={`relative overflow-hidden rounded-[1.75rem] bg-butter-soft shadow-soft ${
                    photos.length === 3 && i === 0 ? "col-span-2 aspect-[2/1]" : photos.length === 1 ? "aspect-[4/3]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={src}
                    alt={t.food.imageAlt(i + 1)}
                    fill
                    sizes="(min-width: 1024px) 300px, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
