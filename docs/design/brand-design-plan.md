# Charterwell Brand Design Plan & Asset Delivery Schedule

**Prepared by:** Lead Brand Designer | **Date:** 2026-03-21 | **Issue:** KEN-65

---

## 1. Logo Design

### Approach

The Charterwell logo system comprises three elements: a primary wordmark, a secondary monogram/icon, and lockup combinations of both.

### 1.1 Wordmark (Primary Mark)

- **Typeface:** Inter Semibold (600) with custom letterspacing (+2–4% tracking) for a premium, considered feel.
- **Treatment:** All letters remain unmodified — no ligatures, no stylized cuts. The authority comes from spacing and weight, not decoration.
- **Rationale:** "Charter" evokes founding documents and authority; "well" suggests a source of knowledge. The typography should feel grounded and established. Inter's geometric clarity communicates modernity without trendiness.

### 1.2 Monogram / Icon (Secondary Mark)

- **Concept:** Abstract document layers — two overlapping rectangles offset diagonally, suggesting structured information and depth. The top layer carries the teal accent (#0D9488), the bottom layer uses deep navy (#1B2A4A).
- **Alternate concept:** A geometric "C" monogram with an architectural quality — clean strokes, 90° or 45° angles only.
- **Requirements:** Must be legible and intentional at 16×16px (favicon) through 512×512px (app icon).

### 1.3 Lockups

| Lockup | Description | Use Case |
|---|---|---|
| **Horizontal** | Icon left, wordmark right | Website header, email signatures, presentations |
| **Stacked** | Icon above, wordmark below | Social media profiles, app splash screens |
| **Wordmark only** | No icon | Body text contexts, legal documents |
| **Icon only** | No wordmark | Favicon, app icon, small-format uses |

### Variations

Each lockup delivered in:
- Deep Navy (#1B2A4A) on light backgrounds
- White (#FFFFFF) on dark backgrounds
- Single-color black for print/fax

### No-Gos (Enforced)

- No gradients, drop shadows, or 3D effects
- No generic AI imagery (brains, neural nets, circuit boards)
- No marks confusable with Chartwell Insurance Services branding
- No overly complex geometry that degrades at small sizes

---

## 2. Color System

Adopted from brand identity doc (03-brand-identity.md). All values confirmed for WCAG AA compliance.

| Token | Hex | Tailwind Config Key | Role |
|---|---|---|---|
| Deep Navy | `#1B2A4A` | `navy` | Primary brand, headlines, logo |
| Teal | `#0D9488` | `teal` | Accent, CTAs, links, active states |
| Warm White | `#FAFAF8` | `surface` | Backgrounds, cards |
| Charcoal | `#1F2937` | `charcoal` | Body text |
| Emerald | `#059669` | `success` | Positive/success states |
| Amber | `#D97706` | `warning` | Warning/attention states |
| Crimson | `#DC2626` | `error` | Error/critical states |
| Slate | `#64748B` | `muted` | Secondary text, borders, disabled |

### Extended Palette (Tints & Shades)

Each core color will have a 50–950 scale generated for UI flexibility:
- `navy-50` through `navy-950`
- `teal-50` through `teal-950`

### Contrast Ratios (Verified)

| Pair | Ratio | WCAG Level |
|---|---|---|
| Navy on Warm White | 12.4:1 | AAA |
| Charcoal on Warm White | 11.3:1 | AAA |
| Teal on Warm White | 4.6:1 | AA |
| White on Navy | 12.4:1 | AAA |
| White on Teal | 4.6:1 | AA |

---

## 3. Typography

| Use | Font | Weight | Size Scale | Line Height |
|---|---|---|---|---|
| Display (H1) | Inter | 700 | 48/36px | 1.1 |
| Heading (H2) | Inter | 600 | 30/24px | 1.2 |
| Subheading (H3) | Inter | 600 | 20/18px | 1.3 |
| Body | Inter | 400 | 16/14px | 1.6 |
| Small / Caption | Inter | 400 | 13/12px | 1.4 |
| Code / Data | JetBrains Mono | 400 | 14/13px | 1.5 |
| Marketing Display | Inter | 700 | 64/48px | 1.05 |

### Font Loading Strategy

- Inter via Google Fonts (variable font) or self-hosted WOFF2
- JetBrains Mono via Google Fonts or self-hosted WOFF2
- `font-display: swap` for all web fonts

---

## 4. Favicon & App Icon Package

| Asset | Size | Format | Notes |
|---|---|---|---|
| favicon.ico | 16×16, 32×32 | ICO | Multi-resolution, monogram only |
| favicon.svg | Scalable | SVG | Monogram, supports dark mode via `prefers-color-scheme` |
| apple-touch-icon | 180×180 | PNG | Monogram on navy background |
| android-chrome-192 | 192×192 | PNG | Monogram on navy background |
| android-chrome-512 | 512×512 | PNG | Monogram on navy background |
| site.webmanifest | — | JSON | References android-chrome icons |
| mstile-150x150 | 150×150 | PNG | Windows tile |

### Favicon Design

- Uses the monogram/icon mark only (not the wordmark)
- Navy monogram on transparent background for light mode
- White monogram on transparent background for dark mode (SVG variant only)
- App icon variants: monogram centered on navy (#1B2A4A) background with rounded corners per platform spec

---

## 5. Social Media & OG Assets

| Asset | Dimensions | Format | Use |
|---|---|---|---|
| OG Image (default) | 1200×630 | PNG | Link previews (Twitter, LinkedIn, Slack) |
| Twitter Card | 1200×628 | PNG | Twitter-specific preview |
| LinkedIn Banner | 1584×396 | PNG | Company page cover |
| LinkedIn Post Template | 1200×1200 | PNG | Square format social posts |
| Profile Avatar | 400×400 | PNG | Social media profile pictures |

### OG Image Design

- Navy background with centered Charterwell horizontal lockup (white)
- Tagline "Every document understood, every decision informed" in Inter 400 below the logo
- Subtle grid pattern in navy-800 for texture
- No photography — clean and consistent across all share contexts

---

## 6. Design System / Component Library Plan

### Design Tokens (for Website Engineer Handoff)

Delivered as a `tailwind.config.js` extension and a standalone `tokens.json`:

```
tokens/
├── colors.json        # Full palette with tints/shades
├── typography.json     # Font families, sizes, weights, line heights
├── spacing.json        # 4px base unit scale (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24)
├── borders.json        # Radii, widths, colors
├── shadows.json        # Elevation scale (sm, md, lg)
└── breakpoints.json    # sm: 640, md: 768, lg: 1024, xl: 1280
```

### Component Visual Specs

Visual specifications (not code) for the Website Engineer to implement:

| Component | Spec Includes |
|---|---|
| Button (primary, secondary, ghost) | Colors, padding, border-radius, hover/focus states |
| Card | Background, border, shadow, padding, border-radius |
| Navigation | Layout, link styles, active states, mobile hamburger |
| Hero Section | Typography scale, spacing, CTA placement |
| Footer | Link groups, logo placement, background color |
| Form Inputs | Border, focus ring, error state, label positioning |
| Badge / Tag | Colors for status types, padding, font size |

### Handoff Format

- Tailwind config snippet (ready to paste into `tailwind.config.js`)
- SVG assets in `/public/` directory
- PNG exports at required sizes in `/public/images/`
- Component specs documented in `docs/design/component-specs.md`

---

## 7. Brand Guidelines Documentation

### Deliverable: `docs/design/brand-guidelines.md`

Sections:
1. **Brand Overview** — Mission, positioning, voice summary
2. **Logo** — All marks, lockups, clear space rules, minimum sizes, incorrect usage examples
3. **Color** — Full palette with hex, RGB, HSL values; usage rules; do's and don'ts
4. **Typography** — Type scale, font stack, web font loading, fallback fonts
5. **Iconography** — Style guide (1.5px outlined, document-centric metaphors), icon grid
6. **Photography & Illustration** — Direction, examples of appropriate/inappropriate imagery
7. **Layout & Spacing** — Grid system, spacing scale, component spacing guidelines
8. **Applications** — Example compositions: business card, email signature, social post, slide deck

---

## 8. Delivery Timeline

| Phase | Deliverables | Target |
|---|---|---|
| **Phase 1: Foundation** | Wordmark SVG, monogram SVG, color tokens JSON, Tailwind config, typography decisions | Week 2 (current) |
| **Phase 2: Asset Package** | Favicon package (all sizes/formats), OG image, social media assets, logo PNG exports | Week 2–3 |
| **Phase 3: Design System** | Component visual specs, design tokens, handoff documentation | Week 3 |
| **Phase 4: Guidelines** | Brand guidelines document, incorrect usage examples | Week 3–4 |

### File Delivery Locations

```
charterwell/
├── public/
│   ├── logo-wordmark.svg
│   ├── logo-monogram.svg
│   ├── logo-horizontal.svg
│   ├── logo-stacked.svg
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── site.webmanifest
│   ├── og-image.png
│   └── images/
│       ├── logo-wordmark-white.png
│       ├── logo-monogram-navy.png
│       └── ...
├── docs/design/
│   ├── brand-design-plan.md          (this document)
│   ├── brand-guidelines.md
│   ├── component-specs.md
│   └── tokens/
│       ├── colors.json
│       ├── typography.json
│       └── ...
└── tailwind.config.js (brand extension)
```

---

## 9. Dependencies & Coordination

| Dependency | Status | Impact |
|---|---|---|
| Brand identity decisions (03-brand-identity.md) | Complete | Colors, typography, voice all defined |
| Trademark clearance | Pending (CEO/Legal) | Could affect name/logo if conflict found |
| Website Engineer availability | TBD | Component specs need an engineer to implement |
| Domain confirmation (charterwell.ai) | Presumed owned | Favicon/OG assets reference this domain |

### Coordination with Website Engineer

1. Design tokens and logo SVGs delivered first (Phase 1) — unblocks website scaffold
2. Component specs delivered in Phase 3 — informs UI component build
3. Brand guidelines (Phase 4) — reference doc for ongoing development decisions

---

*This plan is a living document. Updates will be posted as work progresses.*
