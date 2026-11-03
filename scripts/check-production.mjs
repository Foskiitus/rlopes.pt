import { readFileSync } from "node:fs";
const source = readFileSync("src/data/site.ts", "utf8");
const issues = [];
if (source.includes("registrationScopeConfirmed: false"))
  issues.push(
    "Owner must confirm the complete civil name, professional domiciliation and current registration; see docs/PRODUCTION-MIGRATION.md.",
  );
if (source.includes("vatRegimeConfirmed: false"))
  issues.push(
    "Confirm the applicable VAT regime; absence of a valid VAT number does not prove an exemption.",
  );
if (source.includes("address: null") || source.includes("phone: null"))
  issues.push("Complete verified hosting address and telephone.");
if (source.includes("retentionPolicyConfirmed: false"))
  issues.push(
    "Apply the manual retention and archiving procedure by document category in docs/DATA-RETENTION.md.",
  );
if (issues.length) {
  console.error(
    "Production launch items:\n" + issues.map((x) => "- " + x).join("\n"),
  );
  process.exitCode = 1;
} else
  console.log(
    "Local legal fields complete. Also verify a real Netlify Forms submission and notifications before launch.",
  );
