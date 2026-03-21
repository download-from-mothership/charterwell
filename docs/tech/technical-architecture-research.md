# Technical Architecture Research

*Charterwell.ai — Founding Engineer Research Brief*
*March 21, 2026*

---

## 1. Legora's Architecture: Lessons for Charterwell

Legora (formerly Leya) is the leading vertical AI platform in legal tech, now valued at $5.55B. Their architecture offers a direct playbook for Charterwell in insurance.

### What Legora Built

- **Application-layer AI**: Legora did not build a proprietary LLM. They built an application layer on top of Claude (primarily) with enterprise integrations. This is the right model for Charterwell — the differentiation is in the domain logic, not the model.
- **RAG with Elasticsearch on Azure**: Legal documents are indexed in Elasticsearch with vector search for semantic retrieval. Queries find semantically related cases even when search terms differ. Charterwell should adopt the same pattern for claims documents and policy terms.
- **Large-scale parallelized LLM API calls**: Legora's "Tabular Review" feature processes hundreds of documents simultaneously by parallelizing API calls. For Charterwell, this maps to processing entire claim files (10-50 documents per claim) in parallel.
- **Microsoft Word add-in**: Legora integrates directly into the lawyer's existing workflow (Word, iManage, NetDocuments). Charterwell must do the same for adjusters — Word/Outlook add-ins, integration with Guidewire/Duck Creek.
- **Playbooks**: Carrier-configurable rules that encode firm-specific knowledge. This is directly applicable — insurance carriers have unique coverage interpretation rules, reserve calculation methods, and compliance requirements.
- **Multi-tenant architecture**: Each customer's data is isolated with per-query authentication. ISO 27001:2022 and SOC 2 Type I & II certified.

### 2026 Direction: Agentic AI

Legora is moving to agentic workflows where agents complete end-to-end legal tasks autonomously with human oversight. The agent loop: **reason → act → evaluate → iterate** until task complete. This validates our multi-agent claims architecture approach.

### Key Takeaways for Charterwell

1. **Build on top of frontier LLMs, don't train your own.** Legora's $5.5B valuation was built on Claude, not a custom model.
2. **Elasticsearch + vector search for RAG** is production-proven at scale for professional services document search.
3. **Azure is the enterprise cloud for regulated industries.** Legora chose Azure for GDPR compliance; insurance carriers are overwhelmingly Microsoft shops.
4. **Meet users where they work.** Word/Outlook plugins, not a separate web app, drive adoption.
5. **Playbooks = configurable business logic.** This is the moat — encoding carrier-specific knowledge into the platform.

---

## 2. Document Processing Pipeline

### State of the Art (2026)

Insurance document processing has evolved from basic OCR to intelligent document processing (IDP) with LLM-powered extraction. Top platforms now deliver **99%+ field-level accuracy** on real-world inputs including blurry photos, multi-page health docs, and handwritten notes.

### OCR/Document AI Platform Comparison

| Platform | Strengths | Weaknesses | Insurance Fit |
|----------|-----------|------------|---------------|
| **Azure AI Document Intelligence** | Best accuracy on complex layouts; custom model training; on-premise containers; prebuilt invoice/receipt models | Microsoft ecosystem lock-in | **Best fit** — on-prem option for PHI/PII, carriers are Microsoft shops |
| **Google Document AI** | Strong accuracy (close to Azure); custom training; good multilingual support | Requires GCP; less common in insurance enterprises | Good for cost optimization |
| **AWS Textract** | Strong on tables/key-value pairs; native S3/Lambda integration; insurance forms are a sweet spot | No custom training; "as-is" pretrained models only | Good if on AWS, but less flexible |
| **ABBYY Vantage** | Best language support; strongest on handwriting; on-premise option | Higher cost; slower processing | Good for legacy document archives |

### Recommended Pipeline Architecture

```
[Document Intake]
    ├── Email (MIME parsing)
    ├── Portal upload
    ├── Fax/scan (TIFF/PDF)
    └── API submission
        │
        ▼
[Pre-processing]
    ├── Image enhancement / de-skewing / noise reduction
    ├── Page splitting (multi-doc PDFs)
    └── Document classification (ACORD form type, medical record, photo, etc.)
        │
        ▼
[OCR + Extraction]
    ├── Azure AI Document Intelligence (primary)
    │   ├── Layout-preserving text extraction
    │   ├── Table extraction
    │   ├── Checkbox/handwriting recognition
    │   └── Custom models for ACORD forms
    │
    ├── Fallback: LLM-based extraction (Claude/GPT)
    │   └── For complex/ambiguous documents where OCR alone isn't enough
    │
    └── Consistency validation
        ├── Cross-field logic checks (premium vs. coverage amounts)
        ├── Date consistency
        └── Policy number format validation
        │
        ▼
[Structured Output]
    ├── Claimant info, policy numbers, dates, amounts
    ├── Loss descriptions, involved parties
    ├── Coverage provisions, exclusions
    └── Confidence scores per field
```

### Key Document Types (Priority Order)

1. **ACORD Forms** (25, 28, 80, 125, 130, 140) — standardized but 4,700+ versions across 800+ form types
2. **First Notice of Loss (FNOL)** — often free-text, requires NLP extraction
3. **Medical records** — multi-page, handwritten notes, PHI handling required
4. **Police/fire reports** — variable formats by jurisdiction
5. **Invoices/estimates** — contractor repair estimates, medical bills
6. **Photos/videos** — damage assessment, requires vision models
7. **Correspondence** — emails, letters, adjuster notes

---

## 3. LLM Selection

### Current Model Landscape (March 2026)

| Model | Input $/M | Output $/M | Context | Best For |
|-------|-----------|------------|---------|----------|
| **Claude Opus 4.6** | $5.00 | $25.00 | 200K | Complex reasoning, long documents |
| **Claude Sonnet 4.6** | $3.00 | $15.00 | 200K | Best all-rounder; top extraction quality |
| **Claude Haiku 4.5** | $1.00 | $5.00 | 200K | Classification, routing, simple extraction |
| **GPT-5.2** | $1.75 | $14.00 | 200K | Competitive extraction, mature ecosystem |
| **GPT-5 Mini** | $0.25 | $2.00 | 200K | Cost-effective for simpler tasks |
| **Gemini 2.5 Pro** | $1.25 | $10.00 | 2M | Massive context window, multimodal |
| **Gemini 2.5 Flash** | $0.30 | $2.50 | 1M | Fast, cheap, good for high-volume |
| **DeepSeek V3.2** | $0.28 | $0.42 | 128K | Ultra-cheap; data residency concerns (China) |
| **Mistral Large 3** | $2.00 | $6.00 | 128K | EU data residency; open weights available |

### Evaluation Criteria for Insurance

| Factor | Claude | GPT | Gemini | Open-Source (Llama/Mistral) |
|--------|--------|-----|--------|---------------------------|
| **Extraction accuracy** | 96% on financial docs (Sonnet) | 94% on financial docs (GPT-4o) | Strong multimodal | Lower, improving |
| **Insurance terminology** | Excellent | Excellent | Good | Requires fine-tuning |
| **Cost per claim** | Medium | Medium-low | Low | Lowest (self-hosted) |
| **Latency** | Fast (Sonnet/Haiku) | Fast | Very fast (Flash) | Variable |
| **Fine-tuning** | Not yet available | Available | Available | Full control |
| **Data residency** | US/EU regions | US/EU regions | US/EU regions | Self-hosted anywhere |
| **SOC 2 compliance** | Yes | Yes | Yes | Your responsibility |
| **Prompt caching** | 90% input savings | Available | Available | N/A |
| **Batch API** | 50% discount | 50% discount | Available | N/A |

### Recommendation: Multi-Model Strategy

**Don't pick one LLM. Use the right model for each task:**

| Task | Recommended Model | Rationale |
|------|-------------------|-----------|
| Document classification/routing | Haiku 4.5 or Gemini Flash | High volume, low complexity, cost matters |
| Data extraction from forms | Sonnet 4.6 or GPT-5.2 | Best accuracy on structured extraction |
| Complex claim analysis | Opus 4.6 or GPT-5.2 Pro | Needs deep reasoning over long documents |
| Coverage determination | Sonnet 4.6 | Best balance of accuracy and cost for legal reasoning |
| Fraud screening | Sonnet 4.6 | Pattern recognition across claim history |
| Summarization | Sonnet 4.6 or Gemini 2.5 Pro | 2M context window useful for massive claim files |

**Cost optimization levers:**
- Prompt caching saves 75-90% on repeated context (policy terms, playbook rules)
- Batch API saves 50% for non-real-time processing
- Tiered model selection: use cheap models for simple tasks, expensive models only when needed
- Estimated cost per claim: **$0.50–$2.00** with optimized routing (vs. $5-10 using frontier models for everything)

---

## 4. Multi-Agent Architecture

### Industry Precedent: Allianz Project Nemo

Allianz deployed the most public example of multi-agent claims processing, going live in under 100 days with 7 specialized agents:

| Agent | Role |
|-------|------|
| **Planner** | Orchestrates workflow, maintains process state |
| **Cyber** | Enforces data security and policy guardrails |
| **Coverage** | Verifies policy coverage for the claim type |
| **Weather** | Validates weather event at reported location/time |
| **Fraud** | Screens for anomalies and risk signals |
| **Payout** | Calculates amount, recommends next steps |
| **Audit** | Generates compliance audit trail of all decisions |

**Results**: 80% reduction in processing time, entire technical process completes in under 5 minutes, human reviewer makes final authorization.

### Proposed Charterwell Agent Architecture

Based on Allianz's proven model and broader industry patterns, here is a recommended multi-agent design for Charterwell:

```
                    ┌─────────────────┐
                    │  Orchestrator   │
                    │    Agent        │
                    │ (workflow mgmt) │
                    └────────┬────────┘
                             │
         ┌───────────┬───────┼───────┬───────────┐
         ▼           ▼       ▼       ▼           ▼
    ┌─────────┐ ┌────────┐ ┌─────┐ ┌──────┐ ┌───────┐
    │ Intake  │ │Extract │ │Adjud│ │Compli│ │ Fraud │
    │ Agent   │ │ Agent  │ │Agent│ │ance  │ │Screen │
    └─────────┘ └────────┘ └─────┘ └──────┘ └───────┘
```

#### Agent Definitions

1. **Orchestrator Agent**
   - Routes claims through the pipeline based on claim type and complexity
   - Maintains state across agent handoffs
   - Escalates to human when confidence is low or claim exceeds thresholds
   - Implements the agent loop: reason → act → evaluate → iterate

2. **Intake Agent**
   - Receives submissions from all channels (email, portal, fax, API)
   - Classifies document types
   - Extracts initial claim data (claimant, policy number, date of loss)
   - Performs duplicate detection
   - Assigns severity/priority

3. **Extraction Agent**
   - Deep data extraction from all claim documents
   - Handles ACORD forms, medical records, invoices, photos
   - Cross-references extracted data for consistency
   - Outputs structured claim record with confidence scores

4. **Adjudication Agent**
   - Matches extracted claim data against policy terms
   - Identifies applicable coverage provisions and exclusions
   - Calculates reserve estimates
   - Recommends next steps (approve, deny, request more info, escalate)
   - Applies carrier-specific playbook rules

5. **Compliance Agent**
   - Validates against state DOI requirements
   - Checks NAIC data standards
   - Ensures required notices sent within statutory timeframes
   - Generates regulatory-ready documentation
   - PHI/PII access controls and audit logging

6. **Fraud Screening Agent**
   - Pattern matching against known fraud indicators
   - Cross-references claimant history
   - Validates third-party data (weather events, police reports)
   - SIU referral recommendations
   - Anomaly detection on claim amounts and timing

#### Orchestration Best Practices (2026)

- **Modular, not monolithic**: Each agent is independently deployable and testable
- **Human-in-the-loop by default**: Agents recommend, humans decide (especially for payouts above threshold)
- **Audit trail is mandatory**: Every agent decision must be logged with reasoning for regulatory compliance
- **Graceful degradation**: If one agent fails, the claim is routed to manual processing, not dropped
- **Carrier-configurable**: Playbooks allow each carrier to customize agent behavior without code changes

#### Framework Options

| Framework | Pros | Cons |
|-----------|------|------|
| **Custom (recommended for MVP)** | Full control, no vendor lock-in, simpler to debug | More engineering effort |
| **LangGraph** | Good for complex stateful workflows | Heavy abstraction, debugging can be opaque |
| **CrewAI** | Easy multi-agent setup | Less mature, less control |
| **Autogen (Microsoft)** | Strong Microsoft ecosystem integration | Opinionated architecture |
| **Claude Agent SDK** | Native Claude integration, built for production | Anthropic-specific |

**Recommendation**: Start with a custom orchestration layer for MVP. The agent pattern is straightforward — it's a state machine with LLM calls at each node. Premature framework adoption adds complexity without proportional benefit. Evaluate frameworks when scaling to 10+ agents or needing complex inter-agent communication.

---

## 5. Summary & Recommended Architecture Stack

| Component | Recommendation | Rationale |
|-----------|---------------|-----------|
| **Cloud** | Azure (primary) | Insurance carriers are Microsoft shops; GDPR/HIPAA compliance; on-prem containers available |
| **OCR/Extraction** | Azure AI Document Intelligence | Best accuracy, custom training, on-prem option for PHI |
| **Primary LLM** | Claude Sonnet 4.6 | Best extraction quality, strong reasoning, good safety profile |
| **Fast/Cheap LLM** | Claude Haiku 4.5 or Gemini Flash | Classification, routing, simple tasks |
| **Deep Reasoning LLM** | Claude Opus 4.6 | Complex coverage analysis, dispute resolution |
| **Search/RAG** | Elasticsearch (vector + keyword) | Proven at scale by Legora; hybrid search for legal/policy documents |
| **Agent Orchestration** | Custom state machine (MVP) | Full control, avoid premature framework lock-in |
| **User Interface** | Word/Outlook add-ins + web dashboard | Meet adjusters in their workflow |
| **Playbook Engine** | Custom rules engine | Carrier-configurable business logic is the moat |
| **Compliance** | SOC 2 Type II target within 12 months | Table stakes for enterprise insurance |

### Estimated Per-Claim Processing Cost

| Component | Cost per Claim |
|-----------|---------------|
| OCR/extraction (Azure) | $0.05–0.10 |
| LLM calls (multi-model) | $0.50–2.00 |
| Search/RAG queries | $0.01–0.05 |
| Infrastructure | $0.05–0.10 |
| **Total** | **$0.60–2.25** |

At 100K claims/month, this is roughly **$60K–225K/month** in variable processing costs, well within typical SaaS margins for enterprise insurance software priced at $5-15 per claim.
