import { useLocation } from "react-router-dom";
import { Head } from "vite-react-ssg";
import PropTypes from "prop-types";
import ogImage from "../assets/foto_perfil-og.jpg";
import { useLocale, useTranslation } from "../i18n/LocaleContext";
import { locales, defaultLocale, hreflangTags } from "../i18n/translations";
import { localizedPath } from "../i18n/paths";

const SITE_URL = "https://rlopes.pt";
// JPEG (not the WebP used on-page) for broader compatibility with social
// link-preview crawlers.
const OG_IMAGE = `${SITE_URL}${ogImage}`;

const OG_LOCALE = { pt: "pt_PT", en: "en_US" };

function urlForLocale(pathname, locale) {
  return `${SITE_URL}${localizedPath(locale, pathname)}`;
}

function Seo({ title, description }) {
  const locale = useLocale();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const canonical = urlForLocale(pathname, locale);
  const pageTitle = title || t.seo.title;
  const pageDescription = description || t.seo.description;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Ricardo Lopes",
        jobTitle: t.hero.role,
        url: SITE_URL,
        image: OG_IMAGE,
        sameAs: [
          "https://github.com/Foskiitus",
          "https://www.linkedin.com/in/rilopes/",
        ],
      },
      {
        "@type": "WebSite",
        name: "Ricardo Lopes",
        url: SITE_URL,
        inLanguage: hreflangTags[locale],
      },
    ],
  };

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonical} />
      {locales.map((loc) => (
        <link
          key={loc}
          rel="alternate"
          hrefLang={hreflangTags[loc]}
          href={urlForLocale(pathname, loc)}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={urlForLocale(pathname, defaultLocale)}
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Ricardo Lopes" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content={OG_LOCALE[locale]} />
      {locales
        .filter((loc) => loc !== locale)
        .map((loc) => (
          <meta
            key={loc}
            property="og:locale:alternate"
            content={OG_LOCALE[loc]}
          />
        ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Head>
  );
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Seo;
