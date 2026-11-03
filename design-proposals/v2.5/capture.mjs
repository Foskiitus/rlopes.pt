import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const out = path.join(root, ".impeccable/review/v25");
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = [];
try {
  for (const concept of ["a", "b", "c"]) {
    for (const [width, height] of [
      [390, 844],
      [360, 740],
      [375, 812],
      [430, 932],
      [768, 1024],
      [1440, 900],
    ]) {
      const context = await browser.newContext({
        viewport: { width, height },
        deviceScaleFactor: 1,
        isMobile: width < 768,
        hasTouch: width < 1100,
      });
      const page = await context.newPage();
      const errors = [],
        scripts = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("response", (res) => {
        if (res.request().resourceType() === "script") scripts.push(res.url());
      });
      await page.goto("http://localhost:3250/" + concept, {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(450);
      const suffix =
        width === 390 ? "mobile" : width === 1440 ? "desktop" : String(width);
      await page.screenshot({
        path: path.join(out, `${concept}-${suffix}.png`),
      });
      const metrics = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1: document.querySelector("h1").getBoundingClientRect().toJSON(),
        image: document
          .querySelector("main img")
          .getBoundingClientRect()
          .toJSON(),
        cta: document
          .querySelector("main .button")
          .getBoundingClientRect()
          .toJSON(),
        loaded: [...document.images].every(
          (img) =>
            img.loading === "lazy" || (img.complete && img.naturalWidth > 0),
        ),
        pin: !!document.querySelector(".is-pinned"),
        pageHeight: document.documentElement.scrollHeight,
      }));
      report.push({
        concept,
        width,
        height,
        ...metrics,
        errors,
        desktopScripts: scripts.filter((src) => src.includes("/vendor/")),
      });
      if (width === 1440 && concept === "c") {
        const trigger = await page.evaluate(
          () => window.ScrollTrigger.getAll().find((t) => t.pin)?.start,
        );
        await page.evaluate(
          (y) => scrollTo({ top: y + 550, behavior: "instant" }),
          trigger,
        );
        await page.waitForTimeout(600);
        await page.screenshot({
          path: path.join(out, "c-transition-store.png"),
        });
        await page.evaluate(
          (y) => scrollTo({ top: y + 1100, behavior: "instant" }),
          trigger,
        );
        await page.waitForTimeout(600);
        await page.screenshot({
          path: path.join(out, "c-transition-business.png"),
        });
      }
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.evaluate(async () => {
        document
          .querySelectorAll("img")
          .forEach((img) => (img.loading = "eager"));
        await Promise.all(
          [...document.images].map((img) => img.decode().catch(() => {})),
        );
        scrollTo({ top: 0, behavior: "instant" });
      });
      await page.waitForTimeout(100);
      if (width === 390 || width === 1440) {
        await page.screenshot({
          path: path.join(out, `${concept}-${suffix}-full.png`),
          fullPage: true,
        });
        const selected =
          concept === "a"
            ? ".canvas-loprim"
            : concept === "b"
              ? ".type-store"
              : ".exhibit-store";
        await page.locator(selected).screenshot({
          path: path.join(out, `${concept}-${suffix}-work.png`),
        });
      }
      await context.close();
    }
  }
  await writeFile(
    path.join(out, "runtime.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify(
      report.map(
        ({
          concept,
          width,
          height,
          overflow,
          loaded,
          pin,
          errors,
          desktopScripts,
          cta,
          image,
          pageHeight,
        }) => ({
          concept,
          width,
          height,
          overflow,
          loaded,
          pin,
          errors,
          desktopScripts: desktopScripts.length,
          ctaBottom: cta.bottom,
          imageTop: image.top,
          pageHeight,
        }),
      ),
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
