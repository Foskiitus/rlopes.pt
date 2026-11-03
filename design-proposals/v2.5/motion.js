/* Standalone concept motion: production components are not imported or changed. */
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const eligible = matchMedia("(min-width: 1100px) and (min-height: 680px)");
  let context,
    cancelled = false,
    loading;
  let contextCleanup = () => {};
  const load = (src) =>
    new Promise((resolve, reject) => {
      const tag = document.createElement("script");
      tag.src = src;
      tag.onload = resolve;
      tag.onerror = reject;
      document.head.append(tag);
    });
  const cleanup = () => {
    contextCleanup();
    contextCleanup = () => {};
    context?.revert();
    context = null;
    document.querySelectorAll(".exhibit").forEach((el) => {
      el.inert = false;
    });
    document.querySelector(".exhibition")?.classList.remove("is-pinned");
    const toggle = document.querySelector(".motion-toggle");
    if (toggle) toggle.hidden = true;
  };
  async function update() {
    cleanup();
    if (reduced.matches || !eligible.matches || cancelled) return;
    try {
      loading ??= load("/vendor/gsap.js").then(() =>
        load("/vendor/ScrollTrigger.js"),
      );
      await loading;
    } catch {
      return;
    }
    if (reduced.matches || !eligible.matches || cancelled || context) return;
    const gsap = window.gsap,
      ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    context = gsap.context(() => {
      if (document.body.classList.contains("canvas")) {
        gsap.fromTo(
          ".canvas-stage img",
          { scale: 1.035 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".canvas-stage",
              start: "top 70%",
              end: "bottom 25%",
              scrub: 0.45,
            },
          },
        );
      }
      if (document.body.classList.contains("type")) {
        gsap.to(".type-window", {
          rotation: 0,
          y: 24,
          ease: "none",
          scrollTrigger: {
            trigger: ".type-hero",
            start: "top top",
            end: "bottom 40%",
            scrub: 0.4,
          },
        });
        gsap.fromTo(
          ".store-sheet",
          { clipPath: "inset(4% 3% 4% 3% round 12px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 12px)",
            ease: "none",
            scrollTrigger: {
              trigger: ".type-store",
              start: "top 85%",
              end: "center 65%",
              scrub: 0.4,
            },
          },
        );
      }
      if (document.body.classList.contains("showcase")) {
        const root = document.querySelector(".exhibition"),
          panels = [...document.querySelectorAll(".exhibit")],
          nav = [...document.querySelectorAll(".exhibit-nav a")],
          toggle = document.querySelector(".motion-toggle");
        root.classList.add("is-pinned");
        toggle.hidden = false;
        gsap.set(panels.slice(1), { autoAlpha: 0, yPercent: 4 });
        let active = -1;
        const activate = (n) => {
          if (n === active) return;
          active = n;
          panels.forEach((el, i) => (el.inert = i !== n));
          nav.forEach((el, i) => {
            el.classList.toggle("is-active", i === n);
            if (i === n) el.setAttribute("aria-current", "true");
            else el.removeAttribute("aria-current");
          });
        };
        activate(0);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 16px",
            end: "+=1100",
            pin: true,
            scrub: 0.35,
            onUpdate: (self) =>
              activate(self.progress < 0.34 ? 0 : self.progress < 0.7 ? 1 : 2),
          },
        });
        timeline
          .to({}, { duration: 0.5 })
          .to(panels[0], { autoAlpha: 0, yPercent: -3, duration: 0.25 })
          .to(panels[1], { autoAlpha: 1, yPercent: 0, duration: 0.4 }, "<")
          .to({}, { duration: 0.55 })
          .to(panels[1], { autoAlpha: 0, yPercent: -3, duration: 0.25 })
          .to(panels[2], { autoAlpha: 1, yPercent: 0, duration: 0.4 }, "<")
          .to({}, { duration: 0.55 });
        const progress = [0, 0.5, 1];
        const navigate = (event) => {
          const link = event.target.closest('a[href^="#"]');
          if (!link) return;
          const index = panels.findIndex(
            (panel) => "#" + panel.id === link.getAttribute("href"),
          );
          if (index < 0) return;
          event.preventDefault();
          const st = timeline.scrollTrigger;
          window.scrollTo({
            top: st.start + (st.end - st.start) * progress[index],
            behavior: "smooth",
          });
        };
        root.addEventListener("click", navigate);
        const disable = () => {
          cancelled = true;
          cleanup();
        };
        toggle.addEventListener("click", disable, { once: true });
        const keyboard = (event) => {
          if (
            event.key === "Tab" &&
            !event.shiftKey &&
            event.target.closest(".exhibit-nav")
          )
            disable();
        };
        root.addEventListener("keydown", keyboard);
        contextCleanup = () => {
          root.removeEventListener("click", navigate);
          root.removeEventListener("keydown", keyboard);
          toggle.removeEventListener("click", disable);
          panels.forEach((el) => (el.inert = false));
          root.classList.remove("is-pinned");
        };
      }
    });
    ScrollTrigger.refresh();
  }
  const originalCleanup = cleanup;
  // Event listeners belong to the same lifecycle as the GSAP context.
  function refresh() {
    contextCleanup();
    contextCleanup = () => {};
    originalCleanup();
    void update();
  }
  reduced.addEventListener("change", refresh);
  eligible.addEventListener("change", refresh);
  addEventListener(
    "pagehide",
    () => {
      contextCleanup();
      cleanup();
      reduced.removeEventListener("change", refresh);
      eligible.removeEventListener("change", refresh);
    },
    { once: true },
  );
  void update();
})();
