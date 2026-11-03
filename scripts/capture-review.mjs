import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir(".impeccable/review", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto("http://localhost:3100/fr", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: ".impeccable/review/desktop.png" });
await page.locator("#work").scrollIntoViewIfNeeded();
await page
  .locator(".work-gallery")
  .evaluate((el) =>
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 88,
      behavior: "instant",
    }),
  );
await page.waitForTimeout(800);
await page.screenshot({ path: ".impeccable/review/desktop-work.png" });
await page.getByRole("button", { name: "Projet suivant", exact: true }).click();
await page.waitForTimeout(800);
await page.screenshot({ path: ".impeccable/review/desktop-work-2.png" });
await page.getByRole("button", { name: "Projet suivant", exact: true }).click();
await page.waitForTimeout(800);
await page.screenshot({ path: ".impeccable/review/desktop-work-3.png" });
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto("http://localhost:3100/fr", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.locator("details").evaluate((el) => (el.open = true));
await page
  .locator("img")
  .evaluateAll((imgs) => imgs.forEach((img) => (img.loading = "eager")));
await page.waitForFunction(() =>
  Array.from(document.images).every(
    (img) => img.complete && img.naturalWidth > 0,
  ),
);
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.screenshot({
  path: ".impeccable/review/desktop-full.png",
  fullPage: true,
});
await page
  .locator("#contact")
  .evaluate((el) => el.scrollIntoView({ behavior: "instant" }));
await page.screenshot({ path: ".impeccable/review/desktop-contact.png" });
await page.setViewportSize({ width: 390, height: 844 });
await page.emulateMedia({ reducedMotion: "no-preference" });
await page.goto("http://localhost:3100/fr", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: ".impeccable/review/mobile.png" });
await page
  .locator("img")
  .evaluateAll((imgs) => imgs.forEach((img) => (img.loading = "eager")));
await page.waitForFunction(() =>
  Array.from(document.images).every(
    (img) => img.complete && img.naturalWidth > 0,
  ),
);
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.screenshot({
  path: ".impeccable/review/mobile-full.png",
  fullPage: true,
});
await page
  .locator("#contact")
  .evaluate((el) => el.scrollIntoView({ behavior: "instant" }));
await page.screenshot({ path: ".impeccable/review/mobile-contact.png" });
await page.setViewportSize({ width: 768, height: 1024 });
await page.goto("http://localhost:3100/pt", { waitUntil: "networkidle" });
await page.screenshot({ path: ".impeccable/review/tablet.png" });
await writeFile(
  ".impeccable/review/console.json",
  JSON.stringify(errors, null, 2),
);
console.log(
  "Captured desktop, mobile, tablet, three pinned project states and contact. Console errors:",
  errors,
);
await browser.close();
