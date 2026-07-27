import "./App.css";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import { locales, defaultLocale } from "./i18n/translations";

export const routes = locales.map((locale) => ({
  path: locale === defaultLocale ? "/" : `/${locale}`,
  Component: RootLayout,
  children: [
    { index: true, Component: Home },
    { path: "portfolio", Component: Portfolio },
  ],
}));
