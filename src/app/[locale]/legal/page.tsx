import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { routing } from "@/i18n/routing";
import { site, business } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "legal" });
  return pageMetadata(
    locale,
    t("title") + " — Ricardo Lopes",
    t("intro"),
    "/legal",
  );
}
export default async function Legal({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const registrationDate = (value: string) =>
    new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(value));
  return (
    <main id="main" className="legal-page wrap">
      <a className="text-link" href={"/" + locale}>
        <ArrowLeft size={17} aria-hidden="true" />
        {t("back")}
      </a>
      <h1>{t("title")}</h1>
      <p>{t("intro")}</p>
      <section>
        <h2>{t("publisher")}</h2>
        <p>
          {business.publisher}
          <br />
          {t("businessType")}
          <br />
          {business.address}
        </p>
        <p>{t("establishment")}</p>
        <p>{t("director")}</p>
      </section>
      <section>
        <h2>{t("registration")}</h2>
        <p>SIREN : {business.siren}</p>
        <p>SIRET : {business.siret}</p>
        <p>
          {t("inseeRegistration", {
            date: registrationDate(business.inseeRegisteredOn),
          })}
        </p>
        <p>
          {t("rneRegistration", {
            date: registrationDate(business.rneRegisteredOn),
          })}
        </p>
        <p>{t("activity", { code: business.ape })}</p>
        <p>
          {business.register} — {business.siren}
        </p>
        <p>{t("vat")}</p>
      </section>
      <section>
        <h2>{t("contact")}</h2>
        <p>
          <a href={"mailto:" + site.email}>{site.email}</a>
          <br />
          <a href="tel:+33766234110">{business.phone}</a>
        </p>
      </section>
      <section>
        <h2>{t("hosting")}</h2>
        <p>
          <a href={business.host.url}>{business.host.name}</a>
        </p>
        <p>{business.host.address}</p>
        {!business.host.phone && <p>{t("hostingNote")}</p>}
        {business.host.phone && <p>{business.host.phone}</p>}
      </section>
      <section>
        <h2>{t("intellectual")}</h2>
        <p>{t("intellectualBody")}</p>
      </section>
      <section>
        <h2>{t("responsibility")}</h2>
        <p>{t("responsibilityBody")}</p>
      </section>
      <section>
        <h2>{t("dataProtection")}</h2>
        <p>{t("dataProtectionBody")}</p>
        <a href={"/" + locale + "/privacy"}>{t("privacyLink")}</a>
      </section>
      <section>
        <h2>{t("law")}</h2>
        <p>{t("lawBody")}</p>
      </section>
      {(!business.registrationScopeConfirmed ||
        !business.vatRegimeConfirmed) && (
        <p className="legal-notice">{t("verification")}</p>
      )}
    </main>
  );
}
