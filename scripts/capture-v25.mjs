import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const out = ".impeccable/review/v25-final";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = [];
try {
  for (const [width, height, locale] of [
    [390, 844, "fr"],
    [360, 740, "fr"],
    [430, 932, "fr"],
    [768, 1024, "fr"],
    [1440, 900, "fr"],
    [375, 812, "en"],
    [390, 844, "pt"],
    [1440, 900, "pt"],
    [1440, 900, "en"],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 1,
      isMobile: width < 768,
      hasTouch: width < 1100,
    });
    const page = await context.newPage(),
      errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (["warning", "error"].includes(m.type())) errors.push(m.text());
    });
    await page.goto("http://localhost:3100/" + locale, {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => document.fonts.ready);
    const prefix = width + "-" + locale;
    await page.screenshot({ path: `${out}/${prefix}-hero.png` });
    const metrics = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      pageHeight: document.documentElement.scrollHeight,
      animated: !!document.querySelector(".is-animated"),
      projects: [...document.querySelectorAll("[data-project-id]")].map(
        (el) => el.dataset.projectId,
      ),
      h1: document.querySelector("h1").getBoundingClientRect().toJSON(),
      cta: document
        .querySelector(".hero .button")
        .getBoundingClientRect()
        .toJSON(),
      image: document
        .querySelector(".project-spooliq .project-art")
        .getBoundingClientRect()
        .toJSON(),
    }));
    report.push({ width, height, locale, ...metrics, errors });
    if (width === 1440 && locale === "fr") {
      for (const id of [
        "spooliq",
        "loprim3d",
        "belofer",
        "loprim3d",
        "spooliq",
      ]) {
        await page.locator('.project-nav a[href="#' + id + '"]').click();
        await page.waitForFunction(
          (id) =>
            getComputedStyle(document.getElementById(id)).opacity === "1" &&
            document
              .querySelector(".project-nav a[aria-current]")
              .getAttribute("href") ===
              "#" + id,
          id,
        );
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${out}/desktop-stage-${id}.png` });
      }
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(
      () => !document.querySelector(".is-animated, .pin-spacer"),
    );
    await page.evaluate(async () => {
      document
        .querySelectorAll("img")
        .forEach((img) => (img.loading = "eager"));
      await Promise.all(
        [...document.images].map((img) => img.decode().catch(() => {})),
      );
      scrollTo({ top: 0, behavior: "instant" });
    });
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    await page.screenshot({
      path: `${out}/${prefix}-full.png`,
      fullPage: true,
    });
    if ((width === 390 || width === 1440) && locale === "fr") {
      for (const [name, selector] of [
        ["spooliq", ".project-spooliq"],
        ["loprim3d", ".project-loprim3d"],
        ["belofer", ".project-belofer"],
        ["capabilities", "#services"],
        ["about", "#about"],
        ["contact", "#contact"],
      ]) {
        const section = page.locator(selector);
        const box = await section.boundingBox();
        await page.setViewportSize({
          width,
          height: Math.max(height, Math.ceil(box.height) + 160),
        });
        await section.evaluate((el) =>
          el.scrollIntoView({ block: "center", behavior: "instant" }),
        );
        await page.waitForTimeout(200);
        await section.screenshot({ path: `${out}/${width}-${name}.png` });
        await page.setViewportSize({ width, height });
      }
    }
    await context.close();
  }
  await writeFile(`${out}/runtime.json`, JSON.stringify(report, null, 2));
  console.log(
    JSON.stringify(
      report.map(
        ({
          width,
          height,
          locale,
          overflow,
          pageHeight,
          animated,
          projects,
          errors,
          cta,
          image,
        }) => ({
          width,
          height,
          locale,
          overflow,
          pageHeight,
          animated,
          projects,
          errors,
          ctaBottom: cta.bottom,
          imageTop: image.top,
        }),
      ),
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
