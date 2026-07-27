import { Link } from "react-router-dom";
import styles from "./PageHeader.module.css";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { useLocale, useTranslation } from "../i18n/LocaleContext";
import { localizedPath } from "../i18n/paths";

function PageHeader() {
  const locale = useLocale();
  const { t } = useTranslation();

  return (
    <header className={styles.container}>
      <Link to={localizedPath(locale, "/")} className={styles.backHome}>
        {t.header.backHome}
      </Link>
      <div className={styles.controls}>
        <LanguageSwitcher />
        <ThemeToggle className={styles.themeToggle} />
      </div>
    </header>
  );
}

export default PageHeader;
