"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/routing";
const languages = { fr: "Français", pt: "Português", en: "English" };
export function LocaleSwitcher({
  locale,
  label,
  compact = false,
}: {
  locale: Locale;
  label: string;
  compact?: boolean;
}) {
  const pathname = usePathname() || "/" + locale;
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  function choose(event: React.MouseEvent<HTMLAnchorElement>, next: Locale) {
    // Persist only an explicit language choice.
    // eslint-disable-next-line react-hooks/immutability
    document.cookie =
      "NEXT_LOCALE=" +
      next +
      "; Path=/; Max-Age=31536000; SameSite=Lax" +
      (location.protocol === "https:" ? "; Secure" : "");
    event.currentTarget.href =
      event.currentTarget.href.split("#")[0] + window.location.hash;
    setOpen(false);
  }
  return (
    <div
      ref={root}
      className={"locale-switcher" + (compact ? " locale-compact" : "")}
      data-open={open}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setOpen(false);
      }}
    >
      {compact && (
        <button
          className="locale-toggle"
          ref={toggle}
          aria-label={label + " — " + languages[locale]}
          aria-expanded={open}
          aria-controls="header-languages"
          onClick={() => setOpen((v) => !v)}
        >
          {locale.toUpperCase()}
          <ChevronDown size={14} aria-hidden="true" />
        </button>
      )}
      <nav
        className="locale-options"
        id={compact ? "header-languages" : undefined}
        aria-label={label}
      >
        {(["fr", "pt", "en"] as const).map((lang) => (
          <a
            key={lang}
            href={pathname.replace(/^\/(fr|pt|en)/, "/" + lang)}
            hrefLang={lang === "pt" ? "pt-PT" : lang}
            lang={lang}
            onClick={(e) => choose(e, lang)}
            aria-label={lang.toUpperCase() + " — " + languages[lang]}
            aria-current={locale === lang ? "page" : undefined}
          >
            {lang.toUpperCase()}
          </a>
        ))}
      </nav>
    </div>
  );
}
