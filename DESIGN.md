---
name: "Ricardo Lopes"
description: "Light Tech portfolio with expressive sans typography and authentic product imagery"
colors:
  paper: "#fafaf7"
  ink: "#141414"
  accent: "#d0f844"
  muted: "#55574f"
  line: "#d5d7cd"
  surface: "#eeefe8"
  error: "#a32615"
  field-line: "#606d34"
typography:
  display:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(2.625rem, 12vw, 3.375rem)"
    fontWeight: 760
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  display-desktop:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(90px, 8.5vw, 132px)"
    fontWeight: 760
    lineHeight: 0.97
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(38px, 10vw, 48px)"
    fontWeight: 720
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  project-title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "36px"
    fontWeight: 720
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  capability-title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "24px"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  description:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  supporting:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  action:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 650
    lineHeight: 1.55
  link:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.55
  navigation:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 550
    lineHeight: 1.55
  project-navigation:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.55
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.55
rounded:
  square: "0px"
  control: "8px"
  surface: "14px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  gutter: "20px"
  lg: "24px"
  grid: "28px"
  wide: "32px"
  section: "48px"
  section-tablet: "64px"
  section-desktop: "72px"
  gutter-tablet: "clamp(24px, 4.5vw, 80px)"
  gutter-desktop: "clamp(20px, 4.5vw, 80px)"
components:
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "13px 20px"
  button-dark-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.link}"
    rounded: "{rounded.square}"
    padding: "0"
  input-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px"
    width: "100%"
  navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
  header-contact:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    height: "44px"
    width: "44px"
  project-navigation:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.project-navigation}"
    rounded: "{rounded.square}"
  project-navigation-active-desktop:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
  capability-entry:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.capability-title}"
    rounded: "{rounded.square}"
    padding: "0"
---

# Design System: Ricardo Lopes

## Overview

**Creative North Star: "Light Tech × Creative Portfolio"**

Light Tech × Creative Portfolio presents an independent developer through expressive DM Sans typography, warm white, near-black ink and electric lime. Authentic interfaces supply the evidence; concise copy and clear actions leave room for the work.

The interface is open and predominantly flat. Large image frames change with the product, while rounded controls, quiet boundaries and a lime contact surface connect the experience. Native scrolling, readable mobile content and complete keyboard and reduced-motion access are part of this visual system.

**Key Characteristics:**

- One locally hosted DM Sans family with strong differences in scale and weight.
- Warm paper, dark ink and one electric lime brand accent.
- Authentic product images with individual framing and concise supporting text.
- Flat supporting content, rectangular controls and circular icon actions.
- Optional desktop motion over a complete semantic, native-scroll sequence.

This record describes the approved V2.5 artifact in [globals.css](src/app/globals.css), [Hero](src/components/Hero.tsx), [SelectedWork](src/components/SelectedWork.tsx), [WorkGallery](src/components/WorkGallery.tsx), [DesktopGalleryMotion](src/components/DesktopGalleryMotion.tsx) and [the homepage](src/app/[locale]/page.tsx). The chosen C architecture and B typography, page order and exact project selection belong to [the surface brief](.impeccable/surface-brief.md). [PRODUCT.md](PRODUCT.md) preserves product truth; [docs/SOURCES.md](docs/SOURCES.md) records raster provenance. The frontmatter owns primitives; the sidecar extends them with motion, breakpoints and component previews.

## Colors

The palette is bright and warm, with high-contrast ink and a vivid yellow-green accent. The contact section can use lime across its full surface; reading text remains dark.

### Primary

- **Electric Lime** (accent): the highlighted hero line, wordmark point, circular contact control, active desktop project link, control hover and contact background.

### Neutral

- **Warm Paper** (paper): page, header, project navigation, form fields and reversed button text.
- **Near-black Ink** (ink): text, primary actions, active phone project underline and focus outlines.
- **Muted Ink** (muted): supporting role, capability descriptions, archive status and secondary information.
- **Hairline** (line): header, project-navigation and footer boundaries and gallery-control borders.
- **Soft Surface** (surface): Belofer's stage, portrait background, locale hover and image fallback.
- **Field Boundary** (field-line): visible field strokes against lime.

### Feedback and image context

Error Red (error) is reserved for invalid fields and written feedback. Product imagery keeps its authentic colors. The SpoolIQ art mat (#e9eddf) and Loprim3D stage (#eeeadf) are local image treatments, not additional brand accents or reusable palette primitives.

**The Single Accent Rule.** Use electric lime for brand emphasis and active interaction; keep reading text in ink or muted ink and reserve error red for feedback.

## Typography

**Display Font:** DM Sans, sans-serif fallback.
**Body Font:** DM Sans, sans-serif fallback.
**Label Font:** DM Sans; there is no separate serif or mono role.

The local variable face supplies weights 100–1000 through the locale layout. Tight, heavy headings sit above straightforward reading text. There is no single geometric ratio: the implemented hierarchy responds to the role and available width.

### Hierarchy

- **Hero display:** the frontmatter records the phone scale, weight 760, 1.02 line-height and -0.04em tracking. At 768px use clamp(52px, 7vw, 76px); from 1100px the display-desktop role applies. The second line has a lime rectangular backing and an 8% left offset on phones, 6% on tablets and 14% on large screens. Its padding is 0 5px 4px, with 8px horizontal padding on large screens.
- **Primary section headings:** capabilities use the headline role on phones, 52px at 768px and 72px at 1100px, with 1.05 line-height. Contact uses clamp(2.5rem, 11vw, 3.1rem) and 1.04 line-height, then 52px at 768px, clamp(2.5rem, 4.4vw, 4.5rem) at 1024px and 72px at 1100px. About is deliberately smaller: 30px, 34px and 44px at the phone, 768px and 1100px tiers, with 1.1 line-height.
- **Project titles:** 36px on phones and 48px from 768px, weight 720, 1.08 line-height and -0.04em tracking. Capability titles use 24px on phones/tablets and 30px from 1100px, weight 650, 1.15 line-height and -0.03em tracking.
- **Reading:** body copy and inputs are 16px. Hero and project descriptions use 1.5 line-height; biography and capability descriptions inherit 1.55. The desktop hero description is 17px. Project text measures 44ch on phones, 40ch on tablets and 35ch on large screens; biography is capped at 58ch, then 52ch on large screens.
- **Controls and supporting text:** primary phone labels and visible form labels are 16px. Project actions, archive status, project navigation, professional role and social links use 14px; active project links change from weight 500 to 700. The hero CTA stays 16px at every width. Generic desktop buttons and form labels use 14px. The wordmark is 20px on phones and 24px from 1024px, weight 750.

**The One Family Rule.** Use DM Sans throughout and create hierarchy through the implemented scale, spacing and weights.

**The Scoped Scale Rule.** The approved large-screen hero alone uses clamp(90px, 8.5vw, 132px), exceeding the default 96px display ceiling; retain its tested two-line composition rather than applying that scale to other headings.

The small-type exceptions are contextual, not a general body scale: from 1024px locale links, the required-field note and footer secondary links/copyright use 12px; form hints, errors, privacy copy, direct-contact helper and footer locality use 13px. On phones these remain 14px. Do not shrink project descriptions, capabilities, biography, inputs or local-service copy to those auxiliary sizes. These recorded exceptions do not waive unrelated detector findings.

## Layout

Start with native phone flow and enhance at 768px, 1024px, 1100px and 1201px. Shared containers cap at 1600px. Phone gutters are 20px with safe-area protection; tablet and desktop gutter formulas are in the frontmatter. The header is 64px on phones/tablets and 76px from 1024px. Anchor clearance is 82px, then 100px at 1024px.

The homepage's current composition is one continuous opening: the text-only hero leads directly into the first SpoolIQ image, which belongs to the project stage and appears once. The next stages are Loprim3D and Belofer. Three capabilities, a short illustrated About and the full contact form follow. These are surface-specific decisions, not a template imposed on other pages. All nine source project records and their authentic assets remain internal; the homepage has no historical collection or process section.

The phone hero has 24px/26px block padding and an 18px grid gap; its text/action group has a 14px gap. At 768px it becomes two columns (1.2fr/1fr), with 32px gap and 36px block padding. At 1100px the title takes the flexible column beside a 320px copy column, with a 60px gap and 32px/40px block padding.

Project navigation is a horizontal 52px-high sticky row below the phone header, with 24px gaps and a 3px active underline. At 768px the gap becomes 32px. At 1100px the showcase becomes a 180px navigation rail beside a flexible stage; links have 10px/12px padding, at least 48px height and a lime active surface. Normal-flow rail positioning is sticky at 96px; pinned mode positions it inside the stage.

### Image frames

| Stage | Phone | Tablet, from 768px | Large screen, from 1100px |
| --- | --- | --- | --- |
| SpoolIQ | Full-width art mat; image frame 1.23:1; raster width 110%, left -5%, top -24px | Frame 1.6:1, maximum height 540px; raster width 90%, left 5%, top -56px | Normal-flow frame height 580px; raster width 900px, centered, top -70px |
| Loprim3D | Warm stage; 24px top and gutter side inset; rounded 1.6:1 frame; cover fit | 32px top and 8% side inset | 36px vertical and 7% side inset; frame capped at 1100px |
| Belofer | Soft-surface stage; 32px top and gutter side inset; rounded 960:492 frame; contain fit | 32px top and 8% side inset | 36px vertical and 7% side inset; frame capped at its 960px source width |

In pinned mode, the entire gallery is min(780px, 100svh - 104px) high. Each project uses a flexible image region and a content row of at least 146px. Loprim3D and Belofer use contain fit inside the available image height, retaining complete screenshots. Phone project information has 22px/gutter/36px padding and a 14px gap; at 768px it becomes a horizontal copy/action layout with 26px/38px block padding, then 28px 36px 36px on large screens.

Capabilities are open text on paper: 48px block spacing and 24px item gaps on phones, two columns and 64px spacing from 768px, then 72px spacing, 100px column gap and 28px item gaps from 1100px. About uses a 90px portrait on phones, 120px at 768px and 144px at 1100px; heading/portrait precede the short biography and social links. Its bottom spacing grows from 56px to 64px and 72px.

Contact has 40px block padding and a 28px single-column gap on phones. Name/email become two columns with a 20px gap at 768px. From 1024px, copy and form use a 1fr/1.1fr split with 70px block spacing; the gap is 5vw, then 8vw from 1201px. The existing desktop form is 461.297px wide; that implementation constraint is not a general container token.

## Elevation & Depth

The current interface adds no CSS box shadows or drop shadows. Tonal image mats, image scale and controlled clipping establish depth. Perspective and shading visible inside the authentic SpoolIQ raster belong to the supplied image; they are not global CSS effects. The earlier overlapping two-product worktable, rotating store card and associated shadows are retired.

**The Flat Surface Rule.** Keep supporting interface surfaces flat; let authentic imagery, scale and local mats establish depth.

## Shapes

Use the surface radius for Loprim3D and Belofer image frames, the portrait and the compact locale popover. Controls, inputs and active desktop project links use the control radius. The phone SpoolIQ mat is edge-to-edge and square. The highlighted headline is rectangular; the header contact and gallery arrow controls are circular. Hairlines are one pixel except the phone active-project underline.

Image containers clip their contents. Project-specific framing is intentional: the phone SpoolIQ crop leads with the authentic dashboard, Loprim3D has a rounded storefront frame and Belofer retains its source aspect ratio. Preserve these distinctions instead of enclosing all three in identical cards.

## Components

### Buttons and links

The ink primary action uses paper text and the frontmatter padding, with a 22px icon gap and 52px minimum phone height. Generic desktop actions use 50px; the hero retains 52px and 16px text. Hover changes to lime/ink with an ink border; its SVG arrow moves 2px right and 2px upward over 0.2 seconds. Text links have a 10px gap, no fill and underline on hover; their base phone target is 48px, while project/social links use 44px. Generic desktop text links are 14px with a 44px target.

Every interactive control retains a 2px ink focus outline with 5px offset. Disabled form controls use 0.65 opacity and a wait cursor. The unused light-button CSS variant is not promoted to an active system component.

### Navigation

The opaque paper header has a fine lower boundary, a heavy lowercase wordmark and a lime-backed point. Desktop navigation underlines on hover. The current locale is underlined; locale hover uses the soft surface. The 44px circular contact control changes from lime/ink to ink/paper on hover.

Below 1024px the header contains the brand, compact locale chooser, contact action and 44px menu button. Locale options have 44px targets; the menu links have 52px targets. Escape closes disclosures and restores focus; the menu is bounded by the viewport and scrolls independently when needed. Desktop exposes the locale links and page anchors.

### Continuous project showcase

Each semantic article contains one authentic image, one title, one short description and one destination. SpoolIQ and Loprim3D link to their live products. Belofer carries one quiet translated archive label and links to its preserved screenshot, without an invented live destination. Dates, stacks and detailed history stay in source records.

The desktop enhancement loads GSAP only when the viewport is at least 1100px wide and 680px high and reduced motion is not requested. One short sequence pins at 88px from the top for min(1200px, round(viewport height × 1.2)) of scrolling, with 0.3-second scrub. It preserves native page scrolling and remains reversible. The outgoing panel fades and shifts -24px over 0.3 timeline seconds; the incoming panel reaches opacity 1/y 0 over 0.4. Loprim3D opens a 12% horizontal inset mask while scaling 1.035 to 1; Belofer opens an 8% vertical inset mask while scaling 0.96 to 1. Each image reveal lasts 0.45 timeline seconds with 14px rounded clipping, separated by reading pauses.

The active link, visible image and text stay synchronized in both scroll directions. Project anchors and previous/next buttons update the hash; hash changes, browser history and initial deep links restore the matching stage. Arrow controls are 48px circles, with unavailable directions at 0.35 opacity. Inactive animated panels are inert. Tab navigation and visible keyboard focus switch to normal flow; focus already inside a panel prevents the enhancement from hiding it during load. A list/animation control is available on large screens and hidden under reduced motion.

Phones, short viewports, reduced motion, explicit list mode and unavailable JavaScript retain all three articles in native flow. Mobile has no GSAP download, pinning or image-reveal animation. Resize and teardown restore panel interactivity and remove the pinned layout.

### Capabilities and About

Capabilities use three unboxed entries with concise 16px descriptions. They have no icon cards, numbering or service-table rules. About pairs the original illustration with a smaller heading, a compact professional role, one short biography and LinkedIn/GitHub text actions. These support the work without creating an additional timeline.

### Inputs and contact

The lime contact section keeps the complete Netlify enquiry form: name, email, project type and project description. Labels remain above paper fields. Phone inputs/selects are at least 52px high with 12px padding; textarea is at least 144px and vertically resizable. Desktop inputs/selects use 48px height and 11px/12px padding; textarea is at least 115px. The submit action is full-width and 56px high on phones, then 50px high with the existing 243.797px desktop width.

Focus changes field boundaries to ink; written error messages and invalid borders use error red, with accessible associations. Pending submission disables the fieldset and adds a one-second SVG spinner. Success replaces fields with a ruled confirmation and a new-message action; errors keep the form available. Reduced motion disables the spinner and transitions. The direct email route remains visible, including the no-JavaScript fallback. Form detection, field names, honeypot, hidden locale/form-name values and delivery verification belong to the integration contract, not visual tokens.

## Do's and Don'ts

### Do:

- **Do** use locally hosted DM Sans and the implemented role-specific hierarchy.
- **Do** preserve large authentic imagery and each project's documented framing.
- **Do** keep phone reading text and form inputs at 16px with comfortable controls.
- **Do** preserve visible focus, field labels, written feedback and discreet archive status.
- **Do** keep a complete native-scroll sequence alongside optional desktop motion.
- **Do** retain paper fields and ink actions on the lime contact surface.

### Don't:

- **Don't** turn the approved hero scale exception into a global heading rule.
- **Don't** add decorative kickers, technology badges, invented metrics or fabricated interfaces.
- **Don't** introduce multiple brand accents, a serif display or a dark contact treatment.
- **Don't** turn open supporting content into a generic grid of boxed icon cards.
- **Don't** add CSS rotation or shadows to recreate the retired two-product worktable.
- **Don't** make motion necessary to read projects, navigate or contact Ricardo.
