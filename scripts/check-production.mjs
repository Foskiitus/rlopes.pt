import { readFileSync } from "node:fs";
const source = readFileSync("src/data/site.ts", "utf8");
const issues = [];
if (source.includes("registrationScopeConfirmed: false"))
  issues.push(
    "Confirm that the sourced business identity, address, SIREN and VAT regime apply to this activity.",
  );
if (source.includes("address: null") || source.includes("phone: null"))
  issues.push("Complete verified hosting address and telephone.");
if (source.includes("retentionPolicyConfirmed: false"))
  issues.push(
    "Confirm and implement the stated 12-month enquiry retention policy.",
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
