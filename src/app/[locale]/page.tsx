import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { ContactForm } from "@/components/ContactForm";
import { ProjectImage } from "@/components/ProjectImage";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata(locale, t("title"), t("description"));
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const services = t.raw("services.items") as {
    title: string;
    text: string;
  }[];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": site.url + "/#person",
        name: site.name,
        email: site.email,
        url: site.url + "/" + locale,
        jobTitle: t("hero.role"),
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.locality,
          addressCountry: site.location.countryCode,
        },
        sameAs: [site.github, site.linkedin],
        image: site.url + "/ricardo-lopes.webp",
      },
      {
        "@type": "WebSite",
        name: site.name,
        url: site.url,
        inLanguage: ["fr", "pt-PT", "en"],
      },
    ],
  };
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <SelectedWork />
      <section
        id="services"
        className="capabilities wrap"
        aria-labelledby="services-title"
      >
        <div className="capabilities-intro">
          <h2 id="services-title">{t("services.title")}</h2>
          <p>{t("services.intro")}</p>
          <a className="text-link" href="#contact">
            {t("services.cta")}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <ul className="capability-list">
          {services.map((service) => (
            <li key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <section
        id="about"
        className="about-section wrap"
        aria-labelledby="about-title"
      >
        <div className="about-intro">
          <div className="about-portrait">
            <ProjectImage
              src="/ricardo-lopes.webp"
              alt={t("about.portrait")}
              width={500}
              height={500}
              sizes="(min-width:1100px) 144px, (min-width:768px) 120px, 90px"
            />
          </div>
          <h2 id="about-title">{t("about.title")}</h2>
        </div>
        <div className="about-copy">
          <p className="about-role">{t("about.role")}</p>
          <p>{t("about.body")}</p>

          <div className="about-links">
            <a href={site.linkedin} className="text-link">
              LinkedIn
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={site.github} className="text-link">
              GitHub
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="contact-section"
        aria-labelledby="contact-title"
      >
        <div className="wrap contact-grid">
          <div className="contact-copy">
            <h2 id="contact-title">{t("contact.title")}</h2>

            <p className="contact-locality">{t("contact.locality")}</p>

            <div className="direct-contact">
              <span>{t("contact.alternative")}</span>
              <a href={"mailto:" + site.email}>
                {site.email}
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
