import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const mode = process.argv[2];
assert.ok(
  ["preview", "production"].includes(mode),
  "Usage: node scripts/check-build-seo.mjs preview|production",
);
const root = ".next/server/app/";
const routes = JSON.parse(readFileSync(".next/routes-manifest.json", "utf8"));
const previewHeader = routes.headers.some(
  (rule) =>
    rule.source === "/:path*" &&
    rule.headers.some(
      (header) =>
        header.key.toLowerCase() === "x-robots-tag" &&
        /noindex/.test(header.value),
    ),
);
assert.equal(
  previewHeader,
  mode === "preview",
  "Preview HTTP header must not leak into production",
);
const origin = "https://rlopes.pt";
const locales = ["fr", "pt", "en"];
const paths = ["", "/legal", "/privacy"];
const attrs = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([^\s=<>]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]),
  );
const pages = [];
for (const locale of locales) {
  for (const path of paths) {
    const route = "/" + locale + path;
    const html = readFileSync(root + locale + path + ".html", "utf8");
    const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attrs(m[0]));
    const links = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attrs(m[0]));
    const value = (key) =>
      meta.find((m) => m.name === key || m.property === key)?.content;
    assert.match(
      html,
      new RegExp(
        '<html[^>]+lang="' + (locale === "pt" ? "pt-PT" : locale) + '"',
      ),
    );
    assert.ok(html.match(/<title>([^<]+)<\/title>/)?.[1], route + " title");
    assert.ok(value("description"), route + " description");
    assert.equal(
      links.find((l) => l.rel === "canonical")?.href,
      origin + route,
    );
    assert.equal(value("og:url"), origin + route);
    assert.equal(value("og:image"), origin + "/og/" + locale + ".png");
    assert.equal(value("twitter:image"), origin + "/og/" + locale + ".png");
    assert.equal(value("twitter:card"), "summary_large_image");
    const alternate = links.filter((l) => l.hrefLang || l.hreflang);
    assert.equal(alternate.length, 4, route + " hreflang count");
    for (const [language, target] of [
      ["fr", "fr"],
      ["pt-PT", "pt"],
      ["en", "en"],
      ["x-default", "fr"],
    ]) {
      assert.equal(
        alternate.find((l) => (l.hrefLang || l.hreflang) === language)?.href,
        origin + "/" + target + path,
      );
    }
    const robots = value("robots")?.split(/,\s*/).sort();
    assert.deepEqual(
      robots,
      mode === "production" ? ["follow", "index"] : ["nofollow", "noindex"],
      route + " robots",
    );
    if (!path) {
      const json = JSON.parse(
        html.match(
          /<script type="application\/ld\+json">([^<]+)<\/script>/,
        )?.[1] || "null",
      );
      const person = json?.["@graph"]?.find(
        (item) => item["@type"] === "Person",
      );
      assert.equal(person?.email, "contact@rlopes.pt");
      assert.equal(person?.address?.addressLocality, "La Ciotat");
      assert.equal(person?.address?.addressCountry, "FR");
    }
    pages.push(origin + route);
  }
}
const sitemap = readFileSync(root + "sitemap.xml.body", "utf8");
assert.deepEqual(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort(),
  pages.sort(),
);
const robots = readFileSync(root + "robots.txt.body", "utf8");
assert.ok(robots.includes("Sitemap: " + origin + "/sitemap.xml"));
if (mode === "production") {
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, /^Disallow: \/__forms\.html$/m);
  assert.doesNotMatch(robots, /^Disallow: \/$/m);
} else {
  // Crawlers must be able to read the noindex metadata and HTTP header.
  assert.match(robots, /^Allow: \/$/m);
  assert.doesNotMatch(robots, /^Disallow: \/$/m);
}
assert.match(
  readFileSync("public/__forms.html", "utf8"),
  /name="robots" content="noindex,nofollow"/,
);
console.log(
  `SEO ${mode}: 9 pages, canonical URLs, languages, sharing metadata, JSON-LD, sitemap and robots passed.`,
);
