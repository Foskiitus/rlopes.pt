import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const out = ".impeccable/review/rework";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
const report = [];
page.on("pageerror", (e) =>
  errors.push({ type: "pageerror", text: e.message }),
);
page.on("console", (m) => {
  if (["error", "warning"].includes(m.type()))
    errors.push({ type: m.type(), text: m.text() });
});
const origin = process.env.REVIEW_ORIGIN || "http://localhost:3101";
for (const [name, width, height, locale] of [
  ["desktop", 1440, 900, "fr"],
  ["mobile", 390, 844, "fr"],
  ["tablet", 768, 1024, "pt"],
  ["small", 360, 740, "en"],
]) {
  await page.setViewportSize({ width, height });
  await page.goto(origin + "/" + locale, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${out}/${name}.png` });
  report.push({
    name,
    words: (await page.locator("main").innerText()).split(/\s+/).length,
    ...(await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      heroImages: [...document.querySelectorAll(".hero img")].map((img) => ({
        loaded: img.complete && img.naturalWidth > 0,
        top: img.getBoundingClientRect().top,
        bottom: img.getBoundingClientRect().bottom,
        width: img.getBoundingClientRect().width,
      })),
      issues: [...document.querySelectorAll("nextjs-portal")].flatMap((n) =>
        [...n.shadowRoot.querySelectorAll("[data-issues-open]")].map(
          (el) => el.innerText,
        ),
      ),
    }))),
  });
  if (["desktop", "mobile"].includes(name)) {
    if (name === "desktop") {
      await page
        .locator(".work-gallery")
        .evaluate((el) =>
          scrollTo({
            top: el.getBoundingClientRect().top + scrollY - 88,
            behavior: "instant",
          }),
        );
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${out}/work-1.png` });
      for (const i of [2, 3]) {
        await page
          .getByRole("button", { name: "Projet suivant", exact: true })
          .click();
        await page.waitForTimeout(600);
        await page.screenshot({ path: `${out}/work-${i}.png` });
      }
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(origin + "/" + locale, { waitUntil: "networkidle" });
    await page
      .locator("img")
      .evaluateAll((imgs) => imgs.forEach((img) => (img.loading = "eager")));
    await page.waitForFunction(() =>
      [...document.images].every((img) => img.complete && img.naturalWidth > 0),
    );
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
    await page
      .locator("#contact")
      .evaluate((el) => el.scrollIntoView({ behavior: "instant" }));
    await page.screenshot({ path: `${out}/${name}-contact.png` });
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }
}
await writeFile(
  `${out}/runtime.json`,
  JSON.stringify({ report, errors }, null, 2),
);
console.log(JSON.stringify({ report, errors }, null, 2));
await browser.close();
