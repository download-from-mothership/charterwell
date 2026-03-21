# Charterwell Marketing Website — Build Plan

**Owner:** Website Engineering Agent
**Date:** 2026-03-21
**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
**Hosting:** Vercel (static export)
**Cost:** ~$20/month (Vercel Pro) + $9/month (Plausible) = $29/month

---

## Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | CEO specified Next.js. App Router for modern conventions. Static export for maximum performance. |
| **Styling** | Tailwind CSS v4 | Design tokens configured once, used everywhere. Zero custom CSS architecture to maintain. |
| **CMS** | MDX files in repo (launch) | Zero CMS dependency. Blog posts are Markdown committed to git. CMO can edit via GitHub web editor. Sanity/Keystatic can be layered on post-launch if GUI editing is needed. |
| **Hosting** | Vercel (static export) | Zero-config deployment. Preview branches auto-deploy. CDN-backed. No servers to maintain. |
| **Analytics** | Plausible Analytics | Privacy-first, no cookie banner needed, GDPR-compliant by default. Insurance carriers operate globally — clean consent-free analytics. |
| **Forms** | Formspree (launch) → Resend + API route (post-launch) | Zero-backend form handling at launch. Can migrate to custom API route when server-side logic is needed. |
| **Search** | Pagefind (post-launch) | Static search, zero cost, no third-party dependency. Added when content volume justifies it. |
| **Output** | Static HTML export | Sub-second page loads. Works on corporate networks. No server-side rendering latency. |

---

## Phase Breakdown

### Phase 1: Scaffold & Skeleton (Week 3, Days 1–3) ✅ IN PROGRESS

**Status:** Core scaffold complete (KEN-54 done). Remaining Phase 1 work in KEN-55.

**Completed:**
- Next.js project initialized with TypeScript + App Router
- Tailwind CSS v4 configured with brand design tokens (navy, teal, surface, charcoal, muted)
- Responsive header with mobile hamburger menu
- Footer with navigation and legal links
- Homepage: hero, problem stats, product walkthrough (5 steps), features (4 cards), social proof placeholder, CTA
- Contact/demo request page with form (name, email, company, role, message)
- 404 page with brand styling
- SEO foundations: meta tags, OpenGraph, Twitter cards, sitemap.xml, robots.txt
- Git repo initialized, initial commit made

**Remaining:**
- Page skeletons for /product, /solutions, /about, /resources, /privacy, /terms
- CI setup (ESLint, Prettier, Lighthouse CI, axe-core)
- Vercel deployment + staging environment
- Self-hosted fonts (Inter, JetBrains Mono) — currently using Google Fonts CDN

### Phase 2: Design System + Content Integration (Week 4–5)

**Deliverables:**
- Full page builds: Product, Solutions (VP Claims / CTO / Claims Ops), About, Resources/Blog
- MDX blog system with post template and index page
- Image optimization pipeline (WebP/AVIF, responsive srcset, lazy loading)
- Component refinement based on brand guidelines (spacing, shadows, animation)
- Design partner landing page

**Review Gate 1** — End of Week 4 (founding engineer: 1–1.5 hours)
- Staging URL with all pages built and populated
- Code review PR: architecture, component structure, dependency list
- Lighthouse scores for all pages
- Accessibility report (axe-core)

### Phase 3: Performance + SEO + Analytics (Week 5)

**Deliverables:**
- Self-hosted fonts (subset Latin only)
- Performance budget CI check (< 200KB JS, < 1MB page weight)
- Schema.org structured data (Organization, SoftwareApplication, FAQPage)
- Plausible Analytics integration
- Conversion goal tracking (demo form submissions)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Responsive polish at all breakpoints (375px–1536px)
- Content QA (spellcheck, heading hierarchy, link check, alt text)

### Phase 4: QA & Launch Readiness (Week 6)

**Deliverables:**
- Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy)
- Accessibility audit (axe-core + keyboard testing)
- Pre-launch checklist verification
- Deployment runbook

**Review Gate 2** — Early Week 6 (founding engineer: 1–1.5 hours)
- Final staging URL, content-complete
- Updated Lighthouse report, accessibility audit, SEO checklist
- Security headers verification
- Dependency list with versions
- Deployment runbook

**DNS Cutover** (founding engineer: 30 min)
- Point charterwell.ai DNS to Vercel
- Verify SSL, site loads, Google Search Console

---

## Dependencies

| Dependency | Source | Status |
|---|---|---|
| Brand design tokens | `docs/design/brand-guidelines.md` | ✅ Available, implemented |
| Logo files | `public/logo-*.svg` | ✅ Available |
| Homepage messaging | `docs/marketing/` strategy docs | ✅ Available, implemented |
| Page copy (Product, Solutions, About) | CMO | ⏳ Pending — will use strategy docs as source |
| Product screenshots / UI mockups | Design agent | ⏳ Pending — using text-based content for now |
| Domain DNS readiness | Ops agent | ⏳ Pending |
| Favicon package + OG image | Design agent | ✅ Favicon exists. OG image pending. |
| Blog content | CMO | ⏳ Pending — template ready, placeholder post planned |

---

## Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance (4G, mobile) | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| Initial JS bundle | < 200KB |
| Total page weight | < 1MB |
| Page load time (4G) | < 2 seconds |

---

## Founding Engineer Time Budget

| Activity | Estimated Time | Phase |
|---|---|---|
| Architecture approval | 30 min | Phase 1 |
| Review Gate 1 (code + staging review) | 1–1.5 hours | Phase 2 |
| Review Gate 2 (final review + security) | 1–1.5 hours | Phase 4 |
| DNS cutover | 30 min | Phase 4 |
| **Total** | **≤ 4 hours** | |

---

*Run `npm run dev` for local development. Run `npm run build` to verify static export.*
