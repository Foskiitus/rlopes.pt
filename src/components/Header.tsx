"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import type { Locale } from "@/i18n/routing";
export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function close(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href={"/" + locale} className="wordmark" aria-label={t("home")}>
          ricardo lopes<span aria-hidden="true">.</span>
        </a>
        <nav className="desktop-nav" aria-label={t("label")}>
          {(["work", "services", "about"] as const).map((key) => (
            <a key={key} href={"/" + locale + "#" + key}>
              {t(key)}
            </a>
          ))}
        </nav>
        <div
          className="header-actions"
          onClickCapture={(event) => {
            if ((event.target as HTMLElement).closest(".locale-toggle"))
              setOpen(false);
          }}
        >
          <LocaleSwitcher locale={locale} label={t("language")} compact />
          <a
            className="header-contact"
            href={"/" + locale + "#contact"}
            aria-label={t("contact")}
            onClick={() => setOpen(false)}
          >
            <ArrowUpRight aria-hidden="true" size={21} />
          </a>
          <button
            className="menu-toggle"
            ref={button}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t(open ? "close" : "menu")}
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-menu"
        className="mobile-menu"
        aria-label={t("label")}
        hidden={!open}
      >
        {(["work", "services", "about", "contact"] as const).map((key) => (
          <a
            key={key}
            href={"/" + locale + "#" + key}
            onClick={() => setOpen(false)}
          >
            {t(key)}
            <ArrowUpRight aria-hidden="true" size={20} />
          </a>
        ))}
      </nav>
    </header>
  );
}
