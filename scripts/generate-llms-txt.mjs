import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { PortfolioData } from "../data.js";

const SITE_URL = "https://rlopes.pt";

const featured = PortfolioData.filter((project) => project.featured).sort(
  (a, b) => b.id - a.id
);
const rest = PortfolioData.filter((project) => !project.featured).sort(
  (a, b) => b.id - a.id
);

function projectLine(project) {
  const link = project.link ? ` (${project.link})` : "";
  return `- ${project.title}${link}: ${project.desc.en}`;
}

const lines = [
  "# Ricardo Lopes",
  "",
  "> Full-stack developer based in Barcelos, Portugal. Builds websites and " +
    "web applications with React, Next.js and Node.js for businesses in the " +
    "Minho region and beyond. The site is available in Portuguese (default) " +
    "and English.",
  "",
  "## Pages",
  "",
  `- [Home (Portuguese)](${SITE_URL}/): introduction, skills and featured projects.`,
  `- [Home (English)](${SITE_URL}/en): English version of the homepage.`,
  `- [Portfolio (Portuguese)](${SITE_URL}/portfolio): full list of web and mobile projects, filterable by type.`,
  `- [Portfolio (English)](${SITE_URL}/en/portfolio): English version of the portfolio.`,
  "",
  "## Skills",
  "",
  "HTML, CSS, JavaScript, TypeScript, React, Next.js, Node, Tailwind CSS, Bootstrap, Git.",
  "",
  "## Featured projects",
  "",
  ...featured.map(projectLine),
  "",
  "## Other projects",
  "",
  ...rest.map(projectLine),
  "",
  "## Contact",
  "",
  "- LinkedIn: https://www.linkedin.com/in/rilopes/",
  "- GitHub: https://github.com/Foskiitus",
  `- Contact form: ${SITE_URL}/#contact`,
  "",
];

const outPath = fileURLToPath(new URL("../dist/llms.txt", import.meta.url));
writeFileSync(outPath, lines.join("\n"));
console.log(
  `[llms.txt] Generated dist/llms.txt with ${PortfolioData.length} project(s)`
);
