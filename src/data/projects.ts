export type ProjectHistory = {
  source: string;
  started?: string;
  stopped?: string;
  approximateActiveYears?: number;
  context?: string;
  documentedAreas?: readonly string[];
  verifiedVisuals?: readonly string[];
  plannedOnly?: readonly string[];
  plannedWorkflow?: readonly string[];
  discontinuationReason?: string;
};
export type Project = {
  id:
    | "spooliq"
    | "loprim3d"
    | "photocelos"
    | "belofer"
    | "tecniwall"
    | "gestao-stocks"
    | "tarefas"
    | "evently"
    | "tempo";
  name: string;
  group: "own" | "commercial" | "personal";
  status: "live" | "archived" | "source";
  image: string;
  width: number;
  height: number;
  url?: string;
  github?: string;
  featuredOrder?: number;
  archiveOrder?: number;
  // Provenance and history stay in server-side records, outside public gallery copy.
  technologies?: readonly string[];
  historicalUrl?: string;
  screenshot?: { source: string; demonstrationData?: boolean };
  history?: ProjectHistory;
};
export const projects: Project[] = [
  {
    id: "spooliq",
    name: "SpoolIQ",
    group: "own",
    status: "live",
    image: "/projects/spooliq-dashboard.webp",
    width: 1600,
    height: 1600,
    url: "https://spooliq.io",
    featuredOrder: 1,
  },
  {
    id: "loprim3d",
    name: "Loprim3D",
    group: "own",
    status: "live",
    image: "/projects/loprim3d.webp",
    width: 1440,
    height: 900,
    url: "https://loprim3d.fr",
    featuredOrder: 2,
    technologies: ["Shopify"],
  },
  {
    id: "belofer",
    name: "Belofer",
    featuredOrder: 3,
    group: "commercial",
    status: "archived",
    image: "/portfolio/web/belofer.webp",
    width: 960,
    height: 492,
  },
  {
    id: "tecniwall",
    name: "Tecniwall",
    group: "commercial",
    status: "archived",
    image: "/portfolio/web/tecniwall.webp",
    width: 960,
    height: 492,
  },
  {
    id: "gestao-stocks",
    name: "Gestão de Stocks",
    group: "personal",
    status: "archived",
    archiveOrder: 1,
    image: "/projects/gestao-stocks-dashboard.webp",
    width: 2699,
    height: 1955,
    historicalUrl: "https://stocks.rlopes.pt",
    screenshot: {
      source:
        "Owner-supplied recovered application capture: public/projects/gestao-stocks-dashboard.png",
      demonstrationData: true,
    },
    history: {
      source:
        "Owner's V2.2 brief and recovered dashboard screenshot; original application README not supplied in this repository.",
      started: "2021",
      stopped: "2023-01",
      context:
        "Developed while managing a textile warehouse producing flat-knitted garments, to improve access to inventory held in an Excel spreadsheet on one computer. Responsive mobile access was an intention, not independently verified. Development stopped when Ricardo moved to France.",
      documentedAreas: [
        "Yarn suppliers",
        "Yarn products",
        "Colors",
        "Warehouse sectors",
        "Lots",
        "Inventory entries",
        "Inventory exits",
        "Stock consultation",
        "Yarn reservations",
        "Material compositions",
        "Clients",
        "Sales representatives",
        "User administration",
        "Dashboard and inventory charts",
      ],
      verifiedVisuals: [
        "Warehouse and administrative navigation",
        "Dashboard module shortcuts",
        "Monthly inventory-entry chart using demonstration data",
      ],
      plannedOnly: [
        "Customer orders",
        "Production orders",
        "Production tracking",
      ],
      plannedWorkflow: [
        "Design",
        "Knitting",
        "Cutting",
        "Washing",
        "Linking",
        "Packaging",
        "Ready for dispatch",
      ],
    },
  },
  {
    id: "photocelos",
    name: "PhotoCelos",
    group: "personal",
    status: "archived",
    archiveOrder: 2,
    image: "/portfolio/web/photocelos.webp",
    width: 960,
    height: 492,
    historicalUrl: "https://photocelos.pt",
    history: {
      source: "Owner's V2.2 brief and original portfolio screenshot",
      approximateActiveYears: 4,
      context:
        "Personal platform presenting the cultural and architectural heritage of Barcelos through 360-degree panoramic photography.",
      plannedOnly: [
        "Expansion to other municipalities",
        "Advertising placements for local businesses as a potential business model; no revenue claim",
      ],
      discontinuationReason:
        "Discontinued after Google Maps developed comparable functionality, reducing differentiation; no acquisition or integration occurred.",
    },
  },
  {
    id: "tarefas",
    name: "Tarefas+",
    group: "personal",
    status: "source",
    image: "/portfolio/web/tarefas.webp",
    width: 960,
    height: 492,
    github: "https://github.com/Foskiitus/ProjetoBoardTarefas",
    technologies: ["Next.js 14.2.3"],
    history: {
      source: "Public README and package.json",
      context:
        "Learning project from the Udemy course Nextjs do Basico ao avançado.",
    },
  },
  {
    id: "evently",
    name: "Evently",
    group: "personal",
    status: "archived",
    image: "/portfolio/web/evently.svg",
    width: 480,
    height: 200,
    github: "https://github.com/Foskiitus/evently",
    technologies: ["Next.js 14.0.4"],
    history: {
      source: "Public README and package.json",
      context: "Learning project following the JavaScript Mastery tutorial.",
    },
  },
  {
    id: "tempo",
    name: "TempoApp",
    group: "personal",
    status: "archived",
    image: "/portfolio/mobile/tempoApp.webp",
    width: 960,
    height: 492,
    github: "https://github.com/Foskiitus/tempoApp",
    technologies: ["JavaScript"],
  },
];
export const featuredProjects = projects
  .filter((p) => p.featuredOrder)
  .sort((a, b) => a.featuredOrder! - b.featuredOrder!);
export const archivedProjects = projects
  .filter((p) => p.archiveOrder)
  .sort((a, b) => a.archiveOrder! - b.archiveOrder!);
