export const site = {
  url: "https://rlopes.pt",
  name: "Ricardo Lopes",
  location: { locality: "La Ciotat", countryCode: "FR" },
  email: "contact@rlopes.pt",
  github: "https://github.com/Foskiitus",
  linkedin: "https://www.linkedin.com/in/rilopes/",
} as const;

// Identity, SIRET, Insee/RNE dates and activity confirmed by owner on 2026-11-03.
// RCS Marseille corroborated in BODACC on 2026-11-02; VAT remains unconfirmed.
// Sources and outstanding launch items: docs/PRODUCTION-MIGRATION.md.
export const business = {
  publisher: "Ricardo SILVA LOPES EI",
  address: "Bâtiment 13, 390 Avenue François Billoux, 13600 La Ciotat, France",
  phone: "+33 7 66 23 41 10",
  siren: "107 688 467",
  siret: "107 688 467 00011",
  inseeRegisteredOn: "2026-07-15",
  rneRegisteredOn: "2026-08-01",
  ape: "62.01Z",
  register: "RCS Marseille",
  registrationScopeConfirmed: true,
  vatRegimeConfirmed: false,
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
