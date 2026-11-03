import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

export async function Hero() {
  const t = await getTranslations("hero");
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <h1 id="hero-title">
        <span>{t("line1")}</span>
        <span className="hero-emphasis">{t("line2")}</span>
      </h1>
      <div className="hero-copy">
        <p className="hero-description">{t("description")}</p>
        <p className="hero-role">
          {t("role")}
          <span className="hero-locality">{t("locality")}</span>
        </p>
        <a className="button button-dark" href="#contact">
          {t("cta")}
          <ArrowUpRight aria-hidden="true" size={20} />
        </a>
      </div>
    </section>
  );
}
