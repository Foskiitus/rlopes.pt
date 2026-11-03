import { defineRouting } from "next-intl/routing";
export const routing = defineRouting({
  locales: ["fr", "pt", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  localeDetection: false,
  // LocaleSwitcher alone persists an explicit choice; visits must not set cookies.
  localeCookie: false,
  alternateLinks: false,
});
export type Locale = (typeof routing.locales)[number];
