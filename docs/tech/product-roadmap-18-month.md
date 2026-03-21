# Charterwell 18-Month Product Roadmap

*Version 1.0 — March 21, 2026*

---

## Roadmap Overview

```
M1-3: Foundation          M4-6: Scale           M7-9: Enterprise        M10-12: Expand         M13-18: Platform
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ OCR + Extraction │  │ Multi-Agent     │  │ Playbook System │  │ Word/Outlook    │  │ API Platform    │
│ Claims Grid UI   │  │ Coverage Engine │  │ Analytics       │  │ Fraud Module    │  │ Adv. Analytics  │
│ 3 Design Partners│  │ Guidewire Integ │  │ SOC 2 Type I    │  │ Duck Creek Integ│  │ Underwriting    │
│ Email Intake     │  │ Auto-Triage     │  │ Multi-Region    │  │ SOC 2 Type II   │  │ 30-50 Carriers  │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘
  $0 ARR              $0.5-1M ARR           $2-5M ARR             $5-10M ARR            $10-25M ARR
  3 partners          3-5 carriers          10-15 carriers        15-25 carriers        30-50 carriers
```

---

## Phase 1: Foundation (Months 1-3)

*Goal: Prove the core thesis with 3 design partners on live claims.*

### Product Deliverables

| Deliverable | Details | Week |
|-------------|---------|------|
| **Azure infrastructure** | Container Apps, PostgreSQL + pgvector, Blob Storage, Service Bus, AD B2C | 1-2 |
| **Document ingestion pipeline** | Email (M365 Graph API), portal upload, REST API intake | 1-3 |
| **OCR integration** | Azure AI Document Intelligence — text, tables, checkboxes, handwriting | 2-4 |
| **Document classification** | Claude Haiku classifier for 8 document types (FNOL, ACORD, police, medical, invoices, photos, correspondence, dec pages) | 3-5 |
| **Data extraction engine** | Claude Sonnet extraction with per-document-type prompt templates. Schema-constrained JSON output with confidence scores. | 4-8 |
| **Cross-document validation** | Policy number, date, amount, and party consistency checks across all docs in a claim | 7-8 |
| **Claims Grid UI** | Next.js dashboard — claim list, claim detail with extraction review (side-by-side source + extracted fields) | 6-10 |
| **Basic triage** | Severity scoring (1-5), complexity flag, priority assignment | 9-10 |
| **Duplicate detection** | Fuzzy matching on claimant + date of loss + policy number | 10-11 |
| **Design Partner 1 pilot** | Live claims processing, daily accuracy review, adjuster feedback loop | 11-12 |

### Document Types Supported (Top 10)

| # | Document Type | Extraction Fields | Accuracy Target |
|---|--------------|-------------------|----------------|
| 1 | ACORD 25 (Liability COI) | Insured, limits, effective dates, carrier | 97% |
| 2 | ACORD 28 (Property COI) | Property details, coverage amounts, deductibles | 97% |
| 3 | FNOL (structured forms) | Claimant, policy, loss date, loss description | 95% |
| 4 | FNOL (free-text) | Same fields via NLP extraction | 90% |
| 5 | Police reports | Incident details, parties, officer info | 88% |
| 6 | Repair estimates | Line items, amounts, contractor info | 93% |
| 7 | Medical bills | Procedure codes, amounts, provider, dates | 90% |
| 8 | Policy declarations | Coverage types, limits, deductibles, endorsements | 95% |
| 9 | Invoices | Vendor, line items, amounts, dates | 93% |
| 10 | Adjuster notes/correspondence | Key facts, action items, dates mentioned | 85% |

### Engineering

- Hire: 1 senior backend engineer, 1 frontend engineer
- Stack: Azure Container Apps, PostgreSQL, Next.js, TypeScript
- CI/CD: GitHub Actions to Azure deployment
- Compliance tool setup (Vanta/Drata)

### Milestones

- **Week 6:** Internal demo — end-to-end: upload document, see extraction in Claims Grid
- **Week 10:** Design Partner 1 onboarding begins
- **Week 12:** Design Partner 1 live on real claims

### Revenue: $0 (design partner pilots are free)

---

## Phase 2: Scale (Months 4-6)

*Goal: Production-grade multi-agent pipeline. First paid carrier. Guidewire integration live.*

### Product Deliverables

| Deliverable | Details |
|-------------|---------|
| **Multi-agent claims pipeline** | Orchestrator, Intake Agent, Extraction Agent, Adjudication Agent, Compliance Agent. Custom state machine. Each agent independently deployable/testable. |
| **Coverage Analysis Engine** | Policy ingestion (parse dec pages, endorsements, exclusions), coverage matching (peril to provisions), exclusion screening with policy citations, citation-backed output. Claude Sonnet for analysis, Opus for complex claims. |
| **Reserve estimation** | Rule-based for simple claims, AI-assisted for standard/complex. Advisory only — adjuster sets final reserve. |
| **Guidewire ClaimCenter integration** | Bidirectional REST API: ingest FNOL + documents, push back extraction + coverage analysis + triage. OAuth 2.0 auth. |
| **Auto-triage and routing** | Configurable routing rules: claim profile to adjuster queue. Default rules with carrier override. |
| **Design Partners 2 & 3 onboard** | Live claims for all 3 partners |
| **Medical records extraction** | Multi-page medical record handling: diagnosis, treatment, medications, provider notes. PHI handling per HIPAA. |

### Engineering

- Hire: 1 ML/AI engineer (prompt engineering, accuracy optimization)
- Performance optimization: prompt caching (90% cost savings), batch API for non-real-time
- Monitoring: accuracy dashboards per document type per carrier

### Milestones

- **Month 4:** Multi-agent pipeline live internally
- **Month 5:** Guidewire integration live with Design Partner 1
- **Month 6:** All 3 design partners running full pipeline; pilot readout; first paid contracts

### Revenue: $0.5-1M ARR (3 carriers converting from pilot to paid)

---

## Phase 3: Enterprise (Months 7-9)

*Goal: Productize for enterprise sales. SOC 2 Type I. Playbook system creates carrier lock-in.*

### Product Deliverables

| Deliverable | Details |
|-------------|---------|
| **Playbook system** | YAML/JSON carrier-configurable rules: routing thresholds, reserve guidelines, compliance checklists, coverage interpretation notes, escalation triggers. Admin UI for carrier ops team. Version-controlled with audit trail. |
| **Analytics dashboard** | Claims processing metrics: volume, cycle time, extraction accuracy, reserve accuracy, triage accuracy. Per-carrier and cross-carrier views (Charterwell internal). |
| **Elasticsearch integration** | Migrate from PostgreSQL FTS to Elasticsearch for policy document search. Hybrid search (keyword + semantic) for coverage analysis. |
| **Multi-region deployment** | Add Azure West US 2 data plane. Per-carrier region selection (immutable). Cross-region routing via Azure Traffic Manager. |
| **ACORD XML export** | Export extracted claim data in ACORD XML format for ecosystem interoperability. |
| **Compliance module** | State-specific checklists, filing deadline tracking, AI decision audit trail export for DOI examinations. |
| **SOC 2 Type I audit** | Point-in-time assessment. Interim credential for enterprise sales. |

### Sales & GTM

- First 5-10 carriers beyond design partners
- Sales team: 1 enterprise AE, 1 SE
- Pricing: $5-15/claim (volume-based tiers)
- Conference presence: ITC Vegas prep (Sep 29-Oct 1)

### Milestones

- **Month 7:** Playbook system live with first carrier customization
- **Month 8:** SOC 2 Type I report issued
- **Month 9:** 10-15 carriers in pipeline; analytics dashboard live

### Revenue: $2-5M ARR

---

## Phase 4: Expand (Months 10-12)

*Goal: Meet adjusters in their tools. Fraud screening. Second CMS integration. SOC 2 Type II.*

### Product Deliverables

| Deliverable | Details |
|-------------|---------|
| **Word add-in** | Charterwell sidebar in Microsoft Word: view extraction results, coverage analysis, and claim summary while reviewing documents in Word. Office Add-in framework (React). |
| **Outlook add-in** | Process claim emails directly from Outlook: classify attachments, extract data, create/update claims without leaving email. |
| **Fraud screening module** | Expanded beyond basic red flags: cross-carrier pattern matching (anonymized), timeline anomaly detection, statement inconsistency scoring. SIU dashboard with referral workflow. |
| **Duck Creek Claims integration** | REST/GraphQL via Anywhere Integration. Same bidirectional pattern as Guidewire. |
| **FNOL phone transcript ingestion** | Accept carrier-provided call transcripts. NLP extraction of claim details from conversational text. |
| **SOC 2 Type II audit** | Full audit covering 3-month observation period. Report issued for enterprise procurement. |
| **Fax/scan support** | TIFF/PDF ingestion from fax-to-email workflows. |

### Engineering

- Hire: 1 frontend engineer (Word/Outlook add-ins), 1 infrastructure engineer
- Penetration test #2
- Performance: sub-30-second end-to-end processing for simple claims

### Milestones

- **Month 10:** Word add-in beta with 2 carriers
- **Month 11:** Duck Creek integration live
- **Month 12:** SOC 2 Type II report issued; 15-25 carriers

### Revenue: $5-10M ARR

---

## Phase 5: Platform (Months 13-18)

*Goal: Become the platform. API for third parties. Underwriting expansion. 30-50 carriers.*

### Product Deliverables

| Deliverable | Details |
|-------------|---------|
| **Public REST API** | Documented API for third-party integrations. API keys, rate limiting, usage metering, developer portal. |
| **Zapier/Make webhooks** | Low-code integration for carriers without engineering teams. |
| **Advanced analytics** | Claims trending (category, severity, geography over time), severity prediction (AI-estimated final payout at FNOL), reserve adequacy monitoring, adjuster performance benchmarking. |
| **Underwriting document processing** | Adapt extraction pipeline for underwriting submissions: applications, loss runs, financial statements, inspection reports. Same architecture, new document types and prompt templates. |
| **Majesco / Socotra integrations** | Expand CMS coverage for digital-native carriers. |
| **NICB / ISO ClaimSearch** | Cross-carrier fraud screening via industry databases. |
| **Shift Technology integration** | Bidirectional: Charterwell provides document intelligence, Shift provides fraud scoring. |
| **Batch processing** | Historical claims migration: process carrier's backlog of existing claims to populate Charterwell with structured data. |
| **Custom model fine-tuning** | Fine-tune extraction models on carrier-specific document formats for highest accuracy. |

### Engineering

- Team: 8-12 engineers total
- Evaluate dedicated vector DB if >100M vectors
- Multi-region EU expansion (Azure West Europe) if international carriers enter pipeline
- ISO 27001 certification preparation

### Sales & GTM

- 3-5 enterprise AEs, 2-3 SEs
- Partner channel: Guidewire Marketplace listing, Duck Creek Content Exchange
- ITC Vegas 2026 (booth + speaking slot)
- First analyst briefings (Celent, Novarica)

### Milestones

- **Month 13:** Public API beta with 3 integration partners
- **Month 15:** Underwriting document processing beta
- **Month 18:** 30-50 carriers; $10-25M ARR run rate

### Revenue: $10-25M ARR

---

## Headcount Plan

| Month | Engineering | Product | Sales | Total |
|-------|------------|---------|-------|-------|
| 1 | 2 (founders) | 0 | 0 | 2 |
| 3 | 4 (+2 eng) | 1 (+1 PM) | 0 | 5 |
| 6 | 5 (+1 ML) | 1 | 1 (+1 AE) | 7 |
| 9 | 6 (+1 eng) | 1 | 2 (+1 SE) | 9 |
| 12 | 8 (+2 eng) | 2 (+1 PM) | 3 (+1 AE) | 13 |
| 18 | 12 (+4 eng) | 2 | 5 (+2 AE) | 19 |

---

## Key Metrics by Phase

| Metric | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 |
|--------|---------|---------|---------|---------|----------|
| **Carriers** | 3 pilots | 3 paid | 10-15 | 15-25 | 30-50 |
| **ARR** | $0 | $0.5-1M | $2-5M | $5-10M | $10-25M |
| **Claims/month** | 5K | 30K | 100K | 250K | 500K+ |
| **Doc types** | 10 | 15 | 20 | 25 | 30+ |
| **Extraction accuracy** | 90%+ | 93%+ | 95%+ | 96%+ | 97%+ |
| **CMS integrations** | 0 | 1 (GW) | 1 (GW) | 2 (GW+DC) | 4+ |
| **Compliance** | — | BAAs | SOC 2 I | SOC 2 II | ISO 27001 |
| **Team size** | 2 | 7 | 9 | 13 | 19 |

---

## Dependencies & Risks

| Risk | Phase | Impact | Mitigation |
|------|-------|--------|------------|
| Design partner conversion to paid | 2 | High | Multiple partners; define success metrics upfront |
| Guidewire integration complexity | 2 | High | Start early; CSV fallback; engage GW partner team |
| SOC 2 delays audit | 3-4 | Medium | Start compliance Day 1; use automation tool |
| LLM accuracy plateau | 3+ | Medium | Prompt optimization, custom models, human-in-loop |
| Competitor (FurtherAI) ships faster | 2-3 | High | Go deep on documents vs. their breadth; speed to market |
| Enterprise sales cycles >9 months | 3+ | Medium | Land with pilot, expand; parallel sales pipeline |
| Hiring in competitive AI market | 1+ | Medium | Remote-first; competitive equity; insurance domain attracts mission-driven talent |
