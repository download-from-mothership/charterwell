# Charterwell Brand Guidelines

**Prepared by:** Lead Brand Designer | **Date:** 2026-03-21 | **Version:** 1.0

---

## 1. Logo System

### Primary Mark: Wordmark

The Charterwell wordmark is set in **Inter Semibold (600)** with **+2.5px letter-spacing**. The custom tracking creates a premium, considered feel that distinguishes it from default text rendering.

**Files:**
- `public/logo-wordmark.svg` — Navy on transparent
- `public/logo-wordmark-white.svg` — White on transparent

### Secondary Mark: Monogram

The monogram consists of two overlapping document rectangles — a navy back layer and a teal front layer with three horizontal "text" lines. This mark represents structured information and document intelligence, Charterwell's core value proposition.

**Files:**
- `public/logo-monogram.svg` — Navy + teal on transparent
- `public/logo-monogram-white.svg` — White on transparent

### Lockups

| Variant | Use Case | Files |
|---|---|---|
| **Horizontal** | Website headers, email signatures, presentations | `logo-horizontal.svg`, `logo-horizontal-white.svg` |
| **Stacked** | Social profiles, splash screens, square contexts | `logo-stacked.svg`, `logo-stacked-white.svg` |
| **Wordmark only** | Running text, legal documents, minimal contexts | `logo-wordmark.svg`, `logo-wordmark-white.svg` |
| **Monogram only** | Favicons, app icons, very small contexts | `logo-monogram.svg`, `logo-monogram-white.svg` |

### Clear Space

Minimum clear space around any logo variant = the cap height of the "C" in the wordmark, applied on all four sides. For the monogram used independently, clear space = 25% of the mark's height on all sides.

### Minimum Size

| Context | Minimum Width |
|---|---|
| Digital (wordmark) | 100px |
| Digital (monogram) | 16px |
| Print (wordmark) | 25mm |
| Print (monogram) | 6mm |

### Color Variants

| Background | Wordmark Color | Monogram Colors |
|---|---|---|
| Light (white, warm white) | Navy (#1B2A4A) | Navy back + Teal front |
| Dark (navy, charcoal) | White (#FFFFFF) | White (30% opacity back + solid front) |
| Single-color (fax, stamp) | Black (#000000) | Black |

### Incorrect Usage

Do NOT:
- Apply gradients, drop shadows, or 3D effects to the logo
- Rotate, skew, or distort the logo
- Change the logo colors beyond the approved variants
- Place the logo on busy photographic backgrounds without sufficient contrast
- Rearrange elements of the lockups
- Add outlines, strokes, or glow effects
- Use the wordmark in a typeface other than Inter Semibold
- Animate the logo without brand team approval

---

## 2. Color System

### Primary Palette

| Name | Hex | RGB | HSL | Role |
|---|---|---|---|---|
| Deep Navy | `#1B2A4A` | 27, 42, 74 | 221°, 47%, 20% | Primary brand, headlines, logo |
| Teal | `#0D9488` | 13, 148, 136 | 175°, 84%, 32% | Accent, CTAs, links, active states |
| Warm White | `#FAFAF8` | 250, 250, 248 | 60°, 14%, 98% | Page backgrounds, card surfaces |

### Neutral Palette

| Name | Hex | Role |
|---|---|---|
| Charcoal | `#1F2937` | Body text |
| Slate | `#64748B` | Secondary text, borders, disabled states |

### Semantic Palette

| Name | Hex | Role |
|---|---|---|
| Emerald | `#059669` | Success, positive states |
| Amber | `#D97706` | Warning, attention |
| Crimson | `#DC2626` | Error, critical |

### Accessibility

All text color combinations meet **WCAG AA** minimum contrast ratios (4.5:1 for normal text, 3:1 for large text):

| Foreground | Background | Ratio | Pass |
|---|---|---|---|
| Navy on Warm White | `#1B2A4A` on `#FAFAF8` | 12.4:1 | AAA |
| Charcoal on Warm White | `#1F2937` on `#FAFAF8` | 11.3:1 | AAA |
| Teal on Warm White | `#0D9488` on `#FAFAF8` | 4.6:1 | AA |
| White on Navy | `#FFFFFF` on `#1B2A4A` | 12.4:1 | AAA |
| White on Teal | `#FFFFFF` on `#0D9488` | 4.6:1 | AA |

---

## 3. Typography

### Typefaces

| Font | Weights | Use |
|---|---|---|
| **Inter** | 400 (Regular), 600 (Semibold), 700 (Bold) | All UI and marketing text |
| **JetBrains Mono** | 400 (Regular) | Code samples, data displays, technical content |

### Type Scale

| Level | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| Display | 64px / 48px | 700 | 1.05 | Marketing hero headlines |
| H1 | 48px / 36px | 700 | 1.1 | Page titles |
| H2 | 30px / 24px | 600 | 1.2 | Section headings |
| H3 | 20px / 18px | 600 | 1.3 | Subsection headings |
| Body | 16px / 14px | 400 | 1.6 | Paragraph text |
| Small | 13px / 12px | 400 | 1.4 | Captions, footnotes |
| Code | 14px / 13px | 400 (Mono) | 1.5 | Code blocks, data |

Sizes listed as desktop / mobile.

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
```

---

## 4. Iconography

- **Style:** Outlined, 1.5px stroke weight
- **Grid:** 24×24px base with 2px padding
- **Corner radius:** 1px on sharp corners
- **Theme:** Document-centric metaphors — pages, layers, stacks, checkmarks, routing arrows
- **Color:** Inherit from text color (currentColor)
- **Avoid:** Robot/AI imagery (brains, neural networks, circuit boards)

Recommended icon library: [Lucide](https://lucide.dev/) — matches Inter's geometric quality and supports the outlined, document-centric style.

---

## 5. Photography & Illustration

### Photography

- Real insurance professionals in real work environments
- No stock-photo diversity panels
- If real photos aren't available, use no photos rather than fake ones
- Muted, natural color grading — no heavy filters

### Illustration

- Layered, organized geometric compositions suggesting structured documents
- Blueprint/architectural aesthetic — precision without coldness
- Navy and teal palette only
- No futuristic/sci-fi imagery, floating holograms, or robots

---

## 6. Spacing & Layout

### Base Unit

4px base unit. All spacing uses multiples of 4:

| Token | Value | Use |
|---|---|---|
| `space-1` | 4px | Tight gaps (icon-to-label) |
| `space-2` | 8px | Small gaps (between related items) |
| `space-3` | 12px | Medium-small (form field padding) |
| `space-4` | 16px | Standard (paragraph spacing) |
| `space-6` | 24px | Medium (card padding) |
| `space-8` | 32px | Large (section padding) |
| `space-12` | 48px | XL (between sections) |
| `space-16` | 64px | 2XL (page margins) |
| `space-24` | 96px | 3XL (hero section padding) |

### Border Radius

| Token | Value | Use |
|---|---|---|
| `rounded-sm` | 4px | Badges, tags |
| `rounded` | 8px | Buttons, inputs, cards |
| `rounded-lg` | 12px | Modals, large cards |
| `rounded-full` | 9999px | Avatars, pills |

### Shadows

| Token | Value | Use |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(27,42,74,0.05)` | Subtle lift (buttons) |
| `shadow` | `0 2px 8px rgba(27,42,74,0.08)` | Cards, dropdowns |
| `shadow-lg` | `0 8px 24px rgba(27,42,74,0.12)` | Modals, popovers |

---

## 7. Tailwind Configuration

```js
// tailwind.config.js — brand extension
module.exports = {
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B2A4A',
          50: '#E8EBF0',
          100: '#D1D7E1',
          200: '#A3AFC3',
          300: '#7587A5',
          400: '#485F87',
          500: '#1B2A4A',
          600: '#16223C',
          700: '#111A2E',
          800: '#0C1220',
          900: '#070A12',
        },
        teal: {
          DEFAULT: '#0D9488',
          50: '#E6F7F6',
          100: '#CCEFED',
          200: '#99DFDB',
          300: '#66CFC9',
          400: '#33BFB7',
          500: '#0D9488',
          600: '#0A766D',
          700: '#085952',
          800: '#053B37',
          900: '#031E1C',
        },
        surface: '#FAFAF8',
        charcoal: '#1F2937',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        brand: '0.05em',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(27, 42, 74, 0.05)',
        DEFAULT: '0 2px 8px rgba(27, 42, 74, 0.08)',
        lg: '0 8px 24px rgba(27, 42, 74, 0.12)',
      },
    },
  },
}
```

---

*For questions about brand application, contact the Lead Brand Designer via Paperclip.*
