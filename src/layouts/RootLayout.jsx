import { Outlet, useLocation } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { ThemeProvider } from "../common/ThemeContext";
import { LocaleProvider } from "../i18n/LocaleContext";
import { locales, defaultLocale, hreflangTags } from "../i18n/translations";

function localeFromPathname(pathname) {
  const match = locales.find(
    (locale) =>
      locale !== defaultLocale &&
      (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))
  );
  return match || defaultLocale;
}

function RootLayout() {
  const { pathname } = useLocation();
  const locale = localeFromPathname(pathname);

  return (
    <ThemeProvider>
      <LocaleProvider locale={locale}>
        <Head>
          <html lang={hreflangTags[locale]} />
        </Head>
        <Outlet />
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default RootLayout;
