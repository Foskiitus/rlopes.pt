import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { ProjectImage } from "./ProjectImage";
import { WorkGallery } from "./WorkGallery";

export async function SelectedWork() {
  const t = await getTranslations("work");
  const p = await getTranslations("projects");
  return (
    <section id="work" aria-labelledby="work-title" className="work-section">
      <h2 id="work-title" className="sr-only">
        {t("title")}
      </h2>
      <WorkGallery
        projects={featuredProjects.map(({ id, name }) => ({ id, name }))}
      >
        {featuredProjects.map((project) => (
          <article
            key={project.id}
            id={project.id}
            className={"project-panel project-" + project.id}
            data-project-id={project.id}
            aria-labelledby={project.id + "-title"}
          >
            <div className="project-art">
              <div className="project-image">
                <ProjectImage
                  priority={project.id === "spooliq"}
                  src={project.image}
                  alt={p(project.id + ".alt")}
                  width={project.width}
                  height={project.height}
                  sizes={
                    project.id === "spooliq"
                      ? "(min-width: 1100px) 900px, (min-width: 768px) 90vw, 110vw"
                      : "(min-width: 1100px) 76vw, (min-width: 768px) 85vw, 100vw"
                  }
                />
              </div>
            </div>
            <div className="project-information">
              <div className="project-copy">
                <h3 id={project.id + "-title"}>{project.name}</h3>
                <p className="project-description">
                  {p(project.id + ".description")}
                </p>
              </div>
              <div className="project-action">
                {project.status === "archived" && (
                  <span className="archive-label">{t("archived")}</span>
                )}
                <a
                  className="text-link project-link"
                  href={project.url || project.image}
                  aria-label={
                    (project.url ? t("visit") : t("archive")) +
                    " — " +
                    project.name
                  }
                >
                  {project.url ? t("visit") : t("archive")}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </WorkGallery>
    </section>
  );
}
