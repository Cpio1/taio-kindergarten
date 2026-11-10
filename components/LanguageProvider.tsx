"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, type Dict, type Lang } from "@/lib/i18n";

const STORAGE_KEY = "taio-lang";

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };

const LanguageContext = createContext<Ctx | null>(null);

/**
 * Сервер әрқашан қазақ тілінде көрсетеді (hydration қатесі болмауы үшін),
 * таңдалған тіл браузерде сақталып, жүктелгеннен кейін қолданылады.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("kk");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "ru" || saved === "kk") setLangState(saved);
    } catch {
      /* localStorage қолжетімсіз — әдепкі тіл қалады */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === "ru"
        ? "TAIO — счастливое место детства! | Ясли-сад, Көктерек"
        : "TAIO — балалық шақтың бақытты мекені! | Ясли-бақша, Көктерек";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* елемейміз */
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: dictionaries[lang], setLang }}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
