# Charterwell Financial Model: Seed → Series A (24-Month Horizon)

**Prepared by:** CFO | **Date:** 2026-03-21 | **Issue:** KEN-27

---

## Executive Summary

This bottoms-up financial model projects Charterwell's first 24 months post-seed close. We recommend a **hybrid pricing model** (platform subscription + per-claim usage fee) targeting mid-market and enterprise P&C insurers. Under the base case, Charterwell reaches **$2.4M ARR by Month 24** with 8 enterprise customers, positioning for a Series A raise at 80–120x ARR ($190–290M valuation).

Key findings:
- **Seed raise:** $12M at $50M pre-money valuation
- **Monthly burn at Month 24:** $490K → runway extends to ~Month 28 under base case
- **Gross margin:** 72–78% (after LLM inference costs)
- **LTV/CAC ratio:** 5.2x at steady state — strong unit economics for enterprise SaaS
- **Series A trigger:** $2–3M ARR, 6–10 customers, NRR >120%

---

## 1. Revenue Model

### Pricing Architecture: Hybrid (Platform + Usage)

**Recommendation:** Hybrid model combining a platform subscription with per-claim usage fees.

**Rationale:**
- Pure per-seat pricing is declining (dropped from 21% to 15% of SaaS companies in 12 months). AI-powered products decouple value from headcount — one adjuster with Charterwell does the work of five.
- Per-claim usage aligns revenue with customer value (faster claims = more throughput = more revenue for Charterwell).
- Platform fee provides revenue predictability for forecasting and investor narrative.
- 43% of SaaS companies now use hybrid models (Chargebee 2025 report), projected to reach 61% by end of 2026.
- Insurance carriers prefer predictable budgeting (platform fee) with upside sharing (usage fee) — this mirrors how Guidewire prices cloud subscriptions.

### Pricing Tiers

| Component | Starter | Professional | Enterprise |
|---|---|---|---|
| **Platform fee** (annual) | $60,000 | $150,000 | $300,000+ |
| **Per-claim fee** | $2.50 | $2.00 | $1.50 (negotiable) |
| **Included claims/month** | 2,000 | 8,000 | 25,000 |
| **Overage per claim** | $3.00 | $2.50 | $2.00 |
| **Users included** | 10 | 50 | Unlimited |
| **Target segment** | Regional carriers | Mid-market | Top 50 carriers |
| **Expected ACV** | $120K | $250K | $500K+ |

**Expected ACV calculation (Professional tier example):**
- Platform: $150,000
- Usage: 10,000 claims/month × $2.00 × 12 = $240,000 → capped/blended to ~$100K above included
- **Blended ACV: ~$250,000**

### Why Not Per-Seat?

| Factor | Per-Seat | Per-Claim (Hybrid) |
|---|---|---|
| Value alignment | Weak — AI reduces headcount need | Strong — more claims processed = more value |
| Revenue scalability | Capped by adjuster count | Scales with claims volume |
| Customer perception | "Paying for logins" | "Paying for outcomes" |
| Market trend | Declining (15% of SaaS) | Rising (43%+ hybrid adoption) |
| Upsell path | Add seats (friction) | Natural volume growth |

---

## 2. Customer Acquisition Timeline

Enterprise insurance sales cycles run 6–12 months. We model a realistic ramp:

| Month | Activity | Cumulative Customers | New ARR Added | Cumulative ARR |
|---|---|---|---|---|
| 1–3 | Product refinement, 2 design partners (free/discounted) | 0 paying | $0 | $0 |
| 4–6 | Convert design partners, begin outbound | 2 | $300K | $300K |
| 7–9 | First cold-start enterprise closes | 4 | $450K | $750K |
| 10–12 | Pipeline acceleration, referrals begin | 6 | $550K | $1,300K |
| 13–18 | Expansion revenue + new logos | 8 | $600K | $1,900K |
| 19–24 | Series A prep, accelerated hiring | 10 | $500K | $2,400K |

**Key assumptions:**
- Average ACV across tiers: $250K (weighted toward Professional)
- Design partner conversion rate: 80%
- Win rate on qualified pipeline: 25%
- Sales cycle: 8 months average (6 for mid-market, 12 for enterprise)
- Net revenue retention (NRR): 115% (usage growth + tier upgrades)

---

## 3. Cost Structure

### 3A. Team & Compensation

#### Founding Team (Months 1–6): 5 people

| Role | Salary | Equity (4yr vest) | Benefits (20%) | Total Loaded Cost |
|---|---|---|---|---|
| CEO / Co-founder | $180,000 | 20% | $36,000 | $216,000 |
| CTO / Co-founder | $180,000 | 15% | $36,000 | $216,000 |
| Senior ML Engineer | $190,000 | 3% | $38,000 | $228,000 |
| Full-Stack Engineer | $170,000 | 2.5% | $34,000 | $204,000 |
| Head of Sales | $160,000 + comm. | 2% | $32,000 | $192,000 + comm. |

**Monthly founding team cost: $88K** (loaded, excluding commissions)

#### Hiring Plan (Months 1–24): Path to 18 People

| Hire # | Role | Start Month | Annual Salary | Monthly Loaded |
|---|---|---|---|---|
| 6 | ML Engineer #2 | 4 | $185,000 | $18,500 |
| 7 | Backend Engineer | 5 | $175,000 | $17,500 |
| 8 | Account Executive #1 | 6 | $140,000 + comm. | $14,000 + comm. |
| 9 | DevOps / Infra Engineer | 7 | $180,000 | $18,000 |
| 10 | Customer Success Lead | 8 | $130,000 | $13,000 |
| 11 | Frontend Engineer | 10 | $165,000 | $16,500 |
| 12 | Account Executive #2 | 10 | $140,000 + comm. | $14,000 + comm. |
| 13 | Data Engineer | 12 | $175,000 | $17,500 |
| 14 | Solutions Engineer | 14 | $160,000 | $16,000 |
| 15 | Compliance / Legal (PT→FT) | 14 | $150,000 | $15,000 |
| 16 | ML Engineer #3 | 16 | $185,000 | $18,500 |
| 17 | Account Executive #3 | 18 | $140,000 + comm. | $14,000 + comm. |
| 18 | Product Manager | 20 | $170,000 | $17,000 |

**Compensation benchmarks:** Bay Area seed-stage startups pay $132–190K base for engineers (TechCrunch/Wellfound 2025–2026 data). We budget at 75th percentile to attract top AI talent.

**Sales commission structure:** 10% of first-year ACV, paid on close. Estimated $25K per deal average.

#### Monthly Headcount & People Cost Ramp

| Month | Headcount | Monthly People Cost |
|---|---|---|
| 1 | 5 | $88K |
| 6 | 8 | $138K |
| 12 | 13 | $218K |
| 18 | 16 | $280K |
| 24 | 18 | $318K |

### 3B. Infrastructure & LLM Costs

This is the **largest variable cost** and most critical to model carefully.

#### LLM Inference Cost Model

**Claims processing pipeline per claim (estimated token usage):**

| Step | Model | Input Tokens | Output Tokens | Cost per Claim |
|---|---|---|---|---|
| Document OCR + extraction | Haiku ($0.25/$1.25 per 1M) | 5,000 | 2,000 | $0.004 |
| Claims triage & categorization | Haiku | 3,000 | 500 | $0.002 |
| Detailed analysis & summary | Sonnet ($3/$15 per 1M) | 8,000 | 3,000 | $0.069 |
| Fraud signal detection | Sonnet | 5,000 | 1,000 | $0.030 |
| Recommendation generation | Sonnet | 4,000 | 2,000 | $0.042 |
| **Total per claim** | | **25,000** | **8,500** | **$0.147** |

**With prompt caching (90% savings on repeated context):** ~$0.09 per claim effective cost.

**Note:** LLM API prices dropped ~80% from 2025 to 2026. We model current pricing with a conservative 20% annual decline assumption.

#### Monthly LLM Cost by Claims Volume

| Monthly Claims | Cost/Claim | Monthly LLM Cost | As % of Claim Revenue |
|---|---|---|---|
| 5,000 (M6) | $0.09 | $450 | 4.5% of $10K usage rev |
| 20,000 (M12) | $0.09 | $1,800 | 4.5% of $40K usage rev |
| 60,000 (M18) | $0.08 | $4,800 | 4.0% of $120K usage rev |
| 100,000 (M24) | $0.07 | $7,000 | 3.5% of $200K usage rev |

**Key insight:** LLM costs are remarkably low relative to revenue — **3.5–4.5% of usage revenue**. This is the structural advantage of the hybrid pricing model: we charge $1.50–2.50 per claim while inference costs <$0.10 per claim. **~95% gross margin on the usage component.**

#### Other Infrastructure Costs

| Item | Month 1–6 | Month 7–12 | Month 13–24 |
|---|---|---|---|
| Cloud hosting (AWS/GCP) | $3K/mo | $8K/mo | $15K/mo |
| Supabase (database) | $1K/mo | $3K/mo | $5K/mo |
| Cloudflare Workers | $0.5K/mo | $1K/mo | $2K/mo |
| Monitoring / DevOps tools | $0.5K/mo | $1K/mo | $2K/mo |
| LLM inference (from above) | $0.5K/mo | $2K/mo | $7K/mo |
| **Total infra** | **$5.5K/mo** | **$15K/mo** | **$31K/mo** |

### 3C. Other Operating Costs

| Category | Month 1–6 | Month 7–12 | Month 13–24 |
|---|---|---|---|
| Office / co-working | $5K/mo | $10K/mo | $15K/mo |
| Legal & compliance | $5K/mo | $8K/mo | $12K/mo |
| Insurance (E&O, cyber) | $2K/mo | $3K/mo | $4K/mo |
| Travel & conferences | $3K/mo | $5K/mo | $8K/mo |
| Marketing & content | $2K/mo | $8K/mo | $15K/mo |
| Software & tools | $2K/mo | $4K/mo | $6K/mo |
| Recruiting | $0K/mo | $5K/mo | $8K/mo |
| Miscellaneous / buffer | $3K/mo | $5K/mo | $7K/mo |
| **Total opex** | **$22K/mo** | **$48K/mo** | **$75K/mo** |

---

## 4. Consolidated P&L (Monthly Snapshots)

| Metric | Month 6 | Month 12 | Month 18 | Month 24 |
|---|---|---|---|---|
| **Revenue** | | | | |
| Platform subscriptions | $12.5K | $54K | $119K | $167K |
| Usage / per-claim fees | $10K | $40K | $80K | $133K |
| **Total revenue** | **$22.5K** | **$94K** | **$199K** | **$300K** |
| | | | | |
| **COGS** | | | | |
| LLM inference | $0.5K | $2K | $5K | $7K |
| Hosting & infra | $5K | $13K | $24K | $31K |
| **Total COGS** | **$5.5K** | **$15K** | **$29K** | **$38K** |
| **Gross profit** | **$17K** | **$79K** | **$170K** | **$262K** |
| **Gross margin** | **76%** | **84%** | **85%** | **87%** |
| | | | | |
| **Operating expenses** | | | | |
| People (loaded) | $138K | $218K | $280K | $318K |
| Sales commissions | $6K | $10K | $12K | $15K |
| Other opex | $22K | $48K | $65K | $75K |
| **Total opex** | **$166K** | **$276K** | **$357K** | **$408K** |
| | | | | |
| **Net burn** | **($149K)** | **($197K)** | **($187K)** | **($146K)** |
| **Monthly burn (total spend)** | **$171K** | **$291K** | **$386K** | **$446K** |

### Cumulative Cash Position (from $12M seed)

| Month | Cumulative Revenue | Cumulative Spend | Cash Remaining |
|---|---|---|---|
| 6 | $45K | $780K | $11.3M |
| 12 | $395K | $2,140K | $10.3M |
| 18 | $1,285K | $4,180K | $9.1M |
| 24 | $2,785K | $6,870K | $7.9M |

**Runway at Month 24 burn rate ($446K/mo):** ~17.7 months of remaining runway. **Total runway from seed: ~42 months.** This provides ample cushion for Series A timing.

---

## 5. Unit Economics

### Customer Acquisition Cost (CAC)

| Component | Calculation | Value |
|---|---|---|
| Sales team cost (fully loaded) | 3 AEs × $14K/mo + Head of Sales $16K/mo = $58K/mo | $58K/mo |
| Marketing spend | ~$15K/mo at scale | $15K/mo |
| Sales commissions | $25K per deal average | Per-deal |
| Total S&M monthly | | $73K/mo |
| Deals closed per month (M18+) | ~0.67 deals/mo (8 deals/yr) | |
| **Blended CAC** | ($73K × 12) / 8 deals | **$110K** |

**Note:** This is high but expected for enterprise insurance SaaS with 8-month sales cycles. Industry benchmark for insurance SaaS CAC is $50–150K per enterprise customer.

### Lifetime Value (LTV)

| Component | Value | Assumption |
|---|---|---|
| Average ACV | $250,000 | Weighted across tiers |
| Gross margin | 85% | At scale |
| Annual churn | 10% | Enterprise insurance = sticky |
| NRR | 115% | Usage growth + tier upgrades |
| **Gross margin-adjusted LTV** | **$250K × 0.85 / 0.10 = $2,125K** | Adjusted for NRR: higher |
| **Effective LTV (with NRR)** | **$250K × 0.85 × (1.15/0.10)** ≈ **$570K** (5-year horizon) | Conservative 5-year cap |

### Key Ratios

| Metric | Value | Benchmark | Assessment |
|---|---|---|---|
| **LTV/CAC** | 5.2x | >3x is good | ✅ Strong |
| **CAC payback** | 6.2 months | <18 months for enterprise | ✅ Excellent |
| **Gross margin** | 85% at scale | 70–85% for SaaS | ✅ Top quartile |
| **NRR target** | 115% | >110% for enterprise | ✅ Healthy |
| **Annual churn** | 10% | 5–15% for enterprise | ✅ On target |
| **Magic number** | 0.8 (projected M18) | >0.75 is efficient | ✅ Good |

**CAC payback calculation:** $110K CAC / ($250K ACV × 85% margin / 12) = 6.2 months. This is unusually fast for enterprise — driven by high ACV relative to sales cost. If ACV comes in lower ($150K), payback extends to ~10 months, still healthy.

---

## 6. Scenario Analysis

### Three Scenarios: Conservative, Base, Aggressive

| Metric | Conservative | Base | Aggressive |
|---|---|---|---|
| **Customers at M24** | 5 | 10 | 16 |
| **Avg ACV** | $180K | $250K | $300K |
| **ARR at M24** | $900K | $2,400K | $4,800K |
| **Monthly burn at M24** | $380K | $446K | $550K |
| **Cash remaining at M24** | $8.8M | $7.9M | $6.5M |
| **Remaining runway** | 23 months | 18 months | 12 months |
| **Series A ready?** | Borderline — may need bridge | Yes — strong position | Yes — raise early |
| **Implied Series A val.** | $72–135M (80–150x) | $190–290M (80–120x) | $290–480M (60–100x) |

### What Would Need to Be True (for Base Case)

1. **Product-market fit by Month 6:** Both design partners convert to paying customers with measurable ROI (>30% claims processing time reduction).
2. **Sales engine works by Month 10:** At least 2 cold-start enterprise deals close, validating repeatable sales motion.
3. **NRR >110% by Month 12:** Existing customers expand usage — more claim types, more adjusters, higher volumes.
4. **LLM costs stay ≤5% of usage revenue:** Price declines in LLM APIs continue at 20%+ annually.
5. **Churn <15% annually:** No logo churn in first 18 months (enterprise contracts are typically multi-year).
6. **Hiring velocity:** Successfully recruit 13 additional people in 24 months in a competitive AI talent market.

### Sensitivity: What Breaks the Model?

| Risk | Impact | Mitigation |
|---|---|---|
| ACV below $150K | CAC payback >12 months, LTV/CAC <3x | Pre-qualify on claims volume; walk away from small carriers |
| Sales cycle >12 months | Delays ARR by 6+ months; cash pressure | Start with mid-market (shorter cycles); invest in POC automation |
| LLM costs spike (model deprecation, pricing changes) | Gross margin drops to 60–70% | Multi-model strategy (Claude + Gemini + open-source fallback) |
| Enterprise churn >20% | LTV collapses, unit economics break | Invest in customer success early; contractual minimums |
| Hiring failure (AI talent war) | Product roadmap delays | Remote-first; competitive equity; consider London/Toronto hubs |

---

## 7. Series A Readiness Checklist

Target Series A raise: **Month 18–22** (Q4 2027 – Q2 2028)

| Metric | Target | Status Trigger |
|---|---|---|
| ARR | $2–3M | Must-have |
| Customers | 6–10 enterprise logos | Must-have |
| NRR | >120% | Strong signal |
| Gross margin | >75% | Must-have |
| Logo churn | <10% annually | Must-have |
| Sales pipeline | 3x target ARR | Must-have |
| Burn multiple | <3x | Efficiency signal |
| Team size | 15–18 | Shows execution |

**Target Series A raise:** $30–50M at $200–300M pre-money (80–120x ARR), based on Legora/Harvey comp multiples for vertical AI SaaS (see [KEN-26 Comparable Analysis](/KEN/issues/KEN-26)).

---

## 8. Key Assumptions & Risks Register

| Assumption | Value Used | Sensitivity |
|---|---|---|
| Seed raise amount | $12M | ±$3M doesn't change strategy |
| Average ACV | $250K | High impact — ±$50K shifts payback by 2–3 months |
| Sales cycle | 8 months | High impact — 12 months delays ARR by 2 quarters |
| LLM cost per claim | $0.09 (effective) | Low impact — even at $0.50, margins stay >70% |
| Annual LLM price decline | 20% | Low impact on model |
| Loaded cost per employee | $200K average | Medium impact — 10% increase = $36K/mo at M24 |
| Enterprise churn rate | 10% annually | High impact on LTV |
| NRR | 115% | Medium impact — drives expansion revenue |
| Commission rate | 10% first-year ACV | Low impact |

---

## Sources

- [SaaS Pricing Strategy Guide 2026 — NxCode](https://www.nxcode.io/resources/news/saas-pricing-strategy-guide-2026)
- [What Actually Works in SaaS Pricing — Growth Unhinged](https://www.growthunhinged.com/p/2025-state-of-saas-pricing-changes)
- [Insurance Pricing Metric Analysis — Monetizely](https://www.getmonetizely.com/articles/which-pricing-metric-fits-insurance-carriers-saas-best-per-seat-per-transaction-or-per-outcome)
- [LLM API Pricing 2026 — TLDL](https://www.tldl.io/resources/llm-api-pricing-2026)
- [LLM Cost Per Token Guide — Silicon Data](https://www.silicondata.com/blog/llm-cost-per-token)
- [Seed Stage Compensation — TechCrunch](https://techcrunch.com/2024/12/25/132k-149k-heres-what-seed-stage-founders-pay-early-employees-based-on-data/)
- [Startup Salaries 2026 — Wellfound](https://wellfound.com/hiring-data/l/san-francisco-bay-area)
- [CAC Benchmarks by Industry — Usermaven](https://usermaven.com/blog/average-customer-acquisition-cost)
- [AI in Insurance 2026 — SAS](https://www.sas.com/en_us/news/press-releases/2025/december/insurance-ai-operating-system.html)
- [Insurance AI Predictions 2026 — Roots Automation](https://www.roots.ai/blog/10-insurance-ai-predictions-2026-forecasting-shift-from-promise-performance)
