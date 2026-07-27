import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://rlopes.pt";

// Keep this in sync with the routes exported from src/App.jsx.
const paths = ["/", "/portfolio", "/en", "/en/portfolio"];

const lastmod = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) =>
      `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
  )
  .join("\n")}
</urlset>
`;

const outPath = fileURLToPath(new URL("../dist/sitemap.xml", import.meta.url));
writeFileSync(outPath, xml);
console.log(`[sitemap] Generated dist/sitemap.xml with ${paths.length} URL(s)`);
