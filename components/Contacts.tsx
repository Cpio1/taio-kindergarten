"use client";

import { Clock, ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig, TWO_GIS_EMBED_URL, twoGisLink } from "@/lib/site-config";
import { Cloud, InstagramIcon, Star } from "./Decorations";
import { useLang } from "./LanguageProvider";
import Reveal from "./Reveal";

function Row({ icon, label, tone, children }: { icon: ReactNode; label: string; tone: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${tone}`}>{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-bold tracking-wide text-ink-soft uppercase">{label}</p>
        <div className="mt-1 text-[0.98rem] leading-relaxed text-ink">{children}</div>
      </div>
    </div>
  );
}

export default function Contacts() {
  const { t } = useLang();
  const hasEmbed = TWO_GIS_EMBED_URL.trim().length > 0;

  return (
    <section
      id="contacts"
      aria-labelledby="contacts-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-white to-sky-soft py-16 sm:py-24"
    >
      <Cloud className="animate-drift absolute bottom-10 -left-10 -z-10 w-40" />
      <Star className="animate-twinkle absolute top-16 right-[6%] -z-10 w-7" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker">{t.contacts.kicker}</span>
          <h2 id="contacts-title" className="section-title">
            {t.contacts.title}
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-[1.05rem]">{t.contacts.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal from="left" className="card p-6 sm:p-8">
            <address className="grid gap-6 not-italic">
              <Row icon={<MapPin className="h-5 w-5" aria-hidden />} label={t.contacts.address} tone="bg-sky-soft text-sky-darker">
                {t.contacts.addressText}
              </Row>
              <Row icon={<Phone className="h-5 w-5" aria-hidden />} label={t.contacts.phones} tone="bg-mint-soft text-mint-deep">
                <ul className="grid gap-1">
                  {siteConfig.phones.map((p) => (
                    <li key={p.href}>
                      <a href={p.href} className="font-bold whitespace-nowrap text-ink hover:text-sky-deep">
                        {p.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </Row>
              <Row icon={<Clock className="h-5 w-5" aria-hidden />} label={t.contacts.hours} tone="bg-butter-soft text-butter-deep">
                {t.contacts.hoursText}
              </Row>
              <Row icon={<InstagramIcon className="h-5 w-5" aria-hidden />} label={t.contacts.instagram} tone="bg-sky-soft text-sky-darker">
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-ink hover:text-sky-deep"
                >
                  {siteConfig.instagram.handle}
                </a>
              </Row>
            </address>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-1">
                <MessageCircle className="h-4 w-4" aria-hidden />
                {t.contacts.whatsapp}
              </a>
              <a href={siteConfig.phones[0].href} className="btn-ghost flex-1">
                <Phone className="h-4 w-4" aria-hidden />
                {siteConfig.phones[0].display}
              </a>
            </div>
          </Reveal>

          <Reveal from="right" className="card flex flex-col overflow-hidden">
            {hasEmbed ? (
              <iframe
                src={TWO_GIS_EMBED_URL}
                title={t.contacts.mapTitle}
                loading="lazy"
                className="min-h-80 w-full flex-1 border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="relative flex min-h-64 flex-1 items-center justify-center overflow-hidden bg-mint-soft">
                {/* Декоративті карта фоны — нақты координаттарсыз */}
                <svg aria-hidden className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 300">
                  <path d="M-10 210 C 90 170, 160 250, 260 200 S 380 150, 420 170" stroke="#FFFFFF" strokeWidth="18" fill="none" />
                  <path d="M120 -10 C 140 80, 100 160, 150 310" stroke="#FFFFFF" strokeWidth="12" fill="none" />
                  <path d="M280 -10 C 300 90, 330 160, 300 310" stroke="#FFFFFF" strokeWidth="10" fill="none" opacity="0.8" />
                  <circle cx="330" cy="70" r="34" fill="#BDE8F6" opacity="0.8" />
                  <rect x="30" y="40" width="60" height="44" rx="14" fill="#FFE6AE" opacity="0.8" />
                  <rect x="180" y="240" width="70" height="40" rx="14" fill="#BDE8F6" opacity="0.6" />
                </svg>
                <div className="relative flex flex-col items-center">
                  <span className="grid h-16 w-16 animate-[float_5s_ease-in-out_infinite] place-items-center rounded-full bg-sky-deep text-white shadow-lift">
                    <MapPin className="h-8 w-8" aria-hidden />
                  </span>
                  <span className="mt-3 rounded-full bg-white px-4 py-1.5 font-display text-sm font-bold text-ink shadow-soft">
                    TAIO
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-bold text-ink">{t.contacts.map}</h3>
                {!hasEmbed && <p className="mt-1 text-sm text-ink-soft">{t.contacts.mapHint}</p>}
              </div>
              <a href={twoGisLink} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
                {t.contacts.openMap}
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
