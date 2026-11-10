"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import Brand from "./Brand";
import { Cloud, Moon, Sparkle, Star } from "./Decorations";
import { useLang } from "./LanguageProvider";

export default function Hero({ image, logo }: { image: string | null; logo: string | null }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-sky-soft via-white to-white pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* Декор */}
      <Cloud className="animate-drift absolute top-24 -left-10 -z-10 w-36 opacity-90 sm:w-48" />
      <Cloud className="animate-drift absolute top-40 right-[-3rem] -z-10 w-40 opacity-80 [animation-delay:-6s] sm:w-56" />
      <Star className="animate-twinkle absolute top-32 left-[46%] -z-10 hidden w-6 lg:block" />
      <Sparkle className="animate-twinkle absolute bottom-16 left-[8%] -z-10 w-5 [animation-delay:-1.4s]" />
      <div className="absolute bottom-0 left-1/2 -z-20 h-48 w-[110%] -translate-x-1/2 rounded-[50%] bg-mint-soft opacity-80 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div className="text-center lg:text-left">
          <motion.p {...fade(0)} className="kicker">
            <Star className="h-3.5 w-3.5" color="#E8A93A" />
            {t.hero.badge}
          </motion.p>

          <motion.h1
            {...fade(0.08)}
            id="hero-title"
            className="mt-5 text-[2rem] leading-[1.15] font-bold text-ink sm:text-[2.6rem] lg:text-[3.1rem]"
          >
            <span className="text-sky-deep">{t.hero.titleLead}</span> — {t.hero.title}
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg lg:mx-0"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            {...fade(0.24)}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
          >
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle className="h-4.5 w-4.5" aria-hidden />
              {t.hero.signUp}
            </a>
            <a href="#about" className="btn-ghost">
              {t.hero.aboutBtn}
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
          </motion.div>

          <motion.ul {...fade(0.32)} className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
            {t.hero.chips.map((c, i) => (
              <li
                key={c}
                className={`rounded-full px-3.5 py-1.5 text-sm font-bold text-ink ${
                  ["bg-sky", "bg-mint", "bg-butter"][i % 3]
                }`}
              >
                {c}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-3 -z-10 rotate-3 rounded-[2.75rem] bg-butter sm:-inset-4" />
          <div className="absolute -inset-3 -z-10 -rotate-2 rounded-[2.75rem] bg-mint/70 sm:-inset-4" />
          <div className="relative aspect-[4/3.4] overflow-hidden rounded-[2.5rem] border-4 border-white bg-sky shadow-lift">
            {image ? (
              <Image
                src={image}
                alt={t.hero.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 540px, (min-width: 640px) 448px, 92vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-sky via-sky-soft to-mint">
                <Cloud className="absolute top-8 left-6 w-28" />
                <Cloud className="absolute right-6 bottom-10 w-24 opacity-90" />
                <Moon className="absolute top-8 right-10 w-10" />
                <Star className="animate-twinkle absolute bottom-14 left-12 w-7" />
                <Sparkle className="absolute top-1/3 right-1/4 w-5" color="#FFFFFF" />
                <div className="flex flex-col items-center gap-3">
                  <span className="grid h-28 w-28 place-items-center rounded-[2rem] bg-white/80 shadow-soft">
                    <Brand logo={logo} size={84} />
                  </span>
                  <span className="font-display text-3xl font-bold tracking-widest text-ink">TAIO</span>
                </div>
              </div>
            )}
          </div>
          <Star className="animate-float absolute -top-5 -right-2 w-10 sm:w-12" />
          <Sparkle className="animate-twinkle absolute -bottom-4 -left-3 w-7" color="#7CC9E6" />
        </motion.div>
      </div>
    </section>
  );
}
