# Marketing Website Evaluation — charterwell.ai

**Prepared by:** CMO
**Date:** 2026-03-21 (Updated)
**Issue:** KEN-60
**Status:** NOT YET LAUNCH-READY — Major progress, deployment pending

---

## Executive Summary

The charterwell.ai marketing website has been substantially built as a Next.js 16 static site. The codebase is clean, well-structured, and builds successfully to 2MB of static HTML. All core pages exist with professional, on-brand copy. A blog system, contact form, SEO infrastructure, and structured data are in place.

**The site is not yet launch-ready because it has not been deployed.** The codebase itself is at ~70% readiness. The remaining work is deployment, polish, and a handful of content gaps.

Previous evaluation (earlier today): "The site does not exist." That is no longer true.

---

## Success Criteria Assessment

### 1. IS IT LIVE AND FAST?

| Criterion | Status | Evidence |
|---|---|---|
| charterwell.ai loads in under 2 seconds on 4G | **BLOCKED** | Site not deployed. Static HTML output is 2MB total — architecture strongly favors sub-2s loads. |
| Lighthouse: Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95 | **LIKELY PASS** | Cannot run Lighthouse without a live URL. Static export, minimal JS, self-hosted fonts, semantic HTML all point to 90+ scores. |
| Zero downtime in first 48 hours | **N/A** | Not launched |

**Verdict: BLOCKED — Awaiting deployment to Vercel + DNS cutover.**

**What's done:**
- Next.js 16 static export builds clean (11 HTML pages, 2MB total)
- Tailwind CSS v4 with brand design tokens
- Self-hosted Inter font (no external CDN dependency)
- Responsive layout tested at all breakpoints
- sitemap.xml, robots.txt, favicon.svg all present

**What's remaining:**
- Vercel project creation and deployment
- DNS configuration (charterwell.ai → Vercel)
- SSL verification
- Plausible Analytics script integration
- Lighthouse audit on live URL

### 2. DOES IT PASS THE VP CLAIMS TEST?

| Criterion | Status | Evidence |
|---|---|---|
| Understand what Charterwell does within 10 seconds | **PASS** | Hero: "The AI Claims Intelligence Workspace" + tagline immediately communicates purpose |
| Believe it's credible within 30 seconds | **CONDITIONAL** | Professional design, strong copy, 5-step product walkthrough with metrics. BUT: no customer logos, no team photos, social proof section is a placeholder ("Design partner program now open"). |
| Find demo request form within 60 seconds | **PASS** | Header nav has "Contact" link. Hero CTA → /contact. Footer CTA → /contact. Contact page has a clean lead capture form. |
| Never triggers "startup" or "not ready" impression | **CONDITIONAL** | Copy reads like established company. Risk areas: (1) Formspree action is `placeholder` — form will fail on submit, (2) Social proof section is empty, (3) Blog has only 1 post, (4) No team photos on /about. |

**Verdict: CONDITIONAL PASS — Content is strong, but credibility gaps remain.**

**Strengths:**
- Hero messaging is clear and category-defining
- Problem section with industry stats establishes authority
- Product walkthrough (Ingest → Understand → Route → Check → Act) is concrete and understandable
- Solutions page has persona-specific messaging for Claims Leaders, CIOs, and Ops Directors
- Contact form asks the right questions (company, role, claims workflow)
- Copy tone is "McKinsey meets Stripe" as intended — authoritative, modern, not startup-y

**Gaps to close:**
- Form endpoint is a placeholder (`formspree.io/f/placeholder`) — **must fix before launch**
- Social proof section needs at minimum a design partner CTA or removal
- /about page has team placeholder — needs real content or restructuring
- No product screenshots or visuals beyond text — a VP expects to see the product
- Blog has 1 post — minimum 3 recommended for credibility

### 3. CAN THE CMO UPDATE IT WITHOUT ENGINEERING?

| Criterion | Status | Evidence |
|---|---|---|
| Publish a new blog post without engineering | **PASS** | Blog system reads `.mdx` files from `/content/blog/`. CMO adds a file with frontmatter → it appears on /resources. Tested: system auto-generates slug, handles markdown formatting, estimates read time. |
| Update homepage copy without engineering | **PARTIAL** | Copy is in React components (`src/app/page.tsx`). Requires editing JSX. Doable via GitHub web editor but not as simple as a CMS. |
| Add a customer logo without engineering | **PARTIAL** | Logo can be added to `/public/` and referenced in code, but requires editing a React component to display it. |

**Verdict: PARTIAL PASS — Blog is self-service. Homepage and logo changes require code edits.**

**Assessment:** The blog system meets the spirit of this criterion — I can publish thought leadership content without engineering help by committing an .mdx file. Homepage copy and logo additions require JSX edits, which is acceptable for launch but should be improved post-launch (CMS layer or content files).

### 4. IS THE FOUNDING ENGINEER FREE?

| Criterion | Status | Evidence |
|---|---|---|
| Total engineering time ≤ 5 hours | **ON TRACK** | Build plan budgets ≤4 hours total. Build was done by an engineering agent, not the founding engineer. Review gates and DNS cutover still ahead. |
| Codebase onboardable in < 2 hours | **LIKELY PASS** | Clean TypeScript, Next.js App Router conventions, single-concern components, no external API dependencies. Build plan is documented. |
| No unplanned maintenance burden | **PASS** | Static export = no server runtime. Dependencies are minimal (Next.js, Tailwind, gray-matter). No database, no auth, no API routes. |

**Verdict: ON TRACK — Engineering time budget appears intact. Review gates still needed.**

### 5. DOES IT OWN "CHARTERWELL" IN SEARCH?

| Criterion | Status | Evidence |
|---|---|---|
| "charterwell" returns our site as #1 within 2 weeks | **NOT YET** | Site not indexed (not deployed). SEO infrastructure is ready. |
| "charterwell ai" returns our site as #1 | **NOT YET** | Same blocker — need to deploy and submit to Google Search Console. |
| Clearly distinguishable from Chartwell entities | **PASS (in code)** | Title: "Charterwell — The AI Claims Intelligence Workspace." Description specifies claims intelligence. JSON-LD Organization schema with `foundingDate: 2026`. Keyword strategy targets "claims intelligence workspace" (no one else uses this phrase). |

**Verdict: BLOCKED — SEO is well-prepared but site must be deployed and indexed.**

**SEO readiness checklist:**
- ✅ Unique, descriptive title tags on every page
- ✅ OpenGraph and Twitter Card metadata
- ✅ JSON-LD structured data (Organization + SoftwareApplication)
- ✅ sitemap.xml with all URLs
- ✅ robots.txt allowing full crawl
- ✅ Semantic HTML (proper heading hierarchy, landmarks)
- ✅ Blog with keyword-rich content
- ⬜ Google Search Console submission
- ⬜ OG image for social sharing
- ⬜ Analytics to track search traffic

---

## Overall Verdict

| Criterion | Previous (6 hours ago) | Current | Trend |
|---|---|---|---|
| 1. Live and Fast | **FAIL** (no site) | **BLOCKED** (built, not deployed) | ↑ |
| 2. VP Claims Test | **FAIL** (no site) | **CONDITIONAL PASS** | ↑↑ |
| 3. CMO Can Update | **FAIL** (no site) | **PARTIAL PASS** | ↑↑ |
| 4. Engineer is Free | **N/A** | **ON TRACK** | ↑ |
| 5. Owns Search | **FAIL** (no site) | **BLOCKED** (ready, not deployed) | ↑ |

**The site is not launch-ready, but it is close.** The primary blocker is deployment. The secondary blockers are content polish items.

---

## Pre-Launch Blockers (Must Fix)

| # | Item | Severity | Owner |
|---|---|---|---|
| 1 | **Deploy to Vercel** | Critical | Engineering |
| 2 | **Configure DNS** (charterwell.ai → Vercel) | Critical | Engineering/Ops |
| 3 | **Fix Formspree endpoint** (currently `placeholder`) | Critical | Engineering |
| 4 | **Add OG image** for social sharing | High | CMO/Design |
| 5 | **Social proof section** — either add content or remove placeholder | High | CMO |

## Pre-Launch Recommended (Should Fix)

| # | Item | Impact | Owner |
|---|---|---|---|
| 6 | Add 2 more blog posts for credibility | Medium | CMO |
| 7 | Integrate Plausible Analytics | Medium | Engineering |
| 8 | Populate /about team section | Medium | CMO |
| 9 | Add CI pipeline (lint, Lighthouse, a11y) | Medium | Engineering |
| 10 | Google Search Console setup post-deploy | Medium | CMO/Engineering |

---

## What Changed Since Last Evaluation

The engineering agent built a complete Next.js 16 marketing website in a single day:

- **5 commits** from scaffold to SEO infrastructure
- **11 static pages** with professional, on-brand copy
- **Blog system** with MDX support and 1 published post
- **Contact/demo form** with lead capture fields
- **SEO infrastructure** (structured data, sitemap, robots.txt, OG tags)
- **Self-hosted fonts** and Tailwind design system
- **Logo variants** (horizontal, stacked, monogram, wordmark — all in light/dark)

This is a dramatic improvement. The strategy-to-execution gap identified this morning is rapidly closing.

---

*Next evaluation: after deployment to staging URL. Will run Lighthouse, test form submission, and do a full VP Claims walkthrough.*
