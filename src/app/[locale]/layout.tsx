import type { ReactNode } from "react";
import type { Viewport } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";
const sans = localFont({
  src: "../../fonts/dm-sans.woff2",
  variable: "--font-body",
  weight: "100 1000",
  display: "swap",
});
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fafaf7",
};
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale === "pt" ? "pt-PT" : locale} className={sans.variable}>
      <body id="top">
        <NextIntlClientProvider
          messages={{
            nav: messages.nav,
            work: messages.work,
            contact: messages.contact,
            error: messages.error,
          }}
        >
          <a className="skip-link" href="#main">
            {(messages.nav as { skip: string }).skip}
          </a>
          <Header locale={locale as Locale} />
          {children}
          <Footer locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
