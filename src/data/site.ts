export const site = {
  url: "https://rlopes.pt",
  name: "Ricardo Lopes",
  location: { locality: "La Ciotat", countryCode: "FR" },
  email: "contact@rlopes.pt",
  github: "https://github.com/Foskiitus",
  linkedin: "https://www.linkedin.com/in/rilopes/",
} as const;

// Public sources rechecked 2026-11-02: Loprim3D, official company API and BODACC.
// Owner must confirm full civil name, domiciliation and VAT before publication.
// Source details and pending confirmations: docs/V2-FINAL-RELEASE.md.
export const business = {
  publisher: "Ricardo Silva Lopes EI",
  address: "Bâtiment 13, 390 Avenue François Billoux, 13600 La Ciotat, France",
  phone: "+33 7 66 23 41 10",
  siren: "107 688 467",
  register: "RCS Marseille",
  registrationScopeConfirmed: false,
  host: {
    name: "Netlify, Inc.",
    url: "https://www.netlify.com",
    // Netlify Website Terms of Use, section 15, verified 2026-11-02.
    address: "101 2nd Street, San Francisco, CA 94105, United States",
    phone: null as string | null,
  },
  retentionPolicyConfirmed: false,
};
export function isPreview() {
  const context = process.env.CONTEXT || process.env.NEXT_PUBLIC_DEPLOY_CONTEXT;
  return context !== "production";
}
