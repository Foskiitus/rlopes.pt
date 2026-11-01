# V2.5 — preview and production launch

## Current state

Work is on local branch `v2`. No commit, remote push, production merge, Netlify account change or deployment was performed. The original `master` commit remains unchanged.

The repository previously used Vite/React SSG and EmailJS, without a checked-in Netlify configuration. V2 uses the supported Next.js App Router path and Netlify's automatically applied OpenNext adapter. Do not add a Vite SPA fallback or pin a legacy Next adapter.

## Create a Netlify Deploy Preview

1. Review the working tree on `v2`, including the new untracked files, then commit the intended redesign.
2. Push `v2` to the existing remote and open a pull request against `master`. Leave it unmerged.
3. In the existing Netlify project, retain `master` as the production branch. Enable Deploy Previews for the pull request. A branch deploy of `v2` is another option.
4. Confirm the checked-in `netlify.toml` is applied: build `npm run build`, publish `.next`, Node 22. Remove any old dashboard override that still publishes `dist`.
5. Confirm the automatically selected OpenNext adapter in the deploy log. No backend host, database or extra adapter is required.
6. Visit the returned preview URL and repeat the checks below. Do not point the production domain at the preview.

Official references: [Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/) and [Netlify Forms with OpenNext](https://opennext.js.org/netlify/forms).

## Enable and verify contact delivery

For V2.5, local verification passed all 50 tests, including exact blueprint/UI/payload field parity. This does not establish platform receipt. Follow the steps below on an actual preview; no preview was created by this implementation.

- Enable automatic form detection under the project's **Forms** settings, then make a fresh deploy. Detection is not retroactive.
- Check the deploy log and Forms dashboard for `project-enquiry`.
- Confirm all seven blueprint fields: `form-name`, `bot-field`, `locale`, `name`, `email`, `project-type`, `message`.
- Configure an email notification to `contact@rlopes.pt` for `project-enquiry` using the procedure below. No dashboard notification settings were changed from this workspace.
- Submit a clearly labelled test enquiry on the preview, using an address the owner controls. Confirm both its dashboard record and notification delivery, including all fields.
- Inspect the spam queue if it is missing. Netlify's filtering and declared honeypot handle platform-side spam; the client validates required values, email, project type and message length. HTML field constraints are not a custom server-side validation service.
- Test error feedback offline, retry behavior, mobile keyboard input and the direct-email fallback.
- Local `next start` does not implement Netlify Forms. A real local POST fails; this is reported honestly rather than simulated as success. Automated tests intercept the request and are explicitly not live delivery evidence.

The AJAX request uses Content-Type: application/x-www-form-urlencoded and POST /__forms.html with form-name=project-enquiry. The seven submitted names match public/__forms.html exactly. Current official references were rechecked on 31 October 2026: [OpenNext Forms](https://opennext.js.org/netlify/forms) and [Netlify form setup](https://docs.netlify.com/manage/forms/setup/).

The hidden static HTML blueprint is mandatory: React form attributes alone are not enough for the current adapter. The POST endpoint deliberately bypasses the locale proxy. Keep the blueprint and UI field names synchronized. Review platform quota/billing settings in the existing account when enabling Forms.

## Professional email and Netlify notifications

The official portfolio address is **contact@rlopes.pt**. The displayed address, mailto links and Person structured data use src/data/site.ts; translated failure messages use the same public address. The private forwarding mailbox is neither required nor recorded in application code, build variables, public HTML, documentation or test fixtures.

The checked-in netlify.toml configures build, preview environments and headers. It contains no form notification recipient. ContactForm.tsx still submits the same seven fields as URL-encoded POST /__forms.html; public/__forms.html still declares project-enquiry. Changing the displayed address does **not** change an existing dashboard notification.

Configure the existing Netlify project separately when managing notification delivery:

1. Open **Forms → Submission notifications** in the portfolio's Netlify project.
2. Add an email notification, or edit the existing portfolio notification, and scope it to **project-enquiry**.
3. Set the notification recipient to **contact@rlopes.pt**, then save. Keep the mailbox behind that alias private and manage forwarding only in the email provider's private settings. Do not change the separate Loprim3D project's notifications.
4. Confirm that the professional alias accepts incoming mail and forwarding is enabled. The visitor's existing name="email" form field supplies Reply-To; it is not the notification destination.
5. On a later authorized Deploy Preview, submit a clearly labelled test using an address controlled by the owner. Verify the submission and all fields in the Netlify Forms dashboard, then confirm the notification arrives through contact@rlopes.pt. Check spam filtering if either step fails. Do not publish the forwarded message's headers or its private destination in repository evidence.

Official [Netlify form notification documentation](https://docs.netlify.com/manage/forms/notifications/), checked 1 November 2026. Local configuration was inspected; dashboard settings, forwarding and real delivery have not been inspected or changed. No test email was sent by this update.

## Routing and indexing

- `/` temporarily redirects to the remembered explicit locale or `/fr`.
- `/fr`, `/pt`, `/en` are always prefixed; French is the fallback and Portuguese uses `pt-PT` in language metadata.
- `/portfolio` permanently redirects to `/pt#work`, preserving the old Portuguese archive intent.
- `/{fr,pt,en}/portfolio` permanently redirects to its corresponding homepage's `#work`.
- Legal and privacy pages have translated metadata, canonicals and alternates.
- `sitemap.xml` contains the nine localized public pages.
- Local/preview builds deliberately emit `noindex,nofollow` and a disallowing robots policy. Only Netlify's `CONTEXT=production` enables indexing; outside Netlify, set `NEXT_PUBLIC_DEPLOY_CONTEXT=production` only for the intended production build.
- Canonicals and sharing URLs always identify `https://rlopes.pt`, preserving domain continuity rather than indexing previews.

## Outstanding business and privacy details

The legal pages use existing public Loprim3D details rather than invented placeholders. `src/data/site.ts` centralizes the remaining fields.

1. Confirm that the public legal name/address/SIREN, telephone, VAT regime and contact address apply to the programming activity promoted by rlopes.pt. The shop's contact page uses “Ricardo SILVA LOPES”, while its legal notice uses “Ricardo Lopes EI”; confirm the intended legal display name and registration scope. No SIRET or RNE entry was invented.
2. Complete Netlify's verified hosting address and telephone in `business.host`. These are `null` in code and expressly described as pending on the preview legal pages.
3. Confirm the proposed deletion period of 12 months after the last exchange for enquiries that do not become projects. Implement a periodic deletion procedure in Netlify Forms and the receiving mailbox; the site does not pretend to automate this.
4. Review the actual Netlify processor agreement, international transfer arrangements, and final privacy notice for the account in use.
5. Confirm the public LinkedIn destination is still the intended profile; its exact original URL was preserved, but automated public inspection was unavailable.

Set `registrationScopeConfirmed` and `retentionPolicyConfirmed` only after those factual/operational checks. Run `npm run check:production`. This explicit readiness check is separate from the preview build.

Legal structure was informed by [Service Public's professional website guidance](https://entreprendre.service-public.gouv.fr/vosdroits/F37351?lang=fr). It does not constitute a completed legal compliance certification.

## Before promoting V2

Verify all locales, legal/privacy content, image loading, social previews, real form receipt, notifications, keyboard navigation, mobile menus, reduced motion, reverse scrolling and direct hash links on the actual Netlify preview. Recheck the legacy redirects and absence of preview indexing.

After the outstanding items are resolved and the owner chooses to launch, merge the reviewed pull request into the existing production branch using the repository's normal process. Confirm Netlify deploys that commit, indexing is enabled, and the live form still works. Keep the previous Netlify deployment available for rollback.
