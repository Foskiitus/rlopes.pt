import { Link, useLocation } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import { locales } from "../i18n/translations";
import { localizedPath } from "../i18n/paths";

function LanguageSwitcher() {
  const activeLocale = useLocale();
  const { pathname } = useLocation();

  return (
    <span className="languageSwitcher">
      {locales.map((locale) => (
        <Link
          key={locale}
          to={localizedPath(locale, pathname)}
          aria-current={locale === activeLocale ? "true" : undefined}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </span>
  );
}

export default LanguageSwitcher;
