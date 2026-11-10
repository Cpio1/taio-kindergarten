"use client";

import { Clock, Languages, Soup, Users, Baby } from "lucide-react";
import type { SiteMedia } from "@/lib/media";
import { Cloud, Sparkle, Star } from "./Decorations";
import { useLang } from "./LanguageProvider";
import Reveal from "./Reveal";

const icons = [Users, Baby, Languages, Soup, Clock];
const tones = [
  "bg-sky-soft text-sky-darker",
  "bg-mint-soft text-mint-deep",
  "bg-butter-soft text-butter-deep",
  "bg-mint-soft text-mint-deep",
  "bg-sky-soft text-sky-darker",
];

export default function About({ video }: { video: SiteMedia["video"] }) {
  const { t } = useLang();

  return (
    <section id="about" aria-labelledby="about-title" className="relative isolate overflow-hidden py-16 sm:py-24">
      <Cloud className="animate-float-slow absolute top-10 right-[4%] -z-10 w-28" color="#E6F6FC" />
      <Sparkle className="absolute bottom-12 left-[5%] -z-10 w-6 opacity-70" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className={`grid items-center gap-10 ${video ? "lg:grid-cols-2 lg:gap-14" : ""}`}>
          <Reveal className={video ? "text-center lg:text-left" : "mx-auto max-w-3xl text-center"}>
            <span className="kicker">{t.about.kicker}</span>
            <h2 id="about-title" className="section-title">
              {t.about.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-[1.05rem]">{t.about.p1}</p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-[1.05rem]">{t.about.p2}</p>
          </Reveal>

          {video && (
            <Reveal from="scale" className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="absolute -inset-3 -z-10 -rotate-2 rounded-[2.5rem] bg-sky" />
              <video
                className="aspect-video w-full rounded-[2.25rem] border-4 border-white bg-sky-soft object-cover shadow-lift"
                controls
                playsInline
                preload="metadata"
                aria-label={t.about.videoLabel}
              >
                <source src={video.src} type={video.type} />
              </video>
              <Star className="animate-float absolute -top-4 -left-3 w-9" />
            </Reveal>
          )}
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {t.about.cards.map((c, i) => {
            const Icon = icons[i];
            return (
              <Reveal
                as="li"
                key={i}
                delay={i * 0.06}
                className={`card flex flex-col items-center p-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lift ${
                  i === 4 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tones[i]}`}>
                  <Icon className="h-5.5 w-5.5" aria-hidden />
                </span>
                <p className="mt-3 font-display text-[1.05rem] leading-snug font-bold text-ink">{c.value}</p>
                <p className="mt-1 text-sm text-ink-soft">{c.label}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
