# Marketing Website Evaluation — charterwell.io

**Prepared by:** CMO
**Date:** 2026-03-21
**Issue:** KEN-60
**Status:** NOT LAUNCH-READY

---

## Executive Summary

**charterwell.io does not exist.** The domain does not resolve, no website codebase has been built, and no deployment infrastructure is configured. None of the five success criteria can be evaluated against a live product because there is no live product.

What *does* exist is an exceptionally thorough set of strategy documents (01 through 09 in `docs/marketing/`) that define positioning, messaging, content calendar, buyer personas, and brand guidelines. The strategy is board-ready. The execution has not started.

---

## Success Criteria Assessment

### 1. IS IT LIVE AND FAST?

| Criterion | Status | Evidence |
|---|---|---|
| charterwell.io loads in under 2 seconds on 4G | **FAIL** | Domain does not resolve (DNS NXDOMAIN) |
| Lighthouse: Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95 | **FAIL** | No page to test |
| Zero downtime in first 48 hours | **N/A** | Not launched |

**Verdict: FAIL — No website exists.**

**What's needed:**
- Domain acquisition: charterwell.io is referenced in the issue, but brand strategy (03) recommends charterwell.ai as primary and charterwell.com for enterprise credibility. Legal counsel (clearance-update-2026-03-21) now recommends charterwell.com as primary to create distance from chartwell.ai (ChartWellAI's domain). Domain strategy must be resolved before build.
- Framework selection and codebase scaffold
- Hosting/deployment configuration
- DNS setup and SSL

### 2. DOES IT PASS THE VP CLAIMS TEST?

| Criterion | Status | Evidence |
|---|---|---|
| Understand what Charterwell does within 10 seconds | **FAIL** | No site to visit |
| Believe it's credible within 30 seconds | **FAIL** | No site to visit |
| Find demo request form within 60 seconds | **FAIL** | No site to visit |
| Never triggers "startup" or "not ready" impression | **FAIL** | No site to visit |

**Verdict: FAIL — No website exists.**

**What's ready for build:**
- Homepage messaging is defined in 05-content-thought-leadership.md: *"The AI Claims Workspace. Every document understood. Every decision informed. Every claim connected."*
- Buyer personas are deeply researched (02-buyer-personas.md) with specific pain points for VP Claims, CIO, CCO, and Claims Team Lead
- Brand voice is established (03): "McKinsey meets Stripe" — authoritative but modern
- Page structure is planned: Homepage, Product, For Claims Leaders, For CIOs, Resources, About, Design Partners

**Gaps even in strategy:**
- No wireframes or design mockups exist
- No actual design assets (logo files, icons, imagery) referenced
- No demo/product screenshots available for the site to showcase
- Demo request form workflow not defined (where do submissions go? CRM? Email? Notion?)

### 3. CAN THE CMO UPDATE IT WITHOUT ENGINEERING?

| Criterion | Status | Evidence |
|---|---|---|
| Publish a new blog post without engineering | **FAIL** | No blog platform exists |
| Update homepage copy without engineering | **FAIL** | No CMS or content system exists |
| Add a customer logo without engineering | **FAIL** | No site exists |

**Verdict: FAIL — No website or CMS exists.**

**Recommendations for when we build:**
- Use a headless CMS (Sanity, Contentful, or Notion API) for blog posts and landing page copy
- Or use MDX/Markdown-based content in an Astro or Next.js site with a simple Git-based workflow
- Gated content system needed for whitepapers (per content strategy in 05)
- Whatever is chosen must support: blog posts, gated downloads, homepage copy edits, logo/image uploads

### 4. IS THE FOUNDING ENGINEER FREE?

| Criterion | Status | Evidence |
|---|---|---|
| Total engineering time ≤ 5 hours | **N/A** | Build hasn't started |
| Codebase onboardable in < 2 hours | **N/A** | No codebase exists |
| No unplanned maintenance burden | **N/A** | Nothing to maintain |

**Verdict: N/A — Cannot evaluate without a build.**

**Risk flag:** The 5-hour engineering budget is tight for a full marketing site with CMS, blog, gated content, form handling, SEO, and multi-page structure. This constraint strongly favors:
- A no-code/low-code approach (Webflow, Framer) — but may limit customization
- A template-based approach (Astro + Tailwind + MDX) — fast to scaffold, but still needs engineering for initial setup
- An AI-assisted build — which is likely the intent given the team's tooling

### 5. DOES IT OWN "CHARTERWELL" IN SEARCH?

| Criterion | Status | Evidence |
|---|---|---|
| "charterwell" returns our site as #1 within 2 weeks | **FAIL** | No site indexed |
| "charterwell ai" returns our site as #1 | **FAIL** | No site indexed |
| Clearly distinguishable from Chartwell entities | **FAIL** | No site exists |

**Verdict: FAIL — No website to index.**

**SEO readiness assessment:**
- Target keywords are well-defined (05-content-thought-leadership.md)
- Primary keyword cluster: "AI claims workspace" — this is a category-creation play, low competition
- Domain confusion risk is ELEVATED per legal counsel: charterwell.ai vs chartwell.ai (ChartWellAI) differ by one letter
- Legal recommends charterwell.com as primary domain, .ai as secondary
- Brand discipline critical: always "Charterwell" (never "Charter" or "Chartwell") per trademark guidance

---

## Overall Verdict

| Criterion | Status |
|---|---|
| 1. Live and Fast | **FAIL** |
| 2. VP Claims Test | **FAIL** |
| 3. CMO Can Update | **FAIL** |
| 4. Engineer is Free | **N/A** |
| 5. Owns Search | **FAIL** |

**The site is not launch-ready because it does not exist.**

---

## What Exists vs. What's Missing

### Ready (Strategy Layer)
- Brand identity and voice guidelines
- Buyer personas with pain points and messaging
- Homepage and page-level messaging
- Content calendar (6 months)
- SEO keyword strategy
- Competitive battle cards
- Pitch deck content
- LinkedIn company page strategy

### Missing (Execution Layer)
- Domain acquisition and DNS configuration
- Website codebase (framework, pages, components)
- CMS for non-engineering content updates
- Design assets (logo files, favicons, OG images)
- Blog platform with gated content support
- Form handling (demo requests, email capture)
- Analytics and tracking setup
- Deployment pipeline
- Wireframes or design mockups

---

## Recommended Next Steps

### Decision 1: Domain Strategy (URGENT)
Legal counsel recommends charterwell.com as primary, with .ai as secondary. The issue references charterwell.io. The board needs to decide:
- **Option A:** charterwell.com (enterprise credibility, distance from chartwell.ai)
- **Option B:** charterwell.ai (category signal, matches brand strategy docs)
- **Option C:** charterwell.io (developer/tech signal, defensive registration)

Recommendation: **Option A** per legal counsel, with .ai and .io as redirects.

### Decision 2: Build Approach
Given the 5-hour engineering constraint:

| Approach | Eng Time | CMO Updateable | Performance | Cost |
|---|---|---|---|---|
| Webflow | ~2 hours (DNS + integrations) | Yes | Good (≥85) | $30-50/mo |
| Framer | ~1 hour (DNS only) | Yes | Good (≥85) | $20-30/mo |
| Astro + MDX + Vercel | ~4-5 hours | Partial (Git-based) | Excellent (≥95) | Free-$20/mo |
| Next.js + Sanity + Vercel | ~8-10 hours | Yes | Excellent (≥95) | $20-50/mo |

Recommendation: **Framer or Webflow** for speed-to-launch within the engineering constraint. Migrate to a code-based solution later if needed.

### Decision 3: Timeline
Per GTM strategy (04), website launch is a Month 1-2 milestone. We need to know where we are in that timeline and what the hard deadline is.

---

*This evaluation will be updated once a website exists to test against the success criteria.*
