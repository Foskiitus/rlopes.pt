import styles from "./Hero.module.css";
import heroImg from "../../assets/foto_perfil.webp";
import githubLight from "../../assets/github-light.svg";
import githubDark from "../../assets/github-dark.svg";
import linkedinLight from "../../assets/linkedin-light.svg";
import linkedinDark from "../../assets/linkedin-dark.svg";
import CV from "../../assets/Ricardo_Lopes_CV.pdf";
import { useTheme } from "../../common/ThemeContext";
import { useTranslation } from "../../i18n/LocaleContext";
import LanguageSwitcher from "../../common/LanguageSwitcher";
import ThemeToggle from "../../common/ThemeToggle";

import { motion } from "framer-motion";

function Hero() {
  const { theme, mounted } = useTheme();
  const { t } = useTranslation();

  // Before mount, always render the light variant so hydration matches the
  // statically pre-rendered markup (see ThemeContext for details).
  const effectiveTheme = mounted ? theme : "light";
  const githubIcon = effectiveTheme === "light" ? githubLight : githubDark;
  const linkedinIcon =
    effectiveTheme === "light" ? linkedinLight : linkedinDark;

  return (
    <section id="hero" className={styles.container}>
      <motion.div
        className={styles.colorModeContainer}
        variants={{
          hidden: { opacity: 0, x: 275 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <img
          className={styles.hero}
          src={heroImg}
          alt="Profile picture of Ricardo Lopes"
          width="900"
          height="900"
          fetchPriority="high"
        />
        <LanguageSwitcher />
        <ThemeToggle className={styles.colorMode} />
      </motion.div>
      <motion.div
        className={styles.info}
        variants={{
          hidden: { opacity: 0, x: -275 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        <h1>
          Ricardo
          <br />
          Lopes
        </h1>
        <h2>{t.hero.role}</h2>
        <span>
          <a
            href="https://github.com/Foskiitus"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="Github Icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/rilopes/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinIcon} alt="LinkedIn Icon" />
          </a>
        </span>
        <p className={styles.description}>{t.hero.description}</p>
        <a href={CV} download>
          <button className="hover">{t.hero.resume}</button>
        </a>
      </motion.div>
    </section>
  );
}

export default Hero;
