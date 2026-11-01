import { getTranslations } from "next-intl/server";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { LocaleSwitcher } from "./LocaleSwitcher";
import type { Locale } from "@/i18n/routing";
export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations("footer");
  return (
    <footer className="site-footer wrap">
      <div className="footer-main">
        <a className="wordmark" href={"/" + locale}>
          ricardo lopes<span aria-hidden="true">.</span>
        </a>
        <p className="footer-location">{t("location")}</p>
        <a className="text-link" href="#top">
          {t("top")}
          <ArrowUp size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Ricardo Lopes
          <span> · {t("rights")}</span>
        </p>
        <div className="footer-links">
          <a href={"/" + locale + "/legal"}>{t("legal")}</a>
          <a href={"/" + locale + "/privacy"}>{t("privacy")}</a>
          <a href={"mailto:" + site.email}>{site.email}</a>
          <a href={site.linkedin}>
            LinkedIn
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <a href={site.github}>
            GitHub
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
        <LocaleSwitcher locale={locale} label={t("languages")} />
      </div>
    </footer>
  );
}
