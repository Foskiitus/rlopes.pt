import { locales, defaultLocale } from "./translations";

export function pathWithoutLocale(pathname) {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    const prefix = `/${locale}`;
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return pathname.slice(prefix.length) || "/";
    }
  }
  return pathname;
}

export function localizedPath(locale, pathname = "/") {
  const base = pathWithoutLocale(pathname);
  if (locale === defaultLocale) return base;
  return base === "/" ? `/${locale}` : `/${locale}${base}`;
}
