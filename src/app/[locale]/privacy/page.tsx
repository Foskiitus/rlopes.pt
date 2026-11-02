import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { routing } from "@/i18n/routing";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "privacy" });
  return pageMetadata(
    locale,
    t("title") + " — Ricardo Lopes",
    t("intro"),
    "/privacy",
  );
}
export default async function Privacy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const l = await getTranslations("legal");
  return (
    <main id="main" className="legal-page wrap">
      <a className="text-link" href={"/" + locale}>
        <ArrowLeft size={17} aria-hidden="true" />
        {l("back")}
      </a>
      <h1>{t("title")}</h1>
      <p>{t("intro")}</p>
      {[
        "controller",
        "collection",
        "processing",
        "technical",
        "retention",
        "rights",
        "cookies",
        "preferences",
        "external",
      ].map((key) => (
        <section key={key}>
          <h2>{t(key)}</h2>
          <p>{t(key + "Body")}</p>
          {key === "controller" && (
            <p>
              <a href={"mailto:" + site.email}>{site.email}</a>
            </p>
          )}
          {key === "processing" && (
            <p>
              <a href="https://www.netlify.com/pdf/netlify-dpa.pdf">
                {t("provider")}
              </a>
            </p>
          )}
          {key === "rights" && (
            <p>
              <a href="https://www.cnil.fr/">{t("authority")}</a>
            </p>
          )}
        </section>
      ))}
    </main>
  );
}
