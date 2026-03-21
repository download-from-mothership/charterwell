# Charterwell Integration Architecture

*Version 1.0 — March 21, 2026*

## Overview

Charterwell does not replace the carrier's core systems — it sits alongside them as the **document intelligence layer**. This means integration is not optional; it is the product. Every carrier integration follows the same pattern: ingest documents and claim metadata from the carrier's systems, process them through Charterwell's AI pipeline, and push structured results back.

---

## 1. Policy Administration / Claims Management Systems

### Guidewire ClaimCenter (P0 — Design Partners 1 & 2)

**API:** Guidewire Cloud API — RESTful, Swagger 2.0 spec. Publicly documented at `docs.guidewire.com/cloud/cc/`. Available on Guidewire Cloud (Olos release, 2025+). On-prem versions use older SOAP/Gosu APIs.

**Integration Points:**

| Integration | API Endpoint | Direction | Data Flow |
|------------|-------------|-----------|----------|
| **FNOL notification** | Webhook / Cloud API events | GW → Charterwell | New claim created → trigger document ingestion |
| **Claim data pull** | `GET /rest/claim/v1/claims/{id}` | GW → Charterwell | Policy number, claimant info, loss details, coverage |
| **Document download** | `GET /rest/claim/v1/claims/{id}/documents` | GW → Charterwell | Attached documents (PDFs, images) |
| **Extraction results push** | `POST /rest/claim/v1/claims/{id}/notes` | Charterwell → GW | Structured extraction as claim note/activity |
| **Coverage analysis push** | `POST /rest/claim/v1/claims/{id}/activities` | Charterwell → GW | Coverage recommendations as activities |
| **Reserve suggestion** | `PATCH /rest/claim/v1/claims/{id}/financials` | Charterwell → GW | AI-suggested reserve (adjuster must approve) |
| **Routing/assignment** | `PATCH /rest/claim/v1/claims/{id}` | Charterwell → GW | Assign to adjuster queue based on triage |

**Authentication:** OAuth 2.0 client credentials flow. Guidewire Cloud API uses service accounts with scoped permissions.

**Data we need from Guidewire:**

- Claim header (number, dates, parties, LOB)
- Policy summary (coverage types, limits, deductibles, endorsements)
- Attached documents
- Claim history (prior claims on same policy)
- Adjuster assignment data (for routing)

**Data we push back:**

- Document classification results
- Extracted structured data (fields + confidence scores)
- Coverage analysis (applicable provisions, exclusions, citations)
- Triage score and routing recommendation
- Reserve estimate (advisory)
- Fraud screening flags

**Implementation approach:**

1. Use Guidewire Integration Framework webhook events for real-time FNOL notification
2. Pull full claim + documents via Cloud API on notification
3. Process through Charterwell pipeline
4. Push results back as activities/notes with structured metadata
5. Optionally update claim fields (reserve, assignment) with adjuster approval

### Duck Creek Claims (P1 — Design Partner 3)

**API:** Duck Creek Anywhere Integration — REST/GraphQL, API-first, event-driven architecture. Pre-built Anywhere Managed Integrations (AMIs) available for common vendors.

**Integration Points:**

Similar pattern to Guidewire:

- Event-driven notifications for new claims
- REST API for claim data retrieval and updates
- Document attachment API for ingestion
- Activity/note API for pushing results

**Key difference:** Duck Creek's "90-day guaranteed implementation" positioning means they expect integrations to be fast. Charterwell should aim for a pre-built Duck Creek connector that can be configured, not custom-built, per carrier.

**Implementation:** Month 10-12. Build Duck Creek connector after Guidewire integration is proven with Partners 1-2.

### Majesco (P2 — Future)

**API:** REST-based APIs for policy and claims. Growing AI roadmap. Integration approach similar to Guidewire/Duck Creek.

**Implementation:** Year 2. Evaluate when Majesco carrier enters pipeline.

### Socotra (P2 — Future)

**API:** Modern, API-first core platform. REST APIs, webhooks, full documentation. Targeted at InsurTech and digital-first carriers.

**Implementation:** Year 2. Natural fit for digital-native carriers.

---

## 2. Claims Workflow: Where Charterwell Inserts Itself

### Current Adjuster Workflow (Without Charterwell)

```
1. FNOL received (phone/email/portal)
2. Adjuster opens CMS (Guidewire/Duck Creek)
3. Adjuster manually reviews each document:
   - Opens PDF/image
   - Reads and identifies document type
   - Manually copies key data into claim fields
   - Cross-references policy for coverage
   - Checks for exclusions
   - Alt-tabs between 8-12 tools
4. Adjuster sets initial reserve (often guesswork on Day 1)
5. Adjuster routes or handles claim
6. Repeat for 30-50 claims/day

Time per claim: 15-60 minutes (FNOL review only)
```

### With Charterwell (Target Workflow)

```
1. FNOL received → Charterwell auto-ingests documents
2. Charterwell classifies, extracts, and analyzes (seconds)
3. Adjuster opens Claims Grid in Charterwell (or CMS with embedded results):
   - Sees structured claim summary
   - Reviews extraction (side-by-side with source docs)
   - Reviews coverage analysis with policy citations
   - Reviews AI-suggested reserve
   - Sees missing documents checklist
   - Sees fraud screening flags (if any)
4. Adjuster confirms/adjusts extraction, sets reserve, takes action
5. Results sync back to CMS

Time per claim: 2-5 minutes
```

### Insertion Points

| Workflow Step | Charterwell Role | Integration |
|--------------|-----------------|-------------|
| FNOL received | Auto-ingest and classify documents | Webhook from CMS or email inbox |
| Document review | Replace manual review with AI extraction | Claims Grid UI or embedded widget |
| Coverage check | Replace manual policy lookup with AI analysis | Coverage Analysis Engine → CMS note |
| Reserve setting | Suggest initial reserve | Advisory push to CMS financials |
| Routing | Auto-triage and assign to correct queue | Update CMS assignment field |
| Fraud screening | Flag suspicious claims | SIU referral note in CMS |
| Compliance | Auto-check regulatory requirements | Compliance checklist in Claims Grid |

### UI Options (MVP)

**Option A: Standalone Claims Grid (MVP default)**

- Full-page web application at `app.charterwell.ai`
- Adjusters open Charterwell alongside their CMS
- Data syncs via API
- Fastest to build, no CMS customization required

**Option B: Embedded Widget (Post-MVP)**

- iframe or web component embedded in Guidewire/Duck Creek UI
- Adjuster never leaves their CMS
- Requires CMS configuration and carrier IT involvement
- Higher adoption but slower to deploy

---

## 3. Communication Channels

### Email (P0)

**Implementation:** Microsoft Graph API for M365/Exchange

| Feature | Approach |
|---------|----------|
| Dedicated inbox | `claims-intake@[carrier].charterwell.ai` or shared mailbox in carrier's M365 |
| MIME parsing | Extract attachments (PDF, TIFF, JPG, PNG), inline images, email body text |
| Thread tracking | Track email threads by subject line / reference headers → associate with existing claim |
| Auto-response | Acknowledge receipt with claim reference number |
| Attachment handling | Extract, classify, and process each attachment as a claim document |

**Architecture:**

```
[Carrier Email / M365]
    │
    ▼ (Graph API webhook or polling)
[Charterwell Email Ingestion Service]
    ├── Parse MIME structure
    ├── Extract attachments
    ├── Match to existing claim (or create new)
    └── Feed into Document Processing Pipeline
```

### Portal Upload (P0)

**Implementation:** Charterwell web UI with drag-and-drop upload

- Multi-file upload (batch)
- Auto-classification on upload
- Progress indicator with per-document status
- Associate uploaded documents with existing claim or create new

### FNOL Phone Transcripts (P1)

**Implementation:** Integration with carrier's phone system or third-party speech-to-text

| Approach | Pros | Cons |
|----------|------|------|
| **Azure AI Speech** | Same cloud, HIPAA-eligible | Requires audio feed from carrier phone system |
| **Carrier-provided transcripts** | No audio handling needed | Transcript quality varies |
| **Third-party (e.g., Dialpad, Observe.AI)** | Pre-built insurance integrations | Additional vendor |

**MVP recommendation:** Accept carrier-provided transcripts (text files or JSON) via API upload. Do not build speech-to-text in V1. ~80% of FNOL is still phone-based, but carriers often already transcribe calls.

### Fax/Scan (P1)

- Accept TIFF and PDF from carrier's existing fax-to-email workflow
- Many carriers use RightFax, eFax, or similar — these convert fax to email attachment
- Charterwell treats fax-originated documents the same as email attachments

---

## 4. Compliance & Reporting

### NAIC Data Standards

**ACORD XML** is the industry standard for insurance data interchange. Key standards:

| Standard | Use Case | Charterwell Relevance |
|----------|----------|----------------------|
| **ACORD XML (P&C)** | Claims data exchange between systems | Export extracted claim data in ACORD XML format |
| **ACORD AL3** | Legacy flat-file format | Support for carriers still on AL3 (declining) |
| **XBRL** | Financial/regulatory reporting | Not directly relevant — carrier handles regulatory filings |

**Charterwell's role:** Export extracted claim data in ACORD XML format so it can be imported into any ACORD-compliant system. This makes Charterwell interoperable with the broader insurance ecosystem beyond Guidewire/Duck Creek.

### State DOI Filing

**2026 Updates:**

- 24+ states have adopted the NAIC Model AI Bulletin — carriers must document how AI is used in claims decisions
- Fire loss reporting: claims closing after Jan 1, 2026 must be reported to state DOI within 90 days
- AI governance documentation required for market conduct examinations

**Charterwell's compliance module:**

| Feature | Implementation |
|---------|---------------|
| **State-specific checklists** | Configurable per state: required notices, response deadlines, documentation |
| **Filing deadline tracking** | Alert when a claim approaches a state filing deadline |
| **AI decision audit trail** | Exportable report showing every AI action on a claim (for DOI examination) |
| **NAIC AI Bulletin compliance** | Pre-built documentation template for carriers' AI governance programs |

### Fraud / SIU Integration

| Integration Point | Description |
|-------------------|-------------|
| **SIU referral** | When fraud screening flags a claim, auto-generate SIU referral with: claim summary, flag details, supporting documents |
| **NICB (National Insurance Crime Bureau)** | Future: submit ISO ClaimSearch queries for cross-carrier fraud screening |
| **Shift Technology** | Future: bidirectional integration — Charterwell provides document intelligence, Shift provides fraud scoring |

**MVP:** Internal fraud flag → SIU referral note in CMS. No external fraud database integration in V1.

---

## 5. Integration Architecture Patterns

### Event-Driven Architecture

```
[CMS (Guidewire/Duck Creek)]
    │
    ▼ Webhook (FNOL created, document attached)
[Azure Service Bus Topic]
    │
    ├──▶ [Document Ingestion Service] → Blob Storage
    ├──▶ [Classification Service] → Haiku
    ├──▶ [Extraction Service] → Azure Doc Intelligence + Sonnet
    ├──▶ [Coverage Analysis Service] → Sonnet/Opus
    └──▶ [Results Sync Service] → Push back to CMS
```

### API Design Principles

1. **REST-first** — JSON over HTTPS, standard HTTP verbs
2. **Versioned** — `/api/v1/` prefix, no breaking changes within version
3. **Idempotent** — all operations can be safely retried
4. **Webhook-based notifications** — real-time push to carrier systems when processing completes
5. **Batch support** — bulk document upload and processing for historical claims
6. **Rate limiting** — per-carrier rate limits to prevent noisy-neighbor issues

### Authentication

| Consumer | Auth Method |
|----------|------------|
| Carrier CMS (Guidewire/Duck Creek) | OAuth 2.0 client credentials |
| Carrier users (web UI) | Azure AD B2C SSO |
| Charterwell internal services | mTLS + service mesh |
| API consumers (third-party) | API key + OAuth 2.0 (future) |

---

## 6. Integration Roadmap

| Phase | Timeline | Integrations |
|-------|----------|-------------|
| **MVP** | Months 1-6 | Guidewire ClaimCenter Cloud API, Email (M365 Graph API), Portal upload, API submission |
| **Expansion** | Months 7-12 | Duck Creek Claims, Fax/scan ingestion, ACORD XML export, SIU referral |
| **Platform** | Months 13-18 | Majesco, Socotra, FNOL phone transcripts, NICB/ISO ClaimSearch, Shift Technology bidirectional, public REST API for third-party integrations |

---

## 7. Data Flow Summary

### Inbound (to Charterwell)

| Source | Data | Method |
|--------|------|--------|
| CMS (Guidewire/Duck Creek) | Claim metadata, policy data, documents | REST API + webhooks |
| Email (M365) | Email + attachments | Graph API |
| Portal | Uploaded documents | Web UI |
| API | Documents + metadata | REST API |
| Phone transcripts | FNOL text transcripts | API upload |

### Outbound (from Charterwell)

| Destination | Data | Method |
|-------------|------|--------|
| CMS (Guidewire/Duck Creek) | Extraction results, coverage analysis, triage, reserve, fraud flags | REST API |
| Adjuster | Claims Grid UI | Web application |
| Compliance/reporting | Audit trails, AI decision logs, ACORD XML | Export API |
| SIU | Fraud referral reports | CMS note + email |
