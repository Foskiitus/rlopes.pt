import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import projectsStyles from "../sections/Projects/Projects.module.css";
import styles from "./Portfolio.module.css";
import { PortfolioData } from "../../data";
import ProjectCard from "../common/ProjectCard";
import PageHeader from "../common/PageHeader";
import Seo from "../common/Seo";
import { useTranslation } from "../i18n/LocaleContext";

const Footer = lazy(() => import("../sections/Footer/Footer"));

const FILTERS = [
  { value: "all", labelKey: "filterAll" },
  { value: "web", labelKey: "filterWeb" },
  { value: "mobile", labelKey: "filterMobile" },
];

const itemsReverseOrder = [...PortfolioData].sort((a, b) => b.id - a.id);

function Portfolio() {
  const { t, locale } = useTranslation();
  const [filter, setFilter] = useState("all");

  const items =
    filter === "all"
      ? itemsReverseOrder
      : itemsReverseOrder.filter((project) => project.type === filter);

  return (
    <>
      <Seo title={t.portfolio.seoTitle} description={t.portfolio.seoDescription} />
      <PageHeader />
      <section className={styles.container}>
        <motion.h1
          className="sectionTitle"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          {t.portfolio.title}
        </motion.h1>
        <div
          className={styles.filters}
          role="group"
          aria-label={t.portfolio.title}
        >
          {FILTERS.map(({ value, labelKey }) => (
            <button
              key={value}
              type="button"
              className={styles.filterButton}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {t.portfolio[labelKey]}
            </button>
          ))}
        </div>
        <div className={projectsStyles.projectsContainer}>
          {items.map((project) => (
            <ProjectCard
              key={project.id}
              src={project.img}
              link={project.link}
              title={project.title}
              description={project.desc[locale]}
            />
          ))}
        </div>
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  );
}

export default Portfolio;
