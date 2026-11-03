# Ricardo Lopes — Portfolio V2.5

A multilingual portfolio for independent web development in La Ciotat and the surrounding area. Next.js App Router, TypeScript, Tailwind CSS, next-intl and GSAP. Work remains on local branch `v2`; production remains on `master`.

## Run locally

Use Node.js 22 (see .nvmrc) and npm:

```sh
npm ci
npm run dev
```

Open http://localhost:3000/fr. Complete homepages are available at /fr, /pt and /en. The root defaults to French and remembers an explicitly selected language. No database or email API credentials are required.

To inspect the production build:

```sh
npm run build
npm run start -- --port 3100
```

## Verify

```sh
npm run lint
npm run typecheck
npm run build
npm test
node scripts/capture-v25.mjs
```

Playwright uses Google Chrome and starts the production server on port 3100 when necessary. If Chrome is absent, install it with `npx playwright install chrome`. Tests mock contact POST requests; they never send enquiries. The capture script expects the local production server to be running. Captures and measurements are local, ignored artifacts under .impeccable/review/v25-final/.

`npm run check:production` separately reports existing legal and operational launch items. Its current exit status 1 does not prevent local builds or Deploy Previews. See [validation](docs/VALIDATION.md) and [launch instructions](docs/LAUNCH.md).

## Approved design

V2.5 implements the owner's selection: Concept C's continuous interactive showcase with Concept B's expressive DM Sans typography. Warm white, near-black and lime remain the visual identity. One authentic SpoolIQ image connects the opening to its project details. Exactly three projects appear: **SpoolIQ, Loprim3D and Belofer**. The latter is explicitly archived, with a link to its existing screenshot.

Phones use native vertical scrolling, a compact header, a visible contact CTA and large product imagery in the first viewport. Project navigation stays accessible while exploring the sequence. Three concise capabilities, a short factual introduction and the complete lime contact form finish the page. There is no process section or historical gallery.

At widths of at least 1100px, heights of at least 680px and without reduced motion, a dynamically imported GSAP module enhances the same semantic content. A short pinned sequence changes image framing, scale, masks and text. Project links, previous/next buttons, browser history and backward scrolling stay synchronized. Keyboard use switches the gallery to document flow; visitors can also disable transitions explicitly. Mobile does not download ScrollTrigger on its initial visit. Reduced motion and JavaScript-disabled reading retain all three projects.

[Design system](DESIGN.md) · [V2.5 implementation report](docs/V2.5.md) · [direction contract](.impeccable/surface-brief.md).

## Architecture and maintenance

- src/app/[locale]: server-rendered homepages, legal/privacy pages and localized errors.
- src/components: shared navigation, selected work, optional desktop motion, image fallback and form behavior.
- src/app/globals.css: phone-first compositions, progressively enhanced at 768, 1024 and 1100px.
- messages/{fr,pt,en}.json: complete localized interface, project, validation and SEO copy.
- src/data/projects.ts: all nine verified records, historical evidence and assets. Only records with featuredOrder appear in the homepage selection.
- src/i18n, src/proxy.ts and src/lib/metadata.ts: locale prefixes, preference, legacy redirects, canonical/hreflang and preview indexing policy.
- public/__forms.html: static Netlify form blueprint; its field names must match ContactForm.tsx exactly.
- public/projects, public/portfolio and public/og: authentic project materials and local social images.
- src/fonts: locally hosted DM Sans and its OFL licence. Unused Newsreader files and its development package were removed in the pre-launch audit.
- tests/portfolio.spec.ts: functional, accessibility, content, SEO and responsive checks.

Edit project facts and corresponding translations together. Preserve correct image dimensions and real destinations. Historical Tecniwall, Gestão de Stocks, PhotoCelos, Tarefas+, Evently and TempoApp records and assets remain available internally; they have no new public gallery or project routes. Dates and technologies stay internal. The existing About illustration is identified as such in its alt text.

`node scripts/generate-social.mjs` regenerates only the three sharing images using Chrome, local DM Sans and the authentic SpoolIQ screenshot. `node scripts/prepare-assets.mjs` refreshes public project materials as well. Review generated images before committing. Asset provenance is in [SOURCES.md](docs/SOURCES.md).

## Contact and deployment

Netlify Forms receives URL-encoded AJAX POSTs at /__forms.html. The static blueprint, hidden form-name, locale and honeypot are preserved, with accessible validation and pending/success/error states. The official professional contact and direct email fallback is contact@rlopes.pt. There is no CMS, database, analytics SDK or custom email service.

Changing the public email does not change the Netlify notification recipient. Configure an email notification for project-enquiry to contact@rlopes.pt under Forms → Submission notifications; keep the forwarding mailbox private. Local tests verify application behavior and field parity, not Netlify delivery. Follow [LAUNCH.md](docs/LAUNCH.md) to create a Deploy Preview, confirm form detection and send a labelled test using an address controlled by the owner. Verify the dashboard record and notification before production.

The independent [concept prototypes](design-proposals/v2.5/README.md) remain as historical review artifacts on port 3250. They are outside the Next app and are not deployed routes. The owner selected C + B; no further direction decision is pending.

Earlier reports remain historical: [V2.4](docs/V2.4.md), [V2.3](docs/V2.3.md), [V2.2](docs/V2.2.md), [initial correction](docs/REWORK.md). The existing working tree includes the earlier Vite-to-Next migration; no commit, push, merge or deployment was made for V2.5.

## Pre-launch audit

See [the pre-launch audit](docs/PRELAUNCH-AUDIT.md) and [the A/B/C launch checklist](docs/LAUNCH.md). Local status: READY FOR PREVIEW; production still requires owner checks and live Netlify Forms delivery verification. No remote deployment was performed.

After building, run `node scripts/check-build-seo.mjs preview` (or `production` only for a build created with that context).
