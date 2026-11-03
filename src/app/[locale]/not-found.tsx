import { getTranslations, getLocale } from "next-intl/server";
export default async function NotFound() {
  const t = await getTranslations("error");
  const locale = await getLocale();
  return (
    <main id="main" className="error-page wrap">
      <span>404</span>
      <h1>{t("title")}</h1>
      <p>{t("body")}</p>
      <a className="button button-dark" href={"/" + locale}>
        {t("home")}
      </a>
    </main>
  );
}
