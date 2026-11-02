import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { isPreview } from "./src/data/site";
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return isPreview()
      ? [
          {
            source: "/:path*",
            headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
          },
        ]
      : [];
  },
  async redirects() {
    return [
      { source: "/portfolio", destination: "/pt#work", permanent: true },
      ...["pt", "en", "fr"].map((locale) => ({
        source: "/" + locale + "/portfolio",
        destination: "/" + locale + "#work",
        permanent: true,
      })),
    ];
  },
};
export default withNextIntl(nextConfig);
