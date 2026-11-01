import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { routing } from "@/i18n/routing";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/legal", "/privacy"].flatMap((path) =>
    routing.locales.map((locale) => ({
      url: site.url + "/" + locale + path,
      alternates: {
        languages: {
          fr: site.url + "/fr" + path,
          "pt-PT": site.url + "/pt" + path,
          en: site.url + "/en" + path,
        },
      },
      changeFrequency: "monthly" as const,
      priority: path ? 0.2 : 1,
    })),
  );
}
