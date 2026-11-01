import { chromium } from "@playwright/test";
import { mkdir, unlink } from "node:fs/promises";
import sharp from "sharp";
await mkdir("public/projects", { recursive: true });
const response = await fetch(
  "https://spooliq.io/images/landing/dashboard-overview.webp",
);
if (!response.ok) throw new Error("SpoolIQ source image unavailable");
await sharp(Buffer.from(await response.arrayBuffer()))
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 88 })
  .toFile("public/projects/spooliq-dashboard.webp");
console.log(
  "Dashboard",
  await sharp("public/projects/spooliq-dashboard.webp").metadata(),
);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await page.goto("https://loprim3d.fr", { waitUntil: "networkidle" });
const refuse = page.getByRole("button", { name: "Refuser", exact: true });
if (await refuse.isVisible()) {
  await refuse.click();
  await refuse.waitFor({ state: "hidden", timeout: 15000 });
}
await page.screenshot({ path: "public/projects/loprim3d.png" });
await sharp("public/projects/loprim3d.png")
  .webp({ quality: 85 })
  .toFile("public/projects/loprim3d.webp");
await browser.close();
for (const name of ["spooliq.png", "spooliq.webp", "loprim3d.png"])
  await unlink("public/projects/" + name).catch(() => {});
await import("./generate-social.mjs");
