"use client";
import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);
export type GalleryMotionProps = {
  root: RefObject<HTMLDivElement | null>;
  trigger: RefObject<ScrollTrigger | null>;
  active: RefObject<number>;
  count: number;
  onActive: (index: number) => void;
};
export function DesktopGalleryMotion({
  root,
  trigger,
  active,
  count,
  onActive,
}: GalleryMotionProps) {
  useGSAP(
    () => {
      const element = root.current;
      if (!element || count < 2) return;
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1100px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels = Array.from(
            element.querySelectorAll<HTMLElement>(".project-panel"),
          );
          element.classList.add("is-animated");
          gsap.set(panels.slice(1), {
            opacity: 0,
            y: 30,
            pointerEvents: "none",
          });
          const setActive = (index: number) => {
            if (active.current !== index) onActive(index);
            panels.forEach((panel, i) => {
              panel.inert = i !== index;
              panel.style.pointerEvents = i === index ? "auto" : "none";
            });
          };
          setActive(0);
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: element,
              start: "top 88px",
              end: () => "+=" + Math.min(1200, Math.round(innerHeight * 1.2)),
              pin: true,
              scrub: 0.3,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
            onUpdate: () =>
              setActive(
                timeline.time() < 0.82 ? 0 : timeline.time() < 1.82 ? 1 : 2,
              ),
          });
          timeline.to({}, { duration: 0.45 });
          panels.slice(1).forEach((panel, index) => {
            const at = index + 0.5;
            const image = panel.querySelector(".project-image");
            timeline
              .to(panels[index], { opacity: 0, y: -24, duration: 0.3 }, at)
              .to(panel, { opacity: 1, y: 0, duration: 0.4 }, at + 0.08)
              .fromTo(
                image,
                {
                  clipPath:
                    index === 0
                      ? "inset(0 12% 0 12% round 14px)"
                      : "inset(8% 0 8% 0 round 14px)",
                  scale: index === 0 ? 1.035 : 0.96,
                },
                {
                  clipPath: "inset(0 0 0 0 round 14px)",
                  scale: 1,
                  duration: 0.45,
                },
                at + 0.06,
              );
          });
          timeline.to({}, { duration: 0.5 });
          trigger.current = timeline.scrollTrigger!;
          let alive = true;
          const refresh = () => {
            if (alive) trigger.current?.refresh();
          };
          document.fonts.ready.then(() => {
            if (!alive) return;
            refresh();
            requestAnimationFrame(() => {
              if (!alive || !location.hash) return;
              const index = panels.findIndex(
                (panel) => "#" + panel.id === location.hash,
              );
              const st = trigger.current;
              if (index >= 0 && st)
                window.scrollTo({
                  top: st.start + ((st.end - st.start) * index) / (count - 1),
                  behavior: "instant",
                });
              else
                document
                  .getElementById(location.hash.slice(1))
                  ?.scrollIntoView({ block: "start", behavior: "instant" });
            });
          });
          const images = Array.from(element.querySelectorAll("img"));
          images.forEach((img) => {
            if (!img.complete)
              img.addEventListener("load", refresh, { once: true });
          });
          window.addEventListener("pageshow", refresh);
          return () => {
            alive = false;
            images.forEach((img) => img.removeEventListener("load", refresh));
            window.removeEventListener("pageshow", refresh);
            panels.forEach((panel) => {
              panel.inert = false;
              panel.style.removeProperty("pointer-events");
            });
            element.classList.remove("is-animated");
            trigger.current = null;
          };
        },
      );
      return () => mm.revert();
    },
    { scope: root, dependencies: [count, onActive], revertOnUpdate: true },
  );
  return null;
}
