"use client";

import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LANGS } from "@/lib/i18n";
import Brand from "./Brand";
import { useLang } from "./LanguageProvider";

const NAV_IDS = ["home", "about", "groups", "food", "gallery", "documents", "contacts"] as const;

function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t.langSwitch} className={`flex rounded-full bg-sky-soft p-1 ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          aria-label={l.full}
          className={`min-h-9 rounded-full px-3 text-xs font-extrabold tracking-wide transition-colors ${
            lang === l.code ? "bg-white text-sky-darker shadow-sm" : "text-ink-soft hover:text-ink"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export default function Header({ logo }: { logo: string | null }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-[1.5rem] border px-3 py-2 backdrop-blur-xl transition-all duration-300 sm:px-4 ${
          scrolled || open ? "border-white bg-white/85 shadow-soft" : "border-white/60 bg-white/55"
        }`}
      >
        <a href="#home" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Brand logo={logo} size={40} />
          <span className="font-display text-lg font-bold tracking-wide text-ink">TAIO</span>
        </a>

        <nav aria-label={t.mainMenu} className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`rounded-full px-3 py-2 text-[0.88rem] font-semibold transition-colors ${
                    active === id ? "bg-sky-soft text-sky-darker" : "text-ink-soft hover:bg-sky-soft/70 hover:text-ink"
                  }`}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch />
          <a href="#contacts" className="btn-primary hidden min-h-10! px-4! py-2! text-sm! xl:inline-flex">
            <Phone className="h-4 w-4" aria-hidden />
            {t.contactBtn}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.menuClose : t.menuOpen}
            className="grid h-11 w-11 place-items-center rounded-2xl bg-sky-soft text-sky-darker transition hover:bg-sky lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-6xl overflow-y-auto rounded-[1.5rem] border border-white bg-white/95 p-2.5 shadow-lift backdrop-blur-xl lg:hidden"
      >
        <nav aria-label={t.mainMenu}>
          <ul className="grid gap-0.5">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-[0.95rem] font-semibold transition-colors ${
                    active === id ? "bg-sky-soft text-sky-darker" : "text-ink hover:bg-sky-soft/60"
                  }`}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contacts" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
            <Phone className="h-4 w-4" aria-hidden />
            {t.contactBtn}
          </a>
        </nav>
      </div>
    </header>
  );
}
