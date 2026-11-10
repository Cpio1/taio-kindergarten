"use client";

import { ExternalLink, FileText, FolderOpen } from "lucide-react";
import { DOCUMENTS_URL } from "@/lib/site-config";
import { Sparkle, Star } from "./Decorations";
import { useLang } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function Documents() {
  const { t } = useLang();
  const hasLink = DOCUMENTS_URL.trim().length > 0;

  return (
    <section id="documents" aria-labelledby="documents-title" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="relative mx-auto max-w-3xl overflow-hidden rounded-[2.25rem] bg-mint-soft px-6 py-10 text-center sm:px-12">
          <Star className="animate-float absolute top-6 right-8 w-8" />
          <Sparkle className="absolute bottom-6 left-8 w-5" />
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-[1.4rem] bg-white text-mint-deep shadow-soft">
            {hasLink ? <FolderOpen className="h-7 w-7" aria-hidden /> : <FileText className="h-7 w-7" aria-hidden />}
          </span>
          <h2 id="documents-title" className="mt-5 text-2xl font-bold text-ink sm:text-3xl">
            {t.docs.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft sm:text-base">
            {hasLink ? t.docs.text : t.docs.soon}
          </p>
          {hasLink && (
            <a href={DOCUMENTS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
              {t.docs.open}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
