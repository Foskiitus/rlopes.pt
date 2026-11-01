import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const out = process.env.REVIEW_OUTPUT || ".impeccable/review/v24";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const origin = process.env.REVIEW_ORIGIN || "http://localhost:3000";
const report = [];
for (const [width, height, locale] of [
  [390, 844, "fr"],
  [360, 740, "fr"],
  [375, 812, "en"],
  [430, 932, "pt"],
  [768, 1024, "pt"],
  [1440, 900, "fr"],
]) {
  const context = await browser.newContext({
    viewport: { width, height },
    isMobile: width < 768,
    hasTouch: width < 1024,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (["warning", "error"].includes(m.type())) errors.push(m.text());
  });
  await page.goto(origin + "/" + locale, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${out}/${width}-hero.png` });
  const metrics = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth,
    pageHeight: document.documentElement.scrollHeight,
    animatedGallery: !!document.querySelector(".work-gallery.is-animated"),
    heroImages: [...document.querySelectorAll(".hero img")]
      .filter((el) => el.getBoundingClientRect().width > 0)
      .map((el) => ({
        loaded: el.complete && el.naturalWidth > 0,
        ...Object.fromEntries(
          ["x", "y", "width", "height"].map((k) => [
            k,
            el.getBoundingClientRect()[k],
          ]),
        ),
      })),
    fontSizes: [
      ...document.querySelectorAll(
        ".project-description,.service p,.process p,.about-copy>p:not(.about-role),.contact-locality",
      ),
    ].map((el) => getComputedStyle(el).fontSize),
    issues: [...document.querySelectorAll("nextjs-portal")].flatMap((n) =>
      [...n.shadowRoot.querySelectorAll("[data-issues-open]")].map(
        (el) => el.innerText,
      ),
    ),
  }));
  if (width === 1440) {
    await page.locator(".work-gallery").evaluate((el) =>
      scrollTo({
        top: el.getBoundingClientRect().top + scrollY - 88,
        behavior: "instant",
      }),
    );
    await page.waitForTimeout(550);
    await page.screenshot({ path: `${out}/desktop-work-1.png` });
    await page
      .getByRole("button", { name: "Projet suivant", exact: true })
      .click();
    await page.waitForTimeout(550);
    await page.screenshot({ path: `${out}/desktop-work-2.png` });
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page
    .locator("img")
    .evaluateAll((imgs) => imgs.forEach((img) => (img.loading = "eager")));
  await page.waitForFunction(() =>
    [...document.images].every((img) => img.complete && img.naturalWidth > 0),
  );
  for (const [name, selector] of [
    ["featured", ".project-stage"],
    ["commercial", ".commercial-grid"],
    ["archives", ".archive-grid"],
    ["services", ".services-section"],
    ["process", ".approach"],
    ["about", ".about-section"],
    ["contact", ".contact-section"],
    ["footer", ".site-footer"],
  ]) {
    if ([390, 360, 768, 1440].includes(width)) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(120);
      await page
        .locator(selector)
        .screenshot({ path: `${out}/${width}-${name}.png` });
    }
  }
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${out}/${width}-full.png`, fullPage: true });
  report.push({ width, height, locale, ...metrics, errors });
  await context.close();
}
await writeFile(`${out}/runtime.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
