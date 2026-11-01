"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type MouseEvent,
  type ReactNode,
} from "react";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GalleryMotionProps } from "./DesktopGalleryMotion";
import { useTranslations } from "next-intl";
import { ArrowDown, ArrowUp, ArrowUpRight, List, Play } from "lucide-react";

const desktopQuery =
  "(min-width: 1100px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)";
type GalleryProject = { id: string; name: string };
export function WorkGallery({
  children,
  projects,
}: {
  children: ReactNode;
  projects: GalleryProject[];
}) {
  const t = useTranslations("work");
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const active = useRef(0);
  const [current, setCurrent] = useState(0);
  const [list, setList] = useState(false);
  const [Motion, setMotion] =
    useState<ComponentType<GalleryMotionProps> | null>(null);
  const onActive = useCallback((index: number) => {
    active.current = index;
    setCurrent(index);
  }, []);
  const count = projects.length;

  useEffect(() => {
    if (list) return;
    const desktop = matchMedia(desktopQuery);
    let alive = true;
    const update = () => {
      if (!desktop.matches) {
        setMotion(null);
        return;
      }
      void import("./DesktopGalleryMotion").then((module) => {
        if (!alive || !desktop.matches) return;
        if (
          root.current?.contains(document.activeElement) &&
          document.activeElement?.closest(".project-panel")
        ) {
          setList(true);
          return;
        }
        setMotion(() => module.DesktopGalleryMotion);
      });
    };
    update();
    desktop.addEventListener("change", update);
    return () => {
      alive = false;
      desktop.removeEventListener("change", update);
    };
  }, [list]);

  useEffect(() => {
    let frame = 0;
    const panels = Array.from(
      root.current?.querySelectorAll<HTMLElement>(".project-panel") || [],
    );
    const update = () => {
      frame = 0;
      if (trigger.current) return;
      let index = 0;
      panels.forEach((panel, i) => {
        if (panel.getBoundingClientRect().top < innerHeight * 0.45) index = i;
      });
      if (active.current !== index) onActive(index);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [onActive]);

  const move = useCallback(
    (index: number, history = false) => {
      const item = projects[index];
      if (!item) return;
      if (history && location.hash !== "#" + item.id)
        window.history.pushState(null, "", "#" + item.id);
      const st = trigger.current;
      if (st)
        window.scrollTo({
          top: st.start + ((st.end - st.start) * index) / (count - 1),
          behavior: "instant",
        });
      else
        document
          .getElementById(item.id)
          ?.scrollIntoView({ block: "start", behavior: "instant" });
    },
    [projects, count],
  );

  useEffect(() => {
    const restoreHash = () => {
      const index = projects.findIndex(
        (project) => "#" + project.id === location.hash,
      );
      if (index >= 0) requestAnimationFrame(() => move(index));
    };
    window.addEventListener("hashchange", restoreHash);
    window.addEventListener("popstate", restoreHash);
    return () => {
      window.removeEventListener("hashchange", restoreHash);
      window.removeEventListener("popstate", restoreHash);
    };
  }, [move, projects]);

  function navigate(event: MouseEvent<HTMLAnchorElement>, index: number) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    move(index, true);
  }
  function showList() {
    setList((value) => !value);
    requestAnimationFrame(() =>
      root.current?.scrollIntoView({ block: "start", behavior: "instant" }),
    );
  }
  return (
    <>
      <div
        ref={root}
        className="work-gallery"
        onKeyDownCapture={(event) => {
          if (
            event.key === "Tab" &&
            !list &&
            root.current?.classList.contains("is-animated")
          )
            setList(true);
        }}
        onFocusCapture={(event) => {
          const panel = (event.target as HTMLElement).closest<HTMLElement>(
            ".project-panel",
          );
          if (
            panel &&
            (event.target as HTMLElement).matches(":focus-visible") &&
            !list &&
            matchMedia(desktopQuery).matches
          ) {
            setList(true);
            requestAnimationFrame(() =>
              panel.scrollIntoView({ block: "center", behavior: "instant" }),
            );
          }
        }}
      >
        {!list && Motion && (
          <Motion
            root={root}
            trigger={trigger}
            active={active}
            count={count}
            onActive={onActive}
          />
        )}
        <nav className="project-nav" aria-label={t("navigation")}>
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={"#" + project.id}
              aria-current={current === index ? "true" : undefined}
              onClick={(event) => navigate(event, index)}
            >
              {project.name}
            </a>
          ))}
        </nav>
        <div className="project-stage">{children}</div>
        <div className="gallery-controls">
          <button
            type="button"
            aria-label={t("previous")}
            disabled={current === 0}
            onClick={() => move(Math.max(0, current - 1), true)}
          >
            <ArrowUp size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={t("next")}
            disabled={current === count - 1}
            onClick={() => move(Math.min(count - 1, current + 1), true)}
          >
            <ArrowDown size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="gallery-footer wrap">
        <button
          type="button"
          className="text-link gallery-mode"
          onClick={showList}
        >
          {list ? (
            <Play size={15} aria-hidden="true" />
          ) : (
            <List size={16} aria-hidden="true" />
          )}
          {t(list ? "animated" : "list")}
        </button>
        <a className="text-link gallery-contact" href="#contact">
          {t("contact")}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
