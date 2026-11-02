import { readFileSync } from "node:fs";
const source = readFileSync("src/data/site.ts", "utf8");
const issues = [];
if (source.includes("registrationScopeConfirmed: false"))
  issues.push(
    "Owner must confirm the complete civil name, professional domiciliation, current registration and VAT regime; see docs/V2-FINAL-RELEASE.md.",
  );
if (source.includes("address: null") || source.includes("phone: null"))
  issues.push("Complete verified hosting address and telephone.");
if (source.includes("retentionPolicyConfirmed: false"))
  issues.push(
    "Adopt and execute the manual 12-month enquiry retention procedure in docs/V2-FINAL-RELEASE.md.",
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
