import http from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, "../..");
const routes = {
  "/": ["index.html", "text/html"],
  "/a": ["a.html", "text/html"],
  "/b": ["b.html", "text/html"],
  "/c": ["c.html", "text/html"],
  "/shared.css": ["shared.css", "text/css"],
  "/motion.js": ["motion.js", "text/javascript"],
};
const assets = {
  "/assets/spooliq.webp": [
    "public/projects/spooliq-dashboard.webp",
    "image/webp",
  ],
  "/assets/loprim3d.webp": ["public/projects/loprim3d.webp", "image/webp"],
  "/assets/belofer.webp": ["public/portfolio/web/belofer.webp", "image/webp"],
  "/assets/dm-sans.woff2": ["src/fonts/dm-sans.woff2", "font/woff2"],
  "/vendor/gsap.js": ["node_modules/gsap/dist/gsap.min.js", "text/javascript"],
  "/vendor/ScrollTrigger.js": [
    "node_modules/gsap/dist/ScrollTrigger.min.js",
    "text/javascript",
  ],
};
for (const concept of ["a", "b", "c"]) {
  for (const size of ["mobile", "desktop"]) {
    assets["/captures/" + concept + "-" + size + ".png"] = [
      ".impeccable/review/v25/" + concept + "-" + size + ".png",
      "image/png",
    ];
  }
}
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const match = routes[url.pathname] || assets[url.pathname];
  if (!match || !["GET", "HEAD"].includes(req.method)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  try {
    const data = await readFile(
      path.resolve(routes[url.pathname] ? dir : root, match[0]),
    );
    res.writeHead(200, {
      "Content-Type":
        match[1] + (match[1].startsWith("text/") ? "; charset=utf-8" : ""),
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});
server.listen(3250, "127.0.0.1", () =>
  console.log("V2.5 concept review: http://localhost:3250"),
);
