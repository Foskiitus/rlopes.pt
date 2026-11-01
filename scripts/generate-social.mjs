import { chromium } from "@playwright/test";
import { readFile, mkdir } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const font = (await readFile("src/fonts/dm-sans.woff2")).toString("base64");
const dashboard = (
  await readFile("public/projects/spooliq-dashboard.webp")
).toString("base64");
await mkdir("public/og", { recursive: true });
for (const locale of ["fr", "pt", "en"]) {
  const m = JSON.parse(await readFile(`messages/${locale}.json`, "utf8"));
  await page.setContent(
    `<html><head><style>@font-face{font-family:DM;src:url(data:font/woff2;base64,${font});font-weight:100 1000}*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#fafaf7;color:#141414;padding:42px 50px;font-family:DM;overflow:hidden}.top{display:flex;justify-content:space-between;font-size:24px;font-weight:700}.url{font-size:18px;font-weight:500}h1{position:relative;z-index:2;font-size:72px;font-weight:760;line-height:1.06;letter-spacing:-.04em;margin:88px 0 26px}h1 span{display:table;background:#d0f844;padding:0 6px 6px;margin-left:-6px}p{position:relative;z-index:2;font-size:18px;width:360px;font-weight:550;line-height:1.5}.image{position:absolute;left:660px;top:110px;width:525px}.tag{position:absolute;bottom:35px;right:60px;background:#141414;color:#fff;font-size:17px;padding:10px 15px;border-radius:8px}</style></head><body><div class="top"><span>ricardo lopes.</span><span class="url">rlopes.pt / ${locale}</span></div><h1>${m.hero.line1}<br><span>${m.hero.line2}</span></h1><p>${m.hero.role}<br>${m.hero.locality}</p><img class="image" src="data:image/webp;base64,${dashboard}" alt=""><div class="tag">SpoolIQ — ${m.hero.software}</div></body></html>`,
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og/${locale}.png` });
}
await browser.close();
console.log(
  "Updated three local social images from the new typography and authentic product image.",
);
