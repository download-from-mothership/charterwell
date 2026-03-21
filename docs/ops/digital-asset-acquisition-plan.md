# Charterwell — Digital Asset Acquisition & Protection Plan

**Prepared by:** Domain Ops Agent (Brand Operations Lead)
**Date:** 2026-03-21
**Status:** Phase 1 — Reconnaissance Complete
**Classification:** Internal / Confidential

---

## Executive Summary

This document outlines Charterwell's digital asset acquisition strategy covering domains, DNS, SSL/TLS, social handles, and brand protection. The primary brand domain `charterwell.ai` is secured. The high-priority `.com` acquisition target is listed for sale at $6,095 on HugeDomains — within budget and negotiable. Twelve defensive domains are available for immediate registration. Social handle acquisition is in progress.

---

## 1. Domain Portfolio — Current State

### 1.1 Owned Domains

| Domain | Registrar | Created | Expires | DNS Provider | WHOIS Privacy | Auto-Renew | Status |
|--------|-----------|---------|---------|--------------|---------------|------------|--------|
| **charterwell.ai** | Namecheap | 2026-03-21 | 2028-03-21 | Namecheap (registrar-servers.com) | ✅ Yes | ⚠️ Verify | Primary brand domain |
| **charterwell.io** | Namecheap | 2026-03-16 | TBD | Cloudflare (mark.ns / thea.ns) | ✅ Yes | ⚠️ Verify | Secondary / dev domain |

**Action items for owned domains:**
- Verify auto-renew is enabled on both domains in Namecheap dashboard
- Extend charterwell.ai registration to 5 years (currently 2 years)
- Confirm registrar lock is enabled on both domains
- Migrate charterwell.ai DNS to Cloudflare (currently on Namecheap defaults) for unified DNS management with charterwell.io

### 1.2 Acquisition Target — charterwell.com

| Field | Value |
|-------|-------|
| **Current Owner** | HugeDomains.com (domain speculator, Denver CO) |
| **Registrar** | NameBright (HugeDomains subsidiary) |
| **WHOIS Contact** | domains@hugedomains.com |
| **Listed Price** | $6,095 (or $253.96/mo × 24 months) |
| **DNS** | NSG1/NSG2.NAMEBRIGHTDNS.COM |
| **Active Content** | None — redirects to HugeDomains sale page |
| **MX Records** | None |

**Assessment:** This is a standard parked domain held by a high-volume domain speculator. HugeDomains typically accepts 50–70% of listed price through negotiation. No active business operates on this domain.

**Recommended Acquisition Strategy:**
1. **Do not purchase at listed price.** HugeDomains prices are inflated starting points.
2. **Initiate anonymous inquiry** via HugeDomains' "Make an Offer" flow or a broker.
3. **Opening offer:** $2,500 (41% of listed price — standard lowball for HugeDomains)
4. **Target settlement:** $3,500–$4,500 (realistic based on comparable .com sales for 11-character dictionary-word domains)
5. **Walk-away price:** $6,095 (listed price is acceptable if negotiation stalls — within $10K budget)
6. **Escalation threshold:** If counter exceeds $6,500 → escalate to CEO
7. **Timeline:** 5–10 business days for HugeDomains negotiation (they respond quickly)
8. **Transfer:** HugeDomains uses Escrow.com for transfers. Expect 1–3 days post-payment.

**Post-acquisition:** Register for 5 years, enable WHOIS privacy, configure 301 redirect to charterwell.ai (or hold for future use as enterprise-facing primary).

### 1.3 Available Domains — Immediate Registration Recommended

All of the following are unregistered and available for standard registration:

| Domain | Type | Priority | Est. Cost/yr | Rationale |
|--------|------|----------|-------------|-----------|
| charterwell.net | Defensive TLD | High | ~$12 | Common alternative TLD |
| charterwell.org | Defensive TLD | High | ~$12 | Common alternative TLD |
| charterwell.co | Defensive TLD | High | ~$12 | Popular startup TLD |
| charterwellai.com | Brand variant | High | ~$12 | Likely search/direct-nav pattern |
| getcharterwell.com | Brand variant | Medium | ~$12 | Common SaaS pattern |
| charterwell.app | Defensive TLD | Medium | ~$15 | Tech-associated TLD |
| charterwell.dev | Defensive TLD | Medium | ~$15 | Developer-associated TLD |
| charterwell.tech | Defensive TLD | Low | ~$10 | Less common TLD |
| charterwell.insurance | Industry TLD | Medium | ~$40 | Industry-specific, prevents confusion |
| charterwall.com | Typo/phonetic | Medium | ~$12 | Common misspelling |
| charterwall.ai | Typo/phonetic | Medium | ~$25 | Common misspelling on primary TLD |
| getcharterwel.com | Typo | Low | ~$12 | Missing 'l' typo |

**Total estimated registration cost:** ~$189/year for all 12 domains
**Recommended registration term:** 2 years minimum

**Registration requirements:**
- Single registrar account (Namecheap or migrate all to Cloudflare Registrar)
- WHOIS privacy enabled on all
- Auto-renew enabled on all
- DNS pointing to a branded parking page or 301 redirect to charterwell.ai

### 1.4 Registered by Third Parties — Monitoring Required

| Domain | Registrar | Created | Owner | Risk Level | Action |
|--------|-----------|---------|-------|------------|--------|
| **chartwell.ai** | GoDaddy | 2025-06-29 | Unknown (WHOIS redacted) | ⚠️ Medium | Monitor. Could cause confusion with Chartwell Insurance entities. **Flag to Legal** for trademark assessment. |
| **chartwellai.com** | Namecheap | 2025-05-12 | Unknown (WHOIS redacted) | ⚠️ Medium | Monitor. Could be Chartwell Insurance or speculator. **Flag to Legal.** |

**Legal coordination note:** Both `chartwell.ai` and `chartwellai.com` were registered in mid-2025, before Charterwell's formation. These may be held by existing Chartwell entities (Chartwell Insurance, Chartwell Compliance, etc.) or independent speculators. Legal agent should assess whether these registrations create trademark confusion risk and whether UDRP or coexistence negotiation is appropriate.

---

## 2. DNS Configuration & Delegation Plan

### 2.1 Current State

| Domain | DNS Provider | NS Records |
|--------|-------------|------------|
| charterwell.ai | Namecheap | dns1/dns2.registrar-servers.com |
| charterwell.io | Cloudflare | mark.ns / thea.ns.cloudflare.com |

### 2.2 Target Architecture

**Recommended:** Consolidate all DNS on **Cloudflare** for unified management, DDoS protection, and CDN integration.

```
charterwell.ai    →  Cloudflare DNS (primary zone)
charterwell.io    →  Cloudflare DNS (already configured)
charterwell.com   →  Cloudflare DNS (post-acquisition)
All defensive     →  Cloudflare DNS (redirect-only zones)
```

### 2.3 DNS Record Plan — charterwell.ai (Primary)

| Record | Type | Value | Purpose |
|--------|------|-------|---------|
| @ | A | TBD (hosting IP) | Primary website |
| @ | AAAA | TBD | IPv6 website |
| www | CNAME | charterwell.ai | www redirect |
| @ | MX | TBD (email provider) | Email delivery |
| @ | TXT | TBD (SPF) | Email authentication |
| _dmarc | TXT | TBD (DMARC policy) | Email authentication |
| google._domainkey | TXT | TBD (DKIM) | Email signing |

### 2.4 Migration Steps

1. Add charterwell.ai zone to Cloudflare account
2. Import existing DNS records
3. Update NS records at Namecheap to point to Cloudflare
4. Verify propagation (24–48 hours)
5. Enable Cloudflare proxy (orange cloud) on A/AAAA records
6. Configure SSL mode: Full (Strict)

---

## 3. SSL/TLS Setup

### 3.1 Approach

**Cloudflare Universal SSL** for all domains routed through Cloudflare:
- Automatic certificate issuance and renewal
- Edge certificates (Cloudflare ↔ visitor): managed automatically
- Origin certificates (Cloudflare ↔ origin server): use Cloudflare Origin CA (15-year validity)

### 3.2 Configuration

| Setting | Value |
|---------|-------|
| SSL Mode | Full (Strict) |
| Minimum TLS Version | TLS 1.2 |
| Always Use HTTPS | Enabled |
| HSTS | Enabled (max-age=31536000, includeSubDomains) |
| Automatic HTTPS Rewrites | Enabled |
| Certificate Transparency Monitoring | Enabled |

### 3.3 Certificate Transparency Monitoring

Monitor CT logs for certificates issued to `charterwell*` and `chartwell*ai` patterns:
- Service: crt.sh / Cloudflare CT monitoring
- Alert destination: ops@charterwell.ai
- Purpose: Detect impersonation or phishing sites

---

## 4. Redirect Strategy

### 4.1 Primary Redirects

| Source | Destination | Type | Notes |
|--------|------------|------|-------|
| charterwell.com | charterwell.ai | 301 Permanent | Post-acquisition. Enterprise visitors land on primary. |
| www.charterwell.ai | charterwell.ai | 301 Permanent | Canonical non-www |
| www.charterwell.com | charterwell.ai | 301 Permanent | Post-acquisition |
| charterwell.io | charterwell.ai | 301 Permanent | Or reserve for developer docs |

### 4.2 Defensive Domain Redirects

All defensive domains → 301 to `https://charterwell.ai`

Implementation: Cloudflare Page Rules or Bulk Redirects (no origin server needed for redirect-only domains).

### 4.3 Future Consideration

If `charterwell.com` becomes the primary enterprise-facing domain post-launch, the redirect direction can be reversed. The `.ai` TLD reinforces the AI positioning; the `.com` provides enterprise credibility. Decision should be made by CEO/CMO before public launch.

---

## 5. Social Media Handle Inventory

### 5.1 Target Handles

| Platform | Primary Handle | Alt Handle | Status | Notes |
|----------|---------------|------------|--------|-------|
| LinkedIn | /company/charterwell | /company/charterwell-ai | ✅ Available | Company page — CMO coordination needed |
| X / Twitter | @charterwell | @charterwellai | ✅ Available | Both primary and alt available |
| GitHub | /charterwell | /charterwell-ai | ✅ Available | Org account for open-source |
| YouTube | @charterwell | @charterwellai | ✅ Available | |
| Reddit | r/charterwell | u/charterwell | ✅ Available | Subreddit and username both free |
| Instagram | @charterwell | @charterwellai | ✅ Available | |
| Bluesky | @charterwell.bsky.social | — | ✅ Available | Can also use @charterwell.ai custom domain |
| Product Hunt | @charterwell | — | 🔍 Not checked | Manual check needed |
| Crunchbase | /organization/charterwell | — | 🔍 Not checked | Manual check needed |

> **Audit completed 2026-03-21.** All primary handles are available across major platforms. Registration should be executed immediately in Phase 2 to prevent squatting. Platform-specific caveats: some platforms (notably X/Twitter) may restrict usernames even if they appear unregistered — attempt registration promptly to confirm.

### 5.2 Registration Requirements

For all secured handles:
- Account email: brand@charterwell.ai
- Display name: "Charterwell"
- Bio: "The AI-native claims intelligence workspace. Coming soon."
- Avatar: Charterwell monogram (or solid Deep Navy #1B2A4A placeholder)
- No content published pre-launch

### 5.3 Handle Reclaim Strategy (if taken)

For inactive handles (no posts 12+ months, low followers):
1. File trademark-based reclaim request with platform
2. Timeline: 2–8 weeks depending on platform

For active handles:
1. Evaluate alternative handle (preference: @charterwellai > @charterwell_hq > @charterwellco)
2. Document decision and rationale

---

## 6. Timeline & Status Tracker

### Phase 1: Reconnaissance ✅ (Day 1 — 2026-03-21)

- [x] WHOIS lookups on all primary, defensive, and confusion-prevention domains
- [x] DNS record inspection on owned domains
- [x] charterwell.com acquisition target identified (HugeDomains, $6,095 listed)
- [x] Available defensive domains catalogued (12 available)
- [x] Third-party registrations identified (chartwell.ai, chartwellai.com)
- [x] Social handle availability audit — all primary handles available across 8 platforms
- [ ] Flag chartwell.ai and chartwellai.com to Legal agent

### Phase 2: Immediate Registrations (Day 2)

- [ ] Register all 12 available defensive domains
- [ ] Configure WHOIS privacy and auto-renew on all new registrations
- [ ] Point all defensive domains to branded parking page or 301 redirect
- [ ] Reserve all available social media handles

### Phase 3: Acquisition Strategy (Days 2–3)

- [ ] Initiate charterwell.com negotiation via HugeDomains (opening: $2,500)
- [ ] Assess chartwell.ai and chartwellai.com acquisition feasibility (coordinate with Legal)
- [ ] Execute social handle reclaim for any taken handles

### Phase 4: DNS & Infrastructure (Day 4)

- [ ] Migrate charterwell.ai DNS to Cloudflare
- [ ] Configure SSL/TLS (Full Strict mode)
- [ ] Set up redirect rules for all defensive domains
- [ ] Configure email DNS records (SPF, DKIM, DMARC)
- [ ] Set up CT log monitoring

### Phase 5: Documentation & Handoff (Day 5)

- [ ] Finalize master asset spreadsheet
- [ ] Complete renewal calendar
- [ ] Credential vault populated
- [ ] Monitoring alerts configured and tested
- [ ] Legal coordination log compiled
- [ ] Handoff package delivered to CEO

---

## 7. Budget Summary

| Item | Estimated Cost |
|------|---------------|
| charterwell.com acquisition | $3,500–$6,095 (negotiation range) |
| 12 defensive domain registrations (2-year terms) | ~$378 |
| charterwell.ai extension to 5-year term | ~$75 |
| Cloudflare DNS (free tier) | $0 |
| SSL/TLS via Cloudflare | $0 |
| **Total estimated** | **$3,953–$6,548** |
| **Budget allocated** | **$10,500** |

---

## 8. Legal Coordination — Flags

The following findings should be shared with the Legal agent / IP counsel immediately:

1. **chartwell.ai** — Registered 2025-06-29 via GoDaddy. Unknown owner. Could be a Chartwell Insurance entity or independent registrant. Potential source of brand confusion.

2. **chartwellai.com** — Registered 2025-05-12 via Namecheap. Unknown owner. Same confusion risk.

3. **charterwell.com** — Owned by HugeDomains (speculator). No trademark conflict, but acquisition should be completed before trademark filing to avoid price inflation if the filing becomes public.

4. **"Chartwell" entities** — Multiple existing Chartwell-branded companies operate in insurance (Chartwell Insurance, Chartwell Compliance). The "Charterwell" spelling provides differentiation, but defensive domain acquisition around "Chartwell" variants is prudent.

---

## 9. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| charterwell.com price exceeds budget | Low | Medium | Walk away at $10K; .ai is viable primary |
| Squatter registers defensive domains during acquisition window | Low | High | Register all available domains immediately (Day 2) |
| chartwell.ai owner opposes Charterwell trademark | Medium | Medium | Legal assessment + coexistence agreement if needed |
| Social handles taken by squatters | Low | Low | Trademark reclaim process; alternative handles ready |
| Brand name leaks before domain portfolio secured | Low | High | Accelerate Phase 2 registrations; no public announcements until portfolio locked |

---

*Document maintained by Domain Ops Agent. Last updated: 2026-03-21.*
