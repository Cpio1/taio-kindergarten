"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Camera, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "@/lib/site-config";
import { Cloud, InstagramIcon, Sparkle, Star } from "./Decorations";
import { useLang } from "./LanguageProvider";
import Reveal from "./Reveal";

const INITIAL_COUNT = 6;
const tiles = ["bg-sky", "bg-mint", "bg-butter"];

export default function Gallery({ images }: { images: string[] }) {
  const { t } = useLang();
  const [showAll, setShowAll] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const visible = showAll ? images : images.slice(0, INITIAL_COUNT);
  const hasMore = images.length > INITIAL_COUNT;

  const close = useCallback(() => {
    setCurrent(null);
    lastTrigger.current?.focus();
  }, []);
  const next = useCallback(() => setCurrent((c) => (c === null ? c : (c + 1) % images.length)), [images.length]);
  const prev = useCallback(
    () => setCurrent((c) => (c === null ? c : (c - 1 + images.length) % images.length)),
    [images.length],
  );

  const isOpen = current !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Tab" && dialog.current) {
        const items = dialog.current.querySelectorAll<HTMLElement>("button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, next, prev]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-white via-sky-soft/70 to-white py-16 sm:py-24"
    >
      <Cloud className="animate-float-slow absolute top-14 -left-8 -z-10 w-32" />
      <Star className="animate-twinkle absolute right-[7%] bottom-14 -z-10 w-7" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker bg-white!">
            <Camera className="h-3.5 w-3.5" aria-hidden />
            {t.gallery.kicker}
          </span>
          <h2 id="gallery-title" className="section-title">
            {t.gallery.title}
          </h2>
          <p className="mt-3 text-base text-ink-soft sm:text-[1.05rem]">{t.gallery.subtitle}</p>
        </Reveal>

        {images.length === 0 ? (
          <Reveal from="scale" className="mx-auto mt-10 max-w-lg">
            <div className="relative overflow-hidden rounded-[2rem] bg-white px-6 py-12 text-center shadow-soft">
              <Sparkle className="absolute top-6 left-8 w-6" />
              <Star className="animate-float absolute right-8 bottom-8 w-7" />
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-[1.4rem] bg-sky-soft text-sky-darker">
                <Camera className="h-7 w-7" aria-hidden />
              </span>
              <p className="mt-4 font-display text-lg font-bold text-ink">{t.gallery.empty}</p>
              <p className="mt-2 text-[0.95rem] text-ink-soft">{t.gallery.emptyHint}</p>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-6"
              >
                <InstagramIcon className="h-4 w-4" aria-hidden />
                {siteConfig.instagram.handle}
              </a>
            </div>
          </Reveal>
        ) : (
          <>
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5">
              {visible.map((src, i) => (
                <Reveal as="li" key={src} from="scale" delay={(i % INITIAL_COUNT) * 0.05}>
                  <button
                    type="button"
                    onClick={(e) => {
                      lastTrigger.current = e.currentTarget;
                      setCurrent(i);
                    }}
                    className={`group relative block aspect-[4/3.6] w-full overflow-hidden rounded-[1.5rem] shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-lift sm:rounded-[1.75rem] ${
                      tiles[i % tiles.length]
                    }`}
                    aria-label={t.gallery.open(i + 1)}
                  >
                    <Image
                      src={src}
                      alt={t.gallery.alt(i + 1)}
                      fill
                      sizes="(min-width: 1152px) 370px, (min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20">
                      <span className="grid h-11 w-11 scale-75 place-items-center rounded-full bg-white/95 text-sky-darker opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
                        <Expand className="h-5 w-5" aria-hidden />
                      </span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </ul>

            {hasMore && (
              <div className="mt-9 flex justify-center">
                <button type="button" onClick={() => setShowAll((v) => !v)} className="btn-primary" aria-expanded={showAll}>
                  {showAll ? t.gallery.less : t.gallery.more}
                  {!showAll && (
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">+{images.length - INITIAL_COUNT}</span>
                  )}
                  {showAll ? <ChevronUp className="h-4 w-4" aria-hidden /> : <ChevronDown className="h-4 w-4" aria-hidden />}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {mounted &&
        createPortal(
      <AnimatePresence>
        {current !== null && (
          <motion.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label={t.gallery.viewer}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-3 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
              touchX.current = null;
            }}
          >
            <motion.div
              key={current}
              className="relative h-[78dvh] w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src={images[current]}
                alt={t.gallery.alt(current + 1)}
                fill
                sizes="100vw"
                className="rounded-2xl object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white">
              {current + 1} / {images.length}
            </p>

            <button
              ref={closeBtn}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label={t.gallery.close}
              className="absolute top-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-lift transition hover:scale-105"
            >
              <X className="h-6 w-6" aria-hidden />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label={t.gallery.prev}
                  className="absolute top-1/2 left-2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lift transition hover:bg-white sm:left-6 sm:h-12 sm:w-12"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label={t.gallery.next}
                  className="absolute top-1/2 right-2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lift transition hover:bg-white sm:right-6 sm:h-12 sm:w-12"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
