import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
await mkdir("public/projects", { recursive: true });
for (const [id, url] of [
  ["spooliq", "https://spooliq.io"],
  ["loprim3d", "https://loprim3d.fr"],
]) {
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.screenshot({ path: "public/projects/" + id + ".png" });
    await sharp("public/projects/" + id + ".png")
      .resize(1440)
      .webp({ quality: 85 })
      .toFile("public/projects/" + id + ".webp");
    console.log(id, await page.title());
    console.log(
      JSON.stringify(
        await page.locator("img").evaluateAll((imgs) =>
          imgs
            .map((i) => ({ alt: i.alt, src: i.src }))
            .filter((i) => i.src)
            .slice(0, 15),
        ),
      ),
    );
  } catch (e) {
    console.log(id, String(e));
  }
}
for (const url of [
  "https://loprim3d.fr/policies/legal-notice",
  "https://loprim3d.fr/policies/contact-information",
]) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    console.log(url, (await page.locator("main").innerText()).slice(0, 7000));
  } catch (e) {
    console.log(String(e));
  }
}
for (const repo of [
  "Foskiitus",
  "Foskiitus/ProjetoBoardTarefas",
  "Foskiitus/tempoApp",
  "Foskiitus/evently",
]) {
  const url = repo.includes("/")
    ? "https://api.github.com/repos/" + repo
    : "https://api.github.com/users/" + repo;
  const res = await fetch(url);
  const data = await res.json();
  console.log(
    JSON.stringify({
      repo,
      status: res.status,
      name: data.name,
      url: data.html_url,
      description: data.description,
      archived: data.archived,
    }),
  );
}
await browser.close();
