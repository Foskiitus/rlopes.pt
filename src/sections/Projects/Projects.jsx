import styles from "./Projects.module.css";

import { PortfolioData } from "../../../data";

import ProjectCard from "../../common/ProjectCard";

const itemsReverseOrder = PortfolioData.sort((a, b) => b.id - a.id).filter(
  (item) => item.featured === true
);

function Projects() {
  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
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
