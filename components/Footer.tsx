"use client";

import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import Brand from "./Brand";
import { InstagramIcon } from "./Decorations";
import { useLang } from "./LanguageProvider";

export default function Footer({ logo }: { logo: string | null }) {
  const { t } = useLang();
  const year = 2026;

  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <span className="rounded-2xl bg-white p-1">
            <Brand logo={logo} size={40} />
          </span>
          <div>
            <p className="font-display text-lg font-bold text-white">TAIO</p>
            <p className="text-sm">{t.legalName}</p>
          </div>
        </div>

        <ul className="flex items-center gap-2">
          <li>
            <a
              href={siteConfig.phones[0].href}
              aria-label={siteConfig.phones[0].display}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <Phone className="h-5 w-5" aria-hidden />
            </a>
          </li>
          <li>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
            </a>
          </li>
          <li>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <InstagramIcon className="h-5 w-5" aria-hidden />
            </a>
          </li>
        </ul>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {year} TAIO. {t.footer.rights}
      </div>
    </footer>
  );
}
