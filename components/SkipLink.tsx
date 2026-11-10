"use client";

import { useLang } from "./LanguageProvider";

export default function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#main"
      className="sr-only z-[200] rounded-full bg-sky-deep px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
    >
      {t.skip}
    </a>
  );
}
