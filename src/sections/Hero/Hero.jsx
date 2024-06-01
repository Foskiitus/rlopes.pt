import styles from "./Hero.module.css";
import heroImg from "../../assets/hero-img.png";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import githubLight from "../../assets/github-light.svg";
import githubDark from "../../assets/github-dark.svg";
import linkedinLight from "../../assets/linkedin-light.svg";
import linkedinDark from "../../assets/linkedin-dark.svg";
import CV from "../../assets/Ricardo_Lopes_CV.pdf";
import { useTheme } from "../../common/ThemeContext";

import { motion } from "framer-motion";

function Hero() {
  const { theme, toggleTheme } = useTheme();

  const themeIcon = theme === "light" ? sun : moon;
  const githubIcon = theme === "light" ? githubLight : githubDark;
  const linkedinIcon = theme === "light" ? linkedinLight : linkedinDark;

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
        />
        <img
          className={styles.colorMode}
          src={themeIcon}
          alt="Color mode icon"
          onClick={toggleTheme}
        />
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
        <h2>Frontend Developer</h2>
        <span>
          <a href="https://github.com/Foskiitus" target="_blank">
            <img src={githubIcon} alt="Github Icon" />
          </a>
          <a href="https://www.linkedin.com/in/rilopes/" target="_blank">
            <img src={linkedinIcon} alt="Github Icon" />
          </a>
        </span>
        <p className={styles.description}>
          With a passion for developing modern React web apps for commercial
          businesses.
        </p>
        <a href={CV} download>
          <button className="hover">Resume</button>
        </a>
      </motion.div>
    </section>
  );
}

export default Hero;
