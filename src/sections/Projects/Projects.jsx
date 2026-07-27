import styles from "./Projects.module.css";
import { Link } from "react-router-dom";

import { PortfolioData } from "../../../data";

import ProjectCard from "../../common/ProjectCard";
import { useTranslation } from "../../i18n/LocaleContext";
import { localizedPath } from "../../i18n/paths";

import { motion } from "framer-motion";

const itemsReverseOrder = PortfolioData.sort((a, b) => b.id - a.id).filter(
  (item) => item.featured === true
);

function Projects() {
  const { t, locale } = useTranslation();

  return (
    <section id="projects" className={styles.container}>
      <motion.h2
        className="sectionTitle"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        {t.projects.title}
      </motion.h2>
      <div className={styles.projectsContainer}>
        {itemsReverseOrder.map((project) => (
          <ProjectCard
            key={project.id}
            src={project.img}
            link={project.link}
            title={project.title}
            description={project.desc[locale]}
          />
        ))}
      </div>
      <Link to={localizedPath(locale, "/portfolio")} className={styles.viewAll}>
        {t.projects.viewAll}
      </Link>
    </section>
  );
}

export default Projects;
