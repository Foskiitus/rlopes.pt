import type { MetadataRoute } from "next";
import { site, isPreview } from "@/data/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: isPreview()
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", allow: "/", disallow: "/__forms.html" },
    sitemap: site.url + "/sitemap.xml",
  };
}
