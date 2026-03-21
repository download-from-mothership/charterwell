# Charterwell MVP Definition

*Version 1.0 — March 21, 2026*

## Overview

The MVP targets **3 design partners** (mid-market P&C carriers, $1B–$10B GWP) with a focused product that proves Charterwell's core thesis: **AI-native document intelligence for insurance claims is dramatically better than the status quo of manual review + fragmented point solutions.**

**MVP Scope:** P&C property and auto claims only. Single-line, first-party claims. No commercial, no workers' comp, no specialty lines in V1.

**MVP Timeline:** 12 weeks to first design partner pilot; 20 weeks to all 3 partners live.

**Success Metrics for Pilot:**

- 70%+ reduction in FNOL document review time (from 15-20 min → <5 min)
- 90%+ field-level extraction accuracy on supported document types
- 80%+ correct adjuster routing on auto-triaged claims
- Adjuster NPS >40 (usability)
- Zero compliance incidents during pilot period

---

## Core Capability 1: Claims Intake & Triage

### What It Does

Receives claim submissions from multiple channels, classifies every document in the submission, extracts initial claim metadata, assigns severity/priority, and routes to the correct adjuster queue — all within seconds of receipt.

### Intake Channels (MVP)

| Channel | Priority | Implementation |
|---------|----------|---------------|
| **Email** | P0 — launch | MIME parsing (attachments + inline). Dedicated claims inbox per carrier. |
| **Portal upload** | P0 — launch | Web UI drag-and-drop. Batch upload (multiple docs per claim). |
| **API submission** | P0 — launch | REST API for CMS integration (Guidewire, Duck Creek). |
| **Fax/scan** | P1 — week 8 | TIFF/PDF ingestion from carrier's existing fax-to-email or scan workflow. |

### Document Classification

| Document Type | Priority | Training Data |
|---------------|----------|---------------|
| **FNOL / Loss Notice** | P0 | Free-text and structured FNOL forms |
| **ACORD Forms** (25, 27, 28, 125, 130, 140) | P0 | Standardized — high accuracy expected |
| **Police / Fire Reports** | P0 | Variable by jurisdiction; 50-state coverage |
| **Medical Records** | P1 | Multi-page, handwritten notes, PHI |
| **Invoices / Repair Estimates** | P0 | Contractor estimates, medical bills |
| **Photos / Images** | P1 | Damage photos (vehicle, property) |
| **Correspondence** | P1 | Emails, letters, adjuster notes |
| **Policy Declarations** | P0 | Dec pages, endorsements |

**Classification model:** Claude Haiku 4.5 for speed/cost. Few-shot prompting with carrier-specific examples. Target: **95%+ classification accuracy** on supported types. Fallback: flag for human review when confidence < 85%.

### Triage Logic

1. **Severity score** (1–5) based on: reported injury, estimated loss amount, number of involved parties, claim type
2. **Complexity flag** (simple / standard / complex) based on: number of documents, coverage questions identified, multi-party involvement
3. **Priority** (urgent / standard / low) based on: severity × regulatory deadline × policyholder tier

### Routing Rules

| Claim Profile | Route To |
|--------------|----------|
| Simple auto (<$5K, no injury, single party) | Junior adjuster queue / auto-fast-track |
| Standard auto ($5K–$50K, minor injury) | Standard adjuster queue |
| Complex auto (>$50K, serious injury, multi-party) | Senior adjuster / supervisor review |
| Property (weather event, >10 claims/day same peril) | CAT team queue |
| Fraud indicators detected | SIU referral queue |

Routing rules are **carrier-configurable** via the Playbook system. MVP ships with sensible defaults; design partners customize during onboarding.

### Duplicate Detection

- Same claimant + same date of loss + same policy number = likely duplicate
- Fuzzy matching on claimant name + address + loss description
- Confidence >90% = auto-merge, 70-90% = flag for review

---

## Core Capability 2: Intelligent Data Extraction

### What It Does

Extracts structured data from every document in a claim file, cross-validates across documents, produces a unified claim record with per-field confidence scores, and highlights inconsistencies.

### Extraction Pipeline

```
Document (PDF/image/email)
    │
    ▼
[Pre-processing]
    ├── Image enhancement (de-skew, contrast, noise reduction)
    ├── Page splitting (multi-doc PDFs)
    └── Language detection
    │
    ▼
[OCR + Layout Analysis]
    ├── Azure AI Document Intelligence (primary)
    │   ├── Layout-preserving text extraction
    │   ├── Table extraction
    │   ├── Checkbox / handwriting recognition
    │   └── Custom models for ACORD forms
    └── Fallback: raw text extraction for simple documents
    │
    ▼
[LLM-Powered Extraction]
    ├── Claude Sonnet 4.6 for structured field extraction
    ├── Insurance-specific prompt templates per document type
    ├── Schema-constrained output (JSON with typed fields)
    └── Per-field confidence scores
    │
    ▼
[Cross-Document Validation]
    ├── Policy number consistency across all docs
    ├── Date consistency (date of loss, report dates, treatment dates)
    ├── Amount consistency (claimed vs. estimated vs. invoiced)
    ├── Party name/address normalization
    └── Flag contradictions for adjuster review
    │
    ▼
[Structured Claim Record]
```

### Extracted Fields (MVP Schema)

**Claim Header:** Claim number, policy number, date of loss, date reported, line of business, coverage type, peril/cause of loss, claimant name/address/phone/email, insured name.

**Loss Details:** Loss description (AI-summarized), loss location (geocoded), involved parties, injuries reported (type, severity, treatment status), property damage description.

**Financial:** Claimed amount, estimated repair cost, medical expenses (itemized), policy limits (per occurrence, aggregate), deductible, prior claim history.

**Documents:** Document inventory (type, page count, date, source), per-document extraction summary, missing document checklist.

### Accuracy Targets

| Document Type | Target | Notes |
|---------------|--------|-------|
| ACORD forms | 97%+ | Standardized layout |
| FNOL (structured) | 95%+ | Form-based |
| FNOL (free-text) | 90%+ | NLP extraction |
| Police reports | 88%+ | Variable formats |
| Medical records | 85%+ | Handwriting, PHI |
| Invoices/estimates | 93%+ | Line-item extraction |

### Human-in-the-Loop

- Fields with confidence < 80% flagged for adjuster review
- Adjuster corrections tracked for quality monitoring
- "Accept all" for high-confidence claims (all fields > 95%)
- Side-by-side source document + extracted fields UI

---

## Core Capability 3: Claims Decision Support

### The Claims Grid

Centerpiece MVP UI — for each claim the adjuster sees:

| Column | Content |
|--------|----------|
| **Claim Summary** | AI-generated 3-sentence summary |
| **Coverage Analysis** | Applicable provisions with citations to policy language |
| **Issues & Flags** | Exclusions, condition violations, suspicious indicators |
| **Reserve Estimate** | AI-suggested initial reserve |
| **Missing Items** | Documents/info still needed |
| **Recommended Actions** | Approve, request info, escalate, SIU referral, deny |
| **Confidence** | Overall AI confidence score |

### Coverage Analysis Engine

1. **Policy Ingestion:** Partners upload policy forms, parsed and indexed per version.
2. **Coverage Matching:** Peril → coverage grants, property type → forms, injury → liability/med pay, amounts → limits/deductibles.
3. **Exclusion Screening:** Flags applicable exclusions with policy citations.
4. **Citation-Backed Output:** Every determination links to specific policy section and page.

### Reserve Estimation

- **Simple claims:** Rule-based using extracted amounts + carrier guidelines
- **Standard claims:** AI-estimated using extracted data + comparable benchmarks
- **Complex claims:** AI suggests range; adjuster sets final
- All estimates are **advisory only**

### Fraud Screening (Lightweight)

| Indicator | Detection |
|-----------|-----------|
| Claim within 30 days of inception | Date comparison |
| Multiple claims in 12 months | History lookup |
| Amount just below policy limit | Limit comparison |
| Inconsistent statements | Cross-doc contradiction |
| Known fraud patterns | Configurable rules |

Flagged claims route to SIU. No automated fraud decisions.

---

## Playbook System (MVP)

Carrier-configurable rules engine.

**Configurable elements:** routing rules, reserve guidelines, compliance checklists, coverage interpretation notes, escalation triggers.

**Implementation:** YAML/JSON config per carrier, admin UI, version-controlled with audit trail, changes take effect immediately.

---

## Technical Architecture (MVP)

| Component | Choice | Rationale |
|-----------|--------|----------|
| **Cloud** | Azure | Carriers are Microsoft shops; HIPAA BAA |
| **Compute** | Azure Container Apps | Serverless, auto-scaling |
| **OCR** | Azure AI Document Intelligence | Best accuracy, custom training |
| **Primary LLM** | Claude Sonnet 4.6 | Best extraction/reasoning |
| **Fast LLM** | Claude Haiku 4.5 | Classification, routing |
| **Database** | PostgreSQL (Azure) | pgvector for embeddings |
| **Search** | Elasticsearch | Policy doc search, semantic retrieval |
| **Storage** | Azure Blob | Document originals |
| **Queue** | Azure Service Bus | Async processing pipeline |
| **Auth** | Azure AD B2C | Enterprise SSO, tenant isolation |
| **Frontend** | Next.js (React) | Claims Grid UI |
| **API** | REST + webhooks | CMS integration |

### Data Architecture

- Separate DB schemas per carrier (tenant isolation)
- AES-256 at rest, TLS 1.3 in transit, field-level encryption for PHI/PII
- Configurable document retention (default 7 years)
- Full AI audit logging (input, output, model, confidence, timestamp, reviewer)

### Per-Claim Cost

$0.63–2.10 per claim. At $5–15/claim pricing → **70–90% gross margin**.

---

## Integration (MVP)

**Guidewire ClaimCenter (P0):** FNOL creation, claim updates, document attachment, extraction results, coverage analysis, activity/note creation — all via REST API/webhooks.

**Duck Creek Claims (P1):** Design partner 3.

**Email:** Dedicated claims inbox per carrier, M365/Exchange via Graph API.

---

## MVP Milestones

| Week | Milestone |
|------|-----------|
| 1–2 | Infrastructure & pipeline (Azure, OCR) |
| 3–4 | Document classification |
| 5–6 | Extraction engine |
| 7–8 | Claims Grid UI |
| 9–10 | Coverage analysis |
| 11–12 | Playbook & routing |
| 13–14 | Design Partner 1 pilot |
| 15–18 | Iterate + Partners 2–3 |
| 19–20 | Pilot readout |

---

## Excluded from MVP

| Excluded | When |
|----------|------|
| Photo/video damage assessment | V2 (Tractable partnership) |
| Full fraud detection | V2 |
| Multi-language | V3 |
| Workers' comp / specialty | V2 |
| Mobile app | V3 |
| Real-time collaboration | V2 |
| Custom model fine-tuning | V2 |
| Automated payouts | V3 |
| Word/Outlook add-ins | V2 |

---

## Design Partner Criteria

- P&C (auto + property)
- $1B–$10B GWP
- 10K–100K claims/year
- Guidewire or Duck Creek
- AI-ready organization
- VP Claims or CIO sponsor
- Operates in ≥5 states

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Extraction accuracy <90% on medical records | Medium | High | Medical records P1 not P0 |
| Guidewire integration delays | Medium | High | CSV/API fallback |
| Design partner churn | Low | High | 3 partners = redundancy |
| PHI data breach | Low | Critical | HIPAA BAA, encryption, pen testing |
| LLM costs exceed projections | Medium | Medium | Caching, batch API, model tiering |
| Complex playbook requirements | Medium | Medium | Start with defaults, iterate |
