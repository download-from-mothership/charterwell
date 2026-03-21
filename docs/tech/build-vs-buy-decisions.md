# Charterwell Build vs. Buy Decisions

*Version 1.0 — March 21, 2026*

## Executive Summary

For each major component, we recommend **buy** (use managed services) wherever the component is not a source of competitive differentiation, and **build** only where insurance-specific domain logic is our moat. The general principle: **buy the infrastructure, build the intelligence.**

**Build vs. Buy Ratio: ~30% build / 70% buy.** We build only what differentiates us (agent orchestration, playbooks, coverage analysis, Claims Grid UI). Everything else is a managed service on Azure.

---

## Decision Matrix

| Component | Decision | Choice | Rationale |
|-----------|----------|--------|-----------|
| OCR/Document Processing | **Buy** | Azure AI Document Intelligence | Best accuracy, custom training, HIPAA, carrier alignment |
| Vector Database | **Buy** | pgvector (in PostgreSQL) | Operational simplicity, sufficient scale, $0 incremental cost |
| Search | **Buy (phased)** | PostgreSQL FTS → Elasticsearch | Start simple, add Elasticsearch post-pilot |
| Auth/Identity | **Buy** | Azure AD B2C | Carrier SSO, HIPAA BAA, cheapest at scale |
| Cloud Infrastructure | **Buy** | Azure | 68% carrier alignment, unified compliance, Document Intelligence |
| LLM | **Buy** | Anthropic Claude (multi-model) | Best extraction quality, strong safety profile |
| Email Processing | **Buy** | Microsoft Graph API | Native M365 integration |
| Agent Orchestration | **Build** | Custom state machine | Core product logic, premature to use frameworks |
| Playbook/Rules Engine | **Build** | Custom | Core moat, carrier-specific differentiation |
| Frontend (Claims Grid) | **Build** | Next.js / React | Core UX differentiator |
| Coverage Analysis | **Build** | Custom (LLM-powered) | Core product intelligence |

---

## 1. OCR / Document Processing

### Options Evaluated

| Platform | Accuracy (complex layouts) | Custom Training | On-Prem Option | Pricing (per page) | Insurance Fit |
|----------|--------------------------|-----------------|----------------|--------------------|--------------:|
| **Azure AI Document Intelligence** | Best (99%+ on structured) | Yes — custom models | Yes (containers) | $0.01–0.05 | **Best** — HIPAA BAA, carriers are MSFT shops |
| Google Document AI | Strong (close to Azure) | Yes | No | $0.01–0.05 | Good for cost, but GCP is rare in insurance |
| AWS Textract | Strong on tables/KV | No custom training | No | $0.01–0.015 | Good if on AWS; less flexible |
| ABBYY Vantage | Best on handwriting | Yes | Yes | $0.05–0.10 | Good for legacy archives; expensive |
| Custom (open-source OCR) | Variable | Full control | Yes | Infra cost only | Not viable for MVP timeline |

### Recommendation: Buy — Azure AI Document Intelligence

1. **Best accuracy** on complex layouts, tables, and mixed content — critical for ACORD forms and multi-page documents.
2. **Custom model training** for insurance-specific forms (ACORD 25, 27, 28, 125, etc.) — Azure's custom document models let us train extractors for specific form types.
3. **On-premise containers** available — some carriers with strict data residency requirements can run Document Intelligence in their own Azure tenant.
4. **HIPAA Business Associate Agreement** available — required for processing medical records (PHI).
5. **Carrier alignment** — 68% of insurance companies are on Azure/Microsoft. Using Azure OCR removes a procurement objection.
6. **Proven at scale** — Hyperscience (99.5% accuracy) and multiple insurers already use Azure Document Intelligence in production.

**LLM fallback:** For documents where OCR alone isn't sufficient (ambiguous handwriting, complex multi-column layouts), pipe the OCR output through Claude Sonnet for contextual extraction. This hybrid approach (OCR for structure + LLM for understanding) exceeds either alone.

**Cost:** ~$0.05–0.10 per claim (average 10-15 pages × $0.01/page)

---

## 2. Vector Database

### Options Evaluated

| Database | Scale Limit | Managed Option | Hybrid Search | Pricing | Operational Complexity |
|----------|-------------|----------------|---------------|---------|----------------------:|
| **pgvector** | ~10-100M vectors | Via Azure PostgreSQL | With extensions | Included in PG cost | Lowest (same DB) |
| Pinecone | Billions | Fully managed | Yes | $0.096/hr per pod | Lowest ops |
| Weaviate | Billions | Cloud or self-host | Best native hybrid | $0.05/hr+ | Medium |
| Qdrant | Billions | Cloud or self-host | Yes | $0.05/hr+ | Medium |

### Recommendation: Buy — pgvector (embedded in PostgreSQL)

1. **Operational simplicity** — one database for structured claim data AND vector embeddings. No second data store to manage, monitor, or pay for.
2. **Transactional consistency** — claim record updates and vector updates in the same transaction. Dedicated vector DBs can't guarantee this.
3. **Scale is sufficient** — Charterwell MVP processes 10K–100K claims/year per carrier, with ~50–200 vectors per claim (document chunks + policy sections). At 3 design partners, total vector count is ~1–5M. pgvector handles this trivially. Even at 100 carriers, we'd be at ~100M vectors — still within pgvector's comfort zone.
4. **Cost** — $0/additional cost. Already paying for PostgreSQL.
5. **pgvectorscale** delivers 471 QPS at 99% recall — competitive with Pinecone for our query patterns.

**When to revisit:** If we exceed 100M vectors or need sub-10ms latency at scale (Year 3+), evaluate migrating embeddings to Pinecone or Qdrant while keeping structured data in PostgreSQL.

---

## 3. Search

### Options Evaluated

| Engine | Full-Text Search | Vector/Semantic | Hybrid | Managed on Azure | Insurance Use Cases |
|--------|-----------------|-----------------|--------|------------------|--------------------|
| **Elasticsearch** | Best | Yes (dense vectors) | Yes (RRF) | Azure Marketplace / Elastic Cloud | Legora uses it; proven for legal/policy docs |
| Typesense | Good | Yes | Yes | Self-host or Typesense Cloud | Simpler, faster setup; less mature at scale |
| pgvector only | PostgreSQL FTS | Yes | Manual | Via Azure PostgreSQL | Simplest; may be sufficient for MVP |
| Azure AI Search | Good | Yes | Yes | Fully managed | Native Azure; good hybrid search |

### Recommendation: Buy — Phased (PostgreSQL FTS → Elasticsearch)

**Phase 1 — MVP (Weeks 1-12):** PostgreSQL full-text search + pgvector. Simpler, fewer moving parts.

**Phase 2 — Post-pilot (Week 20+):** Migrate to Elasticsearch when carriers onboard with large policy libraries and search quality becomes a differentiator.

**Why Elasticsearch long-term:**
1. **Legora precedent** — Legora built their RAG pipeline on Elasticsearch with vector search. It's production-proven at scale for professional services document search.
2. **Hybrid search** — Insurance search needs both keyword (policy number, ACORD form number, specific clause) AND semantic ("claims involving water damage to basement"). Elasticsearch's Reciprocal Rank Fusion (RRF) combines both in a single query.
3. **Policy document corpus** — Carriers have thousands of policy forms, endorsements, and coverage guidelines. Elasticsearch handles this at scale.
4. **Mature ecosystem** — Observability (Kibana), alerting, relevance tuning, synonym management — all built in.

---

## 4. Auth / Identity

### Options Evaluated

| Provider | Enterprise SSO (SAML) | HIPAA/SOC 2 | B2B Multi-tenancy | Free Tier | Pricing at Scale | Insurance Fit |
|----------|----------------------|-------------|-------------------|-----------|------------------|--------------:|
| **Azure AD B2C** | Yes | Yes (HIPAA BAA) | Yes | 50K MAU free | $0.00325/auth | **Best** — native Azure |
| Auth0 | Best | Yes | Yes (Organizations) | 7K MAU | $0.07/MAU (Essentials) | Strong compliance features |
| Clerk | Yes (SAML/OIDC) | SOC 2 | Yes (Organizations) | 10K MAU | $0.02/MAU | Good DX, less proven in regulated |
| Custom | Build yourself | Your responsibility | Build yourself | N/A | Infra cost only | Not recommended |

### Recommendation: Buy — Azure AD B2C

1. **Carrier alignment** — Insurance carriers overwhelmingly use Azure AD / Entra ID. Azure AD B2C lets carriers authenticate via their existing corporate identity provider with zero friction.
2. **HIPAA BAA** — Azure AD B2C is covered under Microsoft's HIPAA Business Associate Agreement.
3. **Cost** — 50K MAU free tier covers all 3 design partners easily. Even at scale, $0.00325/auth is cheaper than Auth0 ($0.07/MAU) or Clerk ($0.02/MAU).
4. **Multi-tenant isolation** — Azure AD B2C custom policies support per-carrier tenant configuration, role-based access, and carrier-specific branding.
5. **Same cloud** — Running auth, compute, storage, and OCR all on Azure simplifies networking, security, and compliance audits.

**Drawback:** Steeper learning curve than Auth0 or Clerk. Custom policies use XML-based configuration.

**When to reconsider:** If design partners are NOT on Microsoft/Azure AD, Auth0 provides more flexible IdP federation.

---

## 5. Infrastructure / Cloud Provider

### Options Evaluated

| Cloud | Insurance Market Share | HIPAA BAA | Document AI | Enterprise Sales Support | Key Advantage |
|-------|----------------------|-----------|-------------|------------------------|--------------:|
| **Azure** | ~40-50% of insurance carriers | Yes | Azure AI Document Intelligence | Strong (MSFT enterprise) | Carriers are MSFT shops |
| AWS | ~30-35% | Yes | Textract | Strong | Broadest service catalog |
| GCP | ~15-20% | Yes | Document AI | Weaker in insurance | Best AI/ML, lowest cost |

### Recommendation: Buy — Azure (primary cloud)

1. **Carrier alignment is the #1 factor.** 68% of insurance companies are upgrading to cloud-based platforms, and the majority are Microsoft-aligned. Using Azure eliminates procurement friction.
2. **Unified compliance** — HIPAA BAA, SOC 2, FedRAMP, and ISO 27001 all under one Microsoft agreement.
3. **Document Intelligence lives here** — Our OCR recommendation runs natively on Azure. No cross-cloud data transfer costs or latency.
4. **Carrier data residency** — Azure has the most regions and the most granular data residency controls.
5. **Enterprise relationships** — Microsoft's enterprise sales team can co-sell Charterwell.

**Multi-cloud consideration:** Design the application to be cloud-portable (containerized, no proprietary compute like Lambda). The only Azure-specific dependencies should be Document Intelligence and AD B2C.

### Azure Service Selection

| Need | Azure Service | Why |
|------|--------------|-----|
| Compute | Azure Container Apps | Serverless containers, auto-scaling, cost-efficient |
| Database | Azure Database for PostgreSQL (Flexible) | Managed PG with pgvector, HIPAA-eligible |
| Object Storage | Azure Blob Storage | Document originals, processed outputs |
| Queue/Messaging | Azure Service Bus | Async document processing pipeline |
| OCR | Azure AI Document Intelligence | Best accuracy, custom models |
| Auth | Azure AD B2C | Enterprise SSO, carrier alignment |
| Secrets | Azure Key Vault | API keys, encryption keys, certificates |
| Monitoring | Azure Monitor + Application Insights | Logs, metrics, traces, alerting |
| CDN | Azure Front Door | Global edge caching for web UI |
| CI/CD | GitHub Actions | Already using GitHub; Actions integrates with Azure |

---

## 6. Additional Components

### LLM Provider: Buy — Anthropic Claude (multi-model)

| Task | Model | Cost (per M tokens) |
|------|-------|--------------------:|
| Classification/routing | Claude Haiku 4.5 | $1 / $5 |
| Extraction/analysis | Claude Sonnet 4.6 | $3 / $15 |
| Complex reasoning | Claude Opus 4.6 | $5 / $25 |

Cost optimization: prompt caching (90% savings), batch API (50% savings).

### Email Processing: Buy — Microsoft Graph API

Carriers use Microsoft 365. Graph API provides native access to Exchange mailboxes for claims email ingestion.

### Agent Orchestration: Build — Custom state machine

The multi-agent claims pipeline (intake → extraction → adjudication → compliance → fraud) is core product logic. Using a framework like LangGraph or CrewAI would add abstraction without proportional benefit at MVP scale. Build a simple state machine; evaluate frameworks when scaling to 10+ agents.

### Playbook / Rules Engine: Build — Custom

The Playbook system is Charterwell's moat. Carrier-specific adjudication rules, compliance checklists, and routing logic are core differentiation. This must be purpose-built.

### Frontend: Build — Next.js (React)

The Claims Grid UI is the primary user interface and a key differentiator. No off-the-shelf dashboard fits.

---

## System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        CHARTERWELL                               │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Claims   │  │ Coverage │  │ Playbook │  │  Admin   │        │
│  │  Grid UI │  │ Analysis │  │  Engine  │  │Dashboard │        │
│  │ (Next.js)│  │  Engine  │  │ (Custom) │  │          │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
│       │              │              │              │              │
│  ┌────▼──────────────▼──────────────▼──────────────▼─────┐       │
│  │              REST API (Container Apps)                 │       │
│  └────┬───────────┬───────────┬───────────┬──────────────┘       │
│       │           │           │           │                      │
│  ┌────▼────┐ ┌────▼────┐ ┌───▼────┐ ┌────▼────┐                │
│  │Orchestr.│ │ Intake  │ │Extract │ │Complian.│                │
│  │ Agent   │ │ Agent   │ │ Agent  │ │ Agent  │                │
│  └────┬────┘ └────┬────┘ └───┬────┘ └────┬────┘                │
│       │           │          │           │                      │
├───────┼───────────┼──────────┼───────────┼──────────────────────┤
│       │      MANAGED SERVICES (AZURE)    │                      │
│  ┌────▼───────────▼──────────▼───────────▼─────┐                │
│  │                                             │                │
│  │  ┌─────────────┐  ┌──────────────────┐      │                │
│  │  │  Azure AI    │  │   Claude API     │      │                │
│  │  │  Document    │  │  (Sonnet/Haiku/  │      │                │
│  │  │  Intelligence│  │   Opus)          │      │                │
│  │  └─────────────┘  └──────────────────┘      │                │
│  │                                             │                │
│  │  ┌─────────────┐  ┌──────────────────┐      │                │
│  │  │ PostgreSQL  │  │  Azure Blob      │      │                │
│  │  │ + pgvector  │  │  Storage         │      │                │
│  │  └─────────────┘  └──────────────────┘      │                │
│  │                                             │                │
│  │  ┌─────────────┐  ┌──────────────────┐      │                │
│  │  │ Azure AD    │  │  Azure Service   │      │                │
│  │  │ B2C (Auth)  │  │  Bus (Queue)     │      │                │
│  │  └─────────────┘  └──────────────────┘      │                │
│  │                                             │                │
│  └─────────────────────────────────────────────┘                │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  CARRIER INTEGRATIONS                                            │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐          │
│  │  Guidewire   │  │  Duck Creek   │  │  M365/Exchange │          │
│  │  ClaimCenter │  │  Claims       │  │  (Graph API)   │          │
│  └─────────────┘  └──────────────┘  └────────────────┘          │
└──────────────────────────────────────────────────────────────────┘
```

---

## Technology Evolution Timeline

| Timeframe | Infrastructure Changes |
|-----------|------------------------|
| Months 1-3 (MVP) | Azure Container Apps, PostgreSQL + pgvector, Azure Document Intelligence, Claude Sonnet/Haiku |
| Months 4-6 | Add Elasticsearch for policy search, custom ACORD form models, Guidewire integration hardened |
| Months 7-9 | SOC 2 Type II audit, Azure Private Link for carrier-dedicated networking, batch processing pipeline |
| Months 10-12 | Multi-region deployment, Word/Outlook add-in architecture, Duck Creek integration |
| Months 13-18 | Evaluate dedicated vector DB (if >100M vectors), API platform for third-party integrations, fine-tuning pipeline for extraction models |

---

## Cost Projections (Monthly)

### MVP Phase (3 design partners, ~30K claims/month total)

| Service | Monthly Cost |
|---------|-------------:|
| Azure Container Apps | $200–500 |
| Azure PostgreSQL (Flexible, 4 vCPU) | $250–400 |
| Azure Blob Storage (1 TB) | $20–30 |
| Azure Service Bus | $10–25 |
| Azure AI Document Intelligence | $3,000–4,500 |
| Claude API (Anthropic) | $15,000–45,000 |
| Azure AD B2C | $0 (within free tier) |
| Azure Monitor | $50–100 |
| Elasticsearch (if added) | $500–1,000 |
| **Total** | **$19,000–51,000** |

**Revenue at $5-15/claim × 30K claims:** $150K–450K/month — strong unit economics from Day 1.
