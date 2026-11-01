import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { writeFile, readFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
const check = (name, condition) => {
  assert.ok(condition, name);
  results.push(name);
};
try {
  for (const concept of ["a", "b", "c"]) {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({
        viewport: { width, height: width === 390 ? 844 : 900 },
        hasTouch: width === 390,
        isMobile: width === 390,
      });
      const page = await context.newPage();
      await page.goto("http://localhost:3250/" + concept, {
        waitUntil: "networkidle",
      });
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      check(
        concept +
          " " +
          width +
          " Axe: " +
          JSON.stringify(
            axe.violations.map((v) => ({
              id: v.id,
              nodes: v.nodes.map((n) => n.target),
            })),
          ),
        axe.violations.length === 0,
      );
      if (width === 390) {
        await page.locator("main .button").first().tap();
        await page.waitForTimeout(700);
        const rect = await page.locator("#contact").boundingBox();
        check(
          concept + " touch contact anchor",
          rect.y >= -2 &&
            rect.y < 600 &&
            new URL(page.url()).hash === "#contact",
        );
        check(
          concept + " native mobile flow",
          (await page.locator(".pin-spacer").count()) === 0,
        );
      }
      await context.close();
    }
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3250/c", { waitUntil: "networkidle" });
  for (const name of ["loprim3d", "belofer", "spooliq"]) {
    await page.locator('.exhibit-nav a[href="#' + name + '"]').click();
    await page.waitForTimeout(1200);
    check(
      "C navigation " + name,
      await page
        .locator("#" + name)
        .evaluate(
          (el) => !el.inert && Number(getComputedStyle(el).opacity) > 0.99,
        ),
    );
  }
  await page.locator(".exhibit-nav a").first().focus();
  await page.keyboard.press("Tab");
  check(
    "C keyboard switches to readable flow",
    (await page.locator(".is-pinned").count()) === 0,
  );
  check(
    "C keyboard all projects accessible",
    await page
      .locator(".exhibit")
      .evaluateAll((els) =>
        els.every(
          (el) => !el.inert && getComputedStyle(el).visibility === "visible",
        ),
      ),
  );
  await page.reload({ waitUntil: "networkidle" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(150);
  check(
    "C mobile resize clears pin",
    (await page.locator(".pin-spacer").count()) === 0,
  );
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(250);
  check(
    "C desktop resize restores motion",
    (await page.locator(".is-pinned").count()) === 1,
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(100);
  check(
    "C reduced motion disposes timeline",
    (await page.locator(".is-pinned").count()) === 0 &&
      (await page.locator(".pin-spacer").count()) === 0,
  );
  await context.close();
  for (const concept of ["a", "b", "c"]) {
    const plain = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const p = await plain.newPage();
    await p.goto("http://localhost:3250/" + concept);
    check(
      concept + " no JavaScript: content and contact",
      (await p.locator("h2").count()) === 4 &&
        (await p.locator('a[href^="mailto:"]').count()) === 1,
    );
    await plain.close();
  }
  const runtime = JSON.parse(
    await readFile(".impeccable/review/v25/runtime.json", "utf8"),
  );
  for (const row of runtime) {
    check(
      row.concept + " " + row.width + " no overflow or runtime errors",
      !row.overflow && row.errors.length === 0 && row.loaded,
    );
    if (row.width < 1100)
      check(
        row.concept + " " + row.width + " no desktop bundle",
        row.desktopScripts.length === 0 && !row.pin,
      );
  }
  await writeFile(
    ".impeccable/review/v25/validation.json",
    JSON.stringify({ passed: results.length, checks: results }, null, 2),
  );
  console.log(results.length + " concept checks passed.");
} finally {
  await browser.close();
}
