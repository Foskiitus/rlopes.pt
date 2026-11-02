# Content and asset audit

Audit date: 27 October 2026. The attached user brief is authoritative for Ricardo's business positioning and career narrative. Existing repository content is evidence for prior projects, not authority for V2's design.

## Repository baseline

Initial branch: `master`; initial working tree: clean. Existing stack: Vite, React 19, React Router, vite-react-ssg, Framer Motion, custom PT/EN dictionaries and EmailJS. npm/package-lock.json retained. No AGENTS.md or checked-in Netlify configuration was found. Existing routes were `/`, `/portfolio`, `/en`, `/en/portfolio`. Existing SEO incorrectly localized the business to Barcelos for the user's current activity; V2 follows the supplied France-based context.

The baseline files remain recoverable through Git history. No unrelated uncommitted work existed or was discarded.

## Project evidence

V2.5 renders only SpoolIQ, Loprim3D and Belofer on the homepage. The other rows document preserved internal records and historical assets; they are not a current public archive or additional case-study routes.

| Project | Evidence | Presentation and limit |
| --- | --- | --- |
| SpoolIQ | [Public product website](https://spooliq.io), original `data.js`, original `public/portfolio/web/spooliq.webp` | Own flagship software. Public site confirms inventory, production and costing. No client metrics or commercial outcomes claimed. |
| Loprim3D | [Public store](https://loprim3d.fr), user brief | Own e-commerce business. Store creation/operation and Shopify are supported; no bespoke checkout or custom platform claim. |
| PhotoCelos | Owner's V2.2 brief, original project record and `public/portfolio/web/photocelos.webp` | Barcelos heritage through 360° panoramic photography, active for approximately four years. Expansion and local advertising were intentions only; no revenue, municipal commission or acquisition claim. Discontinued after comparable Google Maps functionality. The preserved screenshot remains internal to the V2.5 project records. |
| Gestão de Stocks | Owner's V2.2 brief and recovered `public/projects/gestao-stocks-dashboard.png` | Personal textile warehouse application, started 2021 and stopped January 2023 on the move to France. The screenshot verifies dashboard/navigation/chart appearance with demonstration data. The original application README was not supplied here: the brief's described management areas are not all certified complete or tested. Customer orders, production orders and production tracking were planned only. Historical URL and local image remain internal; V2.5 does not render this project. |
| Belofer | Original portfolio record and `public/portfolio/web/belofer.webp` | Earlier company website. Shown as archive, with no assertion that the historic implementation is still live. |
| Tecniwall | Original portfolio record and `public/portfolio/web/tecniwall.webp` | Earlier construction business website. Historic screenshot used; old HTTP destination is not promoted as a verified current implementation. |
| Tarefas+ | [Public repository](https://github.com/Foskiitus/ProjetoBoardTarefas), README, package.json, original screenshot | Personal task-management learning work. README identifies the Udemy course “Nextjs do Basico ao avançado”; package confirms Next.js 14.2.3. It is not presented as a client engagement or original commercial product. |
| Evently | [Public archived repository](https://github.com/Foskiitus/evently), README, package.json, original SVG | Learning project based on JavaScript Mastery's tutorial, explicitly attributed. Next.js 14.0.4 verified. No new screenshot was fabricated. |
| TempoApp | [Public repository](https://github.com/Foskiitus/tempoApp), README and original mobile image; user brief | Historical weather/mobile experiment. Original store listing is no longer available; no download link. |

Other original portfolio assets are preserved in `public/portfolio` without unsupported new descriptions or forced flagship case studies. No fake testimonial, client logo collection, numerical result, award, certification, revenue or formal leadership history was introduced.

## Asset provenance

- `public/projects/gestao-stocks-dashboard.png`: owner-provided recovered application capture already in the repository, 2699 × 1955, 436,460 bytes. The owner confirms generated demonstration data. Original retained unchanged. `public/projects/gestao-stocks-dashboard.webp`: lossless optimized copy, 142,014 bytes; `scripts/optimize-stocks-image.mjs` verifies identical decoded pixels. No recovered database, backup, private stock records or modernized UI was imported.

- `public/projects/spooliq-dashboard.webp`: downloaded from [SpoolIQ's public dashboard image](https://spooliq.io/images/landing/dashboard-overview.webp), resized/encoded locally to 1600 × 1600 WebP. UI figures are part of the authentic public product image, not portfolio performance claims.
- `public/projects/loprim3d.webp`: genuine 1440 × 900 Chrome capture of the public homepage, after dismissing the site's cookie prompt. Compressed as WebP. No fabricated content or redrawn interface.
- `public/portfolio/**`: original repository images and SVGs, retained without creative alteration.
- `public/ricardo-lopes.webp`: copied from original `src/assets/foto_perfil.webp`. It is an existing stylized illustration, not a new photograph or invented portrait. Alt text identifies it as an illustration; it remains in About.
- `public/og/{fr,pt,en}.png`: 1200 × 630 share graphics rendered from the portfolio's own title copy, colors and locally licensed fonts.
- `src/fonts/*`: DM Sans via Fontsource is the active family, self-hosted with its supplied OFL license. The unused Newsreader dependency and font files were removed during the pre-launch audit. No browser calls to Google Fonts.
- Temporary raw captures are removed by the asset preparation script. The working screenshots under `.impeccable/review` are ignored by Git.

The user's brief authorizes reuse of their own project materials. No unrelated stock photos or AI-generated project imagery were used.

## Professional identity and contact

- [GitHub profile](https://github.com/Foskiitus): public API returned 200 and the name Ricardo Lopes.
- [LinkedIn](https://www.linkedin.com/in/rilopes/): exact URL retained from the original SEO and social links. Automated page access and a quoted-URL search did not provide independent public profile content. Confirm manually before launch; no fictional replacement link was supplied.
- [Loprim3D legal notice](https://loprim3d.fr/policies/legal-notice) and [contact information](https://loprim3d.fr/policies/contact-information): inspected in Chrome. They provide the business address, phone, SIREN and VAT statement used in the preview legal page; the portfolio contact email is now supplied directly by the owner. Display-name variation and scope confirmation are documented in LAUNCH.md.
- The owner designated `contact@rlopes.pt` as the official portfolio and web-development contact on 1 November 2026. It is used for enquiries, the footer, legal/privacy contact and Person structured data. The forwarding destination is private and is not stored in this repository.
- `contact@loprim3d.fr` belongs to the separate Loprim3D business and remains part of that business's source history; it is no longer used for portfolio enquiries. Loprim3D project links and factual records are unchanged.

## Implementation references

- [Impeccable](https://impeccable.style/) and [official repository](https://github.com/pbakaus/impeccable): installed with `npx --yes impeccable install -y --providers=codex --scope=project --no-hooks`. Actual skill, context, new-work, craft-floor, polish and review/documenter guidance were read. The user's explicit direction and autonomous execution take precedence over routine interview/comp-approval steps.
- [GSAP React integration](https://gsap.com/resources/React/) and [matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/): useGSAP contexts, cleanup and responsive conditions.
- [next-intl routing](https://next-intl.dev/docs/routing/middleware): explicit prefixes and App Router proxy behavior.
- [Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) and [Forms compatibility](https://opennext.js.org/netlify/forms): automatic adapter, static blueprint and AJAX POST.
- [French professional website information](https://entreprendre.service-public.gouv.fr/vosdroits/F37351?lang=fr): legal information structure.

## V2.3 owner-confirmed local positioning

The owner’s V2.3 brief identifies La Ciotat, France as the current base and nearby towns as a target service area, not additional offices. The hero and contact copy use the broader local-area wording; localized metadata carries the same meaning without city lists. The existing Person JSON-LD now adds only PostalAddress.addressLocality (La Ciotat) and addressCountry (FR), without extending the unconfirmed legal registration scope. No new professional credentials, office addresses or travel promises were inferred.

## V2.5 raster provenance

The three social PNGs were regenerated from the localized V2.5 hero with the existing authentic SpoolIQ image. Their origin is embedded as PNG text metadata. The four referenced WebP images use adjacent .webp.json provenance sidecars created by Impeccable, which uses a sidecar fallback for that format. Decoded-pixel SHA-256 checks before and after provenance recording matched for all seven assets; project imagery was not redrawn or recompressed. Other historical raster files remain unchanged. Regenerating the social PNGs replaces their embedded metadata; reapply the documented origin after regeneration.

## Pre-launch audit — November 2026

- Netlify hosting address: [official Website Terms of Use, section 15](https://www.netlify.com/legal/terms-of-use/), checked 1 November 2026. The telephone remains unverified and is a production launch item.
- The former DPA link returned HTTP 404. The [official GDPR/CCPA page](https://www.netlify.com/gdpr-ccpa/) links to the [Netlify DPA PDF](https://www.netlify.com/pdf/netlify-dpa.pdf), which returned HTTP 200 and identifies a 9 June 2026 revision.
- Current audit results and scope: [PRELAUNCH-AUDIT.md](PRELAUNCH-AUDIT.md); owner actions: [LAUNCH.md](LAUNCH.md). Previous iteration reports are historical snapshots.
