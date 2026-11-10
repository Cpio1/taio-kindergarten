"use client";

import { Check, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Cloud, Moon, Star } from "./Decorations";
import { useLang } from "./LanguageProvider";
import Reveal from "./Reveal";

const themes = [
  { bg: "bg-sky", soft: "bg-sky-soft", text: "text-sky-darker", Deco: Cloud, deco: "#FFFFFF" },
  { bg: "bg-mint", soft: "bg-mint-soft", text: "text-mint-deep", Deco: Star, deco: "#FFFFFF" },
  { bg: "bg-butter", soft: "bg-butter-soft", text: "text-butter-deep", Deco: Moon, deco: "#FFFFFF" },
];

export default function Groups() {
  const { t } = useLang();

  return (
    <section
      id="groups"
      aria-labelledby="groups-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-white via-mint-soft/60 to-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker">{t.groups.kicker}</span>
          <h2 id="groups-title" className="section-title">
            {t.groups.title}
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-[1.05rem]">{t.groups.subtitle}</p>
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {t.groups.names.map((name, i) => {
            const th = themes[i];
            return (
              <Reveal as="li" key={name} delay={i * 0.08} className="h-full">
                <article className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className={`relative flex h-32 items-center justify-center ${th.bg}`}>
                    <th.Deco
                      className="animate-float absolute top-4 right-5 w-12 opacity-80"
                      color={th.deco}
                      style={{ animationDelay: `${-i * 2}s` }}
                    />
                    <Star className="absolute bottom-5 left-6 w-5 opacity-90" color="#FFFFFF" />
                    <span className="grid h-16 w-16 place-items-center rounded-[1.4rem] bg-white font-display text-2xl font-bold text-ink shadow-soft transition-transform duration-500 group-hover:rotate-6">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-ink">{name}</h3>
                    <ul className="mt-4 grid gap-2.5">
                      {t.groups.common.map((c) => (
                        <li key={c} className="flex items-center gap-2.5 text-[0.95rem] text-ink-soft">
                          <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${th.soft} ${th.text}`}>
                            <Check className="h-3.5 w-3.5" aria-hidden />
                          </span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4 rounded-[1.75rem] bg-white/80 px-6 py-5 text-center shadow-soft sm:flex-row sm:text-left">
          <p className="flex-1 text-[0.95rem] text-ink-soft">{t.groups.note}</p>
          <a href={siteConfig.phones[0].href} className="btn-primary shrink-0">
            <Phone className="h-4 w-4" aria-hidden />
            {siteConfig.phones[0].display}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
