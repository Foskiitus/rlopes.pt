# Portfolio V2.5 — local verification

31 October 2026, Windows and installed Google Chrome, against the production build at http://localhost:3100. The existing development server on port 3000 remains available.

## Commands and outcomes

| Command | Result |
| --- | --- |
| npm run build | Passed; 13 static pages, locale/legal/privacy/metadata routes retained |
| npm run typecheck | Passed |
| npm run lint | Passed with zero ESLint warnings |
| npm test | 50 passed in 13.9 seconds |
| node scripts/capture-v25.mjs | Nine viewport/locale combinations; no overflow or console/runtime errors |
| Impeccable detect on changed UI files | One scan; 44 typography advisories against the prior design ramp; zero primary findings |

The tests were adapted to the selected three-project experience while retaining form, locale, SEO, factual history, accessibility, navigation, asset and fallback coverage. Additional checks cover all three project hashes and browser history, native reverse scrolling, distinct project frames, preservation of all nine records and images, and exact Netlify blueprint/submitted field parity. After the final recovery-copy adjustment, four targeted form/blueprint tests passed again (3.2 seconds), and the production build passed again. The first failed test round exposed a real sidebar stacking issue that obscured previous/next controls; it was fixed before the passing run. Visual review also corrected a legacy fixed line-height in the desktop contact heading.

Keyboard navigation activates ordinary document flow. Reduced motion and no JavaScript preserve readable project content. A response-body assertion confirms initial mobile JavaScript excludes ScrollTrigger; resize tests confirm the pin is created and removed without orphan spacers. Axe WCAG 2/2.1/2.2 A/AA checks passed in all locales. This is automated coverage, not a full accessibility certification.

Touch verification uses Chromium mobile emulation and CDP touchStart/touchMove/touchEnd events. Menu, language selection and contact work in that context. A reduced-height viewport retains form focus. These are browser simulations, not physical-device tests.

An additional mouse-wheel check advanced +540px twice and reversed twice at 1440×900: Loprim3D → Belofer → Loprim3D → SpoolIQ. The active navigation link and sole fully visible panel matched at each stop. Previous/next controls, direct selectors and exit to contact also passed.

## Captures

All local evidence is under .impeccable/review/v25-final/ (ignored by Git). Run the capture script after starting production port 3100 to regenerate the main matrix.

| Viewport | Locale | Evidence |
| --- | --- | --- |
| 360×740 | fr | 360-fr-hero.png / 360-fr-full.png |
| 390×844 | fr | 390-fr-hero.png / 390-fr-full.png |
| 430×932 | fr | 430-fr-hero.png / 430-fr-full.png |
| 768×1024 | fr | 768-fr-hero.png / 768-fr-full.png |
| 1440×900 | fr | 1440-fr-hero.png / 1440-fr-full.png |
| 375×812 | en | 375-en-hero.png / 375-en-full.png |
| 390×844 | pt | 390-pt-hero.png / 390-pt-full.png |
| 1440×900 | pt, en | 1440-pt-* and 1440-en-* |

Animated desktop stages: desktop-stage-spooliq.png, desktop-stage-loprim3d.png, desktop-stage-belofer.png. Section-only crops may use a taller capture viewport to fit the entire section and avoid compositor clipping. Full-page captures deliberately use reduced motion so every project is visible. Their native-flow page length differs from the pinned experience. Section captures use 390- and 1440- prefixes for each project, capabilities, About and contact. Additional mobile-menu.png, mobile-language.png and mobile-form-{validation,failure,pending,success}.png show interaction states; all form POSTs in these captures are mocked. Runtime and wheel evidence: runtime.json and interaction.json.

## Comparable mobile performance

Lighthouse 13, same local production origin, fresh Chrome runs, default simulated mobile throttling: 412×823, DPR 1.75, 4× CPU slowdown, 150ms RTT. Command for each version:

```sh
npx lighthouse http://localhost:3100/fr --chrome-flags="--headless" --output=json --output-path=.impeccable/review/v25-final/lighthouse-after.json --quiet
```

| Metric | V2.4 measured before edits | V2.5 |
| --- | ---: | ---: |
| Performance | 93 | 96 |
| LCP | 3.206 s | 2.793 s |
| CLS | 0 | 0 |
| Transferred JavaScript | 163,757 B | 164,020 B |
| Total transfer | 331,453 B | 318,186 B |
| Images | 106,827 B | 99,130 B |
| Stylesheets | 9,131 B | 7,472 B |
| Fonts | 37,232 B | 37,232 B |

Reports: lighthouse-before.json and lighthouse-after.json. The earlier V2.4 report recorded 95/2.87s; the fresh 93/3.206s sample is the appropriate same-session comparison. Lab scores vary and are not field measurements. LCP improved approximately 13% but remains above the 2.5s aspiration. JavaScript is essentially unchanged (+263 bytes); no new dependency was introduced.

## Delivery boundaries

The current form implementation follows the official [OpenNext Netlify Forms guidance](https://opennext.js.org/netlify/forms) and [Netlify setup guidance](https://docs.netlify.com/manage/forms/setup/), checked for this implementation. Local tests verify the URL-encoded POST endpoint, hidden form-name, seven matching fields, empty honeypot and translated UI states. Real Netlify receipt and notifications remain unverified until a Deploy Preview submission is checked in the dashboard.

No physical iOS/Android hardware or Safari/Firefox testing was performed. Existing business/hosting/retention confirmation items remain documented in [LAUNCH.md](LAUNCH.md); no invented details were added. Production remains untouched. See [V2.5.md](V2.5.md) for design review and implementation scope.

## Final review closure — 1 November 2026

The independent full review found no remaining material visual or interaction issue after correcting the capture and error-recovery copy. A documentation-only verdict then scored the sole persistence finding resolved and returned ship. DESIGN.md, PRODUCT.md and the schema-v2 design sidecar now agree with the implementation; token-reference and source-value verification passed. The first review attempt and the documenter were interrupted by usage limits; a fresh reviewer completed the independent review, and documentation completion was performed directly. No application changes followed the passing final form checks and captures.

## Professional contact update — 1 November 2026

The portfolio now uses contact@rlopes.pt for direct contact, footer, legal/privacy links, localized failure feedback and Person structured data. Prototype mailto actions were updated as well. The remaining contact@loprim3d.fr reference in docs/SOURCES.md explicitly documents the separate shop's contact history; Loprim3D records and project destinations are unchanged. No private forwarding address was accessed or written.

- npm run build, npm run typecheck and npm run lint: passed.
- npm test: all 50 existing tests passed in 12.7 seconds; the existing no-JavaScript contact expectation was updated to the professional address.
- Browser verification: all 18 mailto links across the nine localized homepage/legal/privacy routes use the official address. All three Person JSON-LD records include it. Footer presence and homepage overflow checks passed at 360, 390, 768 and 1440px.
- SHA-256 comparisons confirm ContactForm.tsx, contact validation, public/__forms.html and netlify.toml are byte-for-byte unchanged. Submission handling and the seven-field contract are preserved.
- Source search found no old portfolio-enquiry address in src, messages, public or the prototype HTML. Footer captures and route evidence are stored locally in .impeccable/review/contact-email/.

The checked-in Netlify configuration has no notification recipient. [LAUNCH.md](LAUNCH.md#professional-email-and-netlify-notifications) documents the separate Forms → Submission notifications setting for project-enquiry to contact@rlopes.pt and subsequent private delivery verification. Dashboard settings were not changed, and no test message, push, merge or deployment was performed. Branch remains v2.
