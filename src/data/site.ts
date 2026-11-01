export const site = {
  url: "https://rlopes.pt",
  name: "Ricardo Lopes",
  location: { locality: "La Ciotat", countryCode: "FR" },
  email: "contact@rlopes.pt",
  github: "https://github.com/Foskiitus",
  linkedin: "https://www.linkedin.com/in/rilopes/",
} as const;

// Public source: Loprim3D legal notice, accessed 2026-10-27.
// Confirm scope and complete null fields before production; see docs/LAUNCH.md.
export const business = {
  publisher: "Ricardo Lopes EI",
  address: "390 Avenue François Billoux, 13600 La Ciotat, France",
  phone: "+33 7 66 23 41 10",
  siren: "107 688 467",
  registrationScopeConfirmed: false,
  host: {
    name: "Netlify, Inc.",
    url: "https://www.netlify.com",
    address: null as string | null,
    phone: null as string | null,
  },
  retentionPolicyConfirmed: false,
};
export function isPreview() {
  const context = process.env.CONTEXT || process.env.NEXT_PUBLIC_DEPLOY_CONTEXT;
  return context !== "production";
}
