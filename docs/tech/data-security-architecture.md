# Charterwell Data & Security Architecture

*Version 1.0 — March 21, 2026*

## Executive Summary

Insurance claims contain some of the most sensitive data in any industry: medical records (PHI), Social Security numbers, financial information, and detailed personal histories. Charterwell must be designed for enterprise-grade security from Day 1 — not retrofitted later. This document covers four pillars: data residency, SOC 2 Type II readiness, PHI/PII handling, and LLM data security.

---

## 1. Data Residency

### The Requirement

Insurance data often must stay in-region due to:
- **State insurance regulations** — some states require claims data to remain within US borders
- **Carrier security policies** — many carriers require data to stay in specific US regions
- **HIPAA** — while HIPAA doesn't mandate US-only storage, carriers' BAAs typically do
- **Future EU expansion** — GDPR will require EU data to stay in EU regions

### Architecture: Region-Aware Multi-Tenancy

```
┌─────────────────────────────────────────────────┐
│              CHARTERWELL CONTROL PLANE           │
│  (Tenant config, routing, metadata — US-based)   │
└──────────────┬────────────────┬──────────────────┘
               │                │
    ┌──────────▼──────┐  ┌─────▼──────────┐
    │  US-EAST DATA   │  │  US-WEST DATA  │
    │  PLANE          │  │  PLANE         │
    │                 │  │                │
    │  PostgreSQL     │  │  PostgreSQL    │
    │  Blob Storage   │  │  Blob Storage  │
    │  Service Bus    │  │  Service Bus   │
    └─────────────────┘  └────────────────┘
```

### Implementation

**MVP (Months 1-6): Single-Region**
- Deploy all data in **Azure East US 2** (Virginia) — most carriers accept this
- Tenant metadata includes a `dataRegion` field for future routing
- All Azure services deployed in the same region to avoid cross-region data transfer

**Post-MVP (Months 7-12): Multi-Region**
- Add **Azure West US 2** (Washington) as a second data plane
- Carrier onboarding selects data region at tenant creation (immutable after)
- Control plane remains centralized; data planes are region-isolated
- Azure Traffic Manager routes API requests to the correct regional data plane

**Year 2+: EU Expansion**
- Add **Azure West Europe** (Netherlands) for GDPR compliance
- EU data never leaves EU region
- Consider Azure Confidential Computing for highest-sensitivity carriers

### Key Design Decisions

1. **No cross-region data replication** — each carrier's data lives in exactly one region
2. **Region selection is immutable** — prevents accidental data migration that could violate agreements
3. **Document processing in-region** — OCR and LLM calls for a carrier's documents are routed to services in the same region (or via private endpoints)
4. **Backups stay in-region** — Azure geo-redundant storage configured to same-region only (LRS or ZRS, not GRS)

---

## 2. SOC 2 Type II Certification

### Timeline to Certification

| Phase | Timeline | Deliverable |
|-------|----------|-------------|
| **Readiness assessment** | Month 1 | Gap analysis, control selection, tool setup |
| **Control implementation** | Months 1-4 | Implement all required controls |
| **SOC 2 Type I audit** | Month 5-6 | Point-in-time assessment (interim deliverable for sales) |
| **Observation period** | Months 6-9 | 3-month minimum operating history with controls |
| **SOC 2 Type II audit** | Months 9-12 | Full audit covering observation period |
| **Report issued** | Month 12 | SOC 2 Type II report available for carrier procurement |

**Cost estimate:** $30K-50K first year (audit + compliance automation tool)

### Trust Service Criteria (TSC)

SOC 2 is organized around five Trust Service Criteria. Charterwell should target **Security** (mandatory), **Availability**, **Confidentiality**, and **Privacy** from the start.

### Controls to Build Into Architecture from Day 1

#### Security (CC — Common Criteria)

| Control Area | What to Build | Implementation |
|-------------|--------------|----------------|
| **Access control** | RBAC with least-privilege | Azure AD B2C + custom roles (admin, adjuster, viewer, API) per carrier |
| **MFA** | Required for all users | Azure AD B2C conditional access policies; MFA mandatory |
| **Network security** | Private networking | Azure Private Link for PostgreSQL, Blob, Service Bus; no public DB endpoints |
| **Encryption at rest** | AES-256 | Azure-managed keys (default); customer-managed keys via Key Vault for enterprise |
| **Encryption in transit** | TLS 1.3 | Enforced on all endpoints; HSTS headers; TLS 1.2 minimum |
| **Vulnerability management** | Regular scanning | Dependabot + GitHub Advanced Security; quarterly pen testing |
| **Incident response** | Documented plan | IR runbook: detect → contain → eradicate → recover → post-mortem |
| **Change management** | CI/CD controls | GitHub branch protection, required PR reviews, automated testing gates |
| **Logging & monitoring** | Centralized audit logs | Azure Monitor + Application Insights; log retention 1 year minimum |
| **Endpoint security** | Hardened containers | Minimal base images, no root, automated image scanning |

#### Availability (A)

| Control | Implementation |
|---------|----------------|
| **SLA definition** | 99.9% uptime target; Azure SLA pass-through |
| **Disaster recovery** | RPO: 1 hour, RTO: 4 hours; Azure zone-redundant deployments |
| **Backup** | Daily automated backups, 30-day retention, tested quarterly |
| **Capacity planning** | Azure Container Apps auto-scaling; PostgreSQL auto-grow |
| **Health monitoring** | `/api/health` endpoint; Azure availability alerts; PagerDuty integration |

#### Confidentiality (C)

| Control | Implementation |
|---------|----------------|
| **Data classification** | 4 levels: Public, Internal, Confidential, Restricted (PHI/PII) |
| **Tenant isolation** | Separate database schemas; row-level security; no cross-tenant queries |
| **Data retention** | Configurable per carrier; automated deletion on schedule |
| **Secure disposal** | Cryptographic erasure for deleted data; Azure secure delete |
| **NDA/confidentiality** | All employees and contractors sign NDAs |

#### Privacy (P)

| Control | Implementation |
|---------|----------------|
| **Privacy policy** | Published policy covering data collection, use, retention, deletion |
| **Data subject rights** | API for data export and deletion (carrier-initiated) |
| **Consent management** | Carrier consent captured at onboarding; documented in BAA |
| **Data minimization** | Extract only required fields; don't store raw LLM prompts long-term |

### Recommended Compliance Automation Tool

Use **Vanta** or **Drata** to automate evidence collection, control monitoring, and auditor collaboration. These tools integrate with Azure, GitHub, and common SaaS tools to continuously verify controls are operating. Cost: ~$10K-20K/year.

---

## 3. PHI/PII Handling

### What PHI/PII Charterwell Processes

| Data Type | HIPAA Category | Examples | Risk Level |
|-----------|---------------|----------|------------|
| **Medical records** | PHI | Diagnoses, treatment plans, medications, provider notes | Critical |
| **Medical bills** | PHI | Procedure codes, provider info, amounts | Critical |
| **Social Security Numbers** | PII | Claimant SSN | Critical |
| **Date of birth** | PII/PHI | Claimant DOB | High |
| **Contact information** | PII | Name, address, phone, email | High |
| **Financial data** | PII | Bank accounts, payment info | High |
| **Claims history** | PII | Prior claims, patterns | Medium |
| **Photos** | PII (possibly PHI) | Injury photos, property damage | Medium-High |

### HIPAA Compliance Architecture

#### Business Associate Agreements (BAAs)

Charterwell is a **Business Associate** under HIPAA when processing claims containing PHI (medical records, injury information). Required BAA chain:

```
Carrier (Covered Entity)
    ↓ BAA
Charterwell (Business Associate)
    ↓ BAA
Azure (Subprocessor — Microsoft BAA)
    ↓ BAA
Anthropic (Subprocessor — Enterprise API BAA)
```

**Action items:**
1. Engage healthcare compliance counsel to draft Charterwell's BAA template (Month 1)
2. Execute BAA with Microsoft Azure (standard, already available)
3. Execute BAA with Anthropic (requires Enterprise API plan with zero data retention)
4. Each carrier signs Charterwell's BAA at onboarding

#### 2026 HIPAA Security Rule Updates

HHS is finalizing major HIPAA Security Rule updates (expected May 2026). Key changes:
- **MFA required** (no longer "addressable") — already in our architecture
- **Encryption required** (no longer "addressable") — already in our architecture
- **72-hour incident notification** — build into IR process
- **Annual security risk assessments** — schedule from Month 1
- **Technology asset inventory** — maintain in compliance tool (Vanta/Drata)

#### Field-Level Encryption

Beyond Azure's disk-level encryption, implement **application-level field encryption** for highest-sensitivity data:

| Field | Encryption Approach |
|-------|---------------------|
| SSN | AES-256-GCM, separate key per carrier, stored in Azure Key Vault |
| DOB | AES-256-GCM, same carrier key |
| Medical diagnoses/codes | AES-256-GCM, same carrier key |
| Medical provider notes | AES-256-GCM, same carrier key |
| Bank account numbers | AES-256-GCM, same carrier key |

**Key management:**
- Azure Key Vault for key storage (FIPS 140-2 Level 2)
- Per-carrier encryption keys (carrier A cannot decrypt carrier B's data)
- Key rotation: annual, or on-demand if compromise suspected
- Customer-managed keys (CMK) available for enterprise carriers who want control

#### Access Controls

| Role | PHI Access | Scope |
|------|-----------|-------|
| **Adjuster** | Yes — own carrier's claims only | Read/write assigned claims |
| **Claims supervisor** | Yes — own carrier's claims only | Read all carrier claims, write assigned |
| **Carrier admin** | Yes — own carrier only | Full access within carrier tenant |
| **Charterwell support** | No — by default | PHI access requires break-glass procedure with audit log |
| **Charterwell engineering** | No | Access to anonymized/synthetic data only in dev/staging |

**Break-glass procedure** for support access to PHI:
1. Support ticket created with justification
2. Approved by Charterwell security officer
3. Time-limited access granted (max 4 hours)
4. All actions logged to immutable audit trail
5. Carrier notified of access within 24 hours

#### Audit Logging

Every access to PHI/PII must be logged:

```json
{
  "timestamp": "2026-03-21T18:30:00Z",
  "actor": "adjuster@carrier.com",
  "action": "view_medical_record",
  "resource": "claim/CLM-2024-001234/documents/medical-record-001",
  "carrier": "carrier-tenant-id",
  "ip": "203.0.113.42",
  "result": "success",
  "fields_accessed": ["diagnosis", "treatment_plan", "provider_notes"]
}
```

- Logs stored in Azure Monitor (immutable, 1-year retention minimum)
- Logs are NOT accessible to the application — write-only from app, read-only via Azure portal
- Carrier can request audit log export for regulatory examination

---

## 4. Model Security — Preventing Data Leakage to LLMs

### The Risk

When Charterwell sends claims documents (including PHI) to an LLM for extraction or analysis, we must ensure:
1. The LLM provider does NOT train on our data
2. Data is NOT retained beyond the API call
3. Data is NOT accessible to other customers
4. We can demonstrate this to carriers and regulators

### Mitigation Strategy: Defense in Depth

#### Layer 1: Contractual Guarantees

| Provider | Guarantee | Mechanism |
|----------|-----------|-----------|
| **Anthropic (Claude API)** | No training on API data | Commercial ToS explicitly prohibits training on API inputs/outputs |
| **Anthropic (Enterprise)** | Zero data retention | Enterprise agreement with ZDR — inputs/outputs not stored |
| **Anthropic (Healthcare)** | HIPAA BAA available | Enterprise API plan with BAA covers PHI processing |
| **Azure (if using Azure OpenAI)** | No training, data stays in tenant | Azure OpenAI Service runs in customer's Azure tenant |

**Recommendation:** Use Anthropic Claude Enterprise API with:
- Zero Data Retention (ZDR) agreement
- HIPAA Business Associate Agreement
- This ensures PHI sent to Claude for extraction is processed but never stored or used for training

#### Layer 2: Data Minimization

Don't send more data to the LLM than necessary:

| Technique | Description |
|-----------|-------------|
| **Field-level prompting** | Send only the specific document section relevant to the extraction task, not the entire claim file |
| **PII masking (selective)** | For tasks that don't need PII (e.g., document classification), mask SSN, DOB before sending to LLM |
| **Structured extraction** | Use OCR first to extract text, then send text (not images) to LLM — reduces data sent |
| **Prompt templates** | Pre-built templates that request only specific fields — no open-ended "summarize everything" |

**When NOT to mask:** Coverage analysis and claim adjudication require full context (names, dates, amounts, policy terms). Masking would degrade quality. For these tasks, rely on contractual guarantees (Layer 1) and encryption in transit (Layer 3).

#### Layer 3: Encryption in Transit

- All LLM API calls over TLS 1.3
- API keys stored in Azure Key Vault, rotated quarterly
- Network traffic to Anthropic API via Azure Private Link (if available) or VPN

#### Layer 4: Audit Trail

- Log every LLM call: timestamp, model used, token count, carrier ID, claim ID (NOT the prompt content itself — that would create a PHI storage problem)
- Track which documents were sent to which model for which purpose
- Carrier can audit: "Show me every LLM call made for claim CLM-2024-001234"

#### Layer 5: Alternative Deployment Models (Future)

For carriers with the strictest data requirements:

| Option | Availability | Pros | Cons |
|--------|-------------|------|------|
| **Azure OpenAI** | Now | Data stays in carrier's Azure tenant | GPT models, not Claude |
| **Claude on Azure (Anthropic)** | Available | Claude in Azure region | Requires Enterprise agreement |
| **Claude on AWS Bedrock** | Available | Claude with AWS BAA | AWS, not Azure |
| **Self-hosted open-source** | Now | Full data control | Lower quality, higher ops cost |

**MVP recommendation:** Anthropic Claude Enterprise API with ZDR + BAA. Revisit Azure-hosted Claude or Bedrock if a carrier requires data to never leave their cloud account.

---

## 5. Security Development Lifecycle

### Secure Coding Practices

| Practice | Tool/Process |
|----------|-------------|
| **Dependency scanning** | Dependabot (GitHub) — automated PRs for vulnerable dependencies |
| **SAST** | GitHub Advanced Security / CodeQL — static analysis on every PR |
| **Secret scanning** | GitHub secret scanning — block commits containing API keys |
| **Container scanning** | Azure Defender for Containers — scan images for vulnerabilities |
| **Penetration testing** | Quarterly external pen test (engage firm Month 4) |
| **Security training** | Annual security awareness training for all team members |

### Environment Separation

| Environment | Data | PHI Access | Purpose |
|-------------|------|-----------|----------|
| **Development** | Synthetic/anonymized only | Never | Feature development |
| **Staging** | Synthetic + sanitized carrier samples | Never | Integration testing |
| **Production** | Real carrier data | Yes (controlled) | Live service |

**Critical rule:** Real PHI/PII NEVER exists outside production. Development and staging use synthetic data generators that produce realistic but fake claims documents.

---

## 6. Compliance Roadmap

| Month | Milestone |
|-------|-----------|
| 1 | Engage compliance counsel; draft BAA template; select compliance automation tool (Vanta/Drata) |
| 2 | Implement foundational controls: MFA, encryption, RBAC, logging, network isolation |
| 3 | Execute BAAs with Anthropic (Enterprise + ZDR + HIPAA) and Azure |
| 4 | First penetration test; remediate findings |
| 5 | HIPAA risk assessment (documented) |
| 6 | SOC 2 Type I audit (interim credential for sales) |
| 7 | Begin SOC 2 Type II observation period |
| 8 | Second penetration test |
| 9 | SOC 2 Type II observation continues; control evidence collection |
| 10 | SOC 2 Type II audit begins |
| 11 | Audit fieldwork |
| 12 | SOC 2 Type II report issued |

### Estimated Compliance Costs (Year 1)

| Item | Cost |
|------|------|
| Compliance automation (Vanta/Drata) | $10K-20K |
| SOC 2 audit (Type I + Type II) | $30K-50K |
| Penetration testing (2x) | $15K-25K |
| Legal counsel (BAAs, privacy policy) | $15K-25K |
| Security training | $2K-5K |
| **Total** | **$72K-125K** |

This is table-stakes spend for enterprise insurance SaaS. SOC 2 Type II closes deals 35% faster.
