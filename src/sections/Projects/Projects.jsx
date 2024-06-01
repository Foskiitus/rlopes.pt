import styles from "./Projects.module.css";

import { PortfolioData } from "../../../data";

import ProjectCard from "../../common/ProjectCard";

import { motion } from "framer-motion";

const itemsReverseOrder = PortfolioData.sort((a, b) => b.id - a.id).filter(
  (item) => item.featured === true
);

function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <motion.h1
        className="sectionTitle"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        Projects
      </motion.h1>
      <div className={styles.projectsContainer}>
        {itemsReverseOrder.map((project) => (
          <ProjectCard
            key={project.id}
            src={project.img}
            link={project.link}
            title={project.title}
            description={project.desc}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;
