import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { site, isPreview } from "@/data/site";
export function pageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = "",
): Metadata {
  const url = site.url + "/" + locale + path;
  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: url,
      languages: {
        fr: site.url + "/fr" + path,
        "pt-PT": site.url + "/pt" + path,
        en: site.url + "/en" + path,
        "x-default": site.url + "/fr" + path,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Ricardo Lopes",
      title,
      description,
      url,
      locale: { fr: "fr_FR", pt: "pt_PT", en: "en_GB" }[locale],
      alternateLocale: ["fr_FR", "pt_PT", "en_GB"].filter(
        (l) => l !== { fr: "fr_FR", pt: "pt_PT", en: "en_GB" }[locale],
      ),
      images: [
        { url: "/og/" + locale + ".png", width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og/" + locale + ".png"],
    },
    robots: isPreview()
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
