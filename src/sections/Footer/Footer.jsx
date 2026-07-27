import styles from "./Footer.module.css";
import { useTranslation } from "../../i18n/LocaleContext";

function Footer() {
  const { t } = useTranslation();

  return (
    <section id="footer" className={styles.container}>
      <p>
        &copy; {new Date().getFullYear()} RLopes.
        <br /> {t.footer.rights}
      </p>
    </section>
  );
}

export default Footer;
