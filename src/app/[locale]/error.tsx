"use client";
import { useTranslations } from "next-intl";
export default function ErrorPage({ reset }: { reset: () => void }) {
  const t = useTranslations("error");
  return (
    <main id="main" className="error-page wrap">
      <h1>{t("unexpected")}</h1>
      <button className="button button-dark" onClick={reset}>
        {t("retry")}
      </button>
    </main>
  );
}
