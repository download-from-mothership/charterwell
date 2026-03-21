import Link from "next/link";

function HeroSection() {
  return (
    <section className="bg-surface px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-navy-500 sm:text-5xl lg:text-6xl">
          The AI Claims Intelligence Workspace
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          Every document understood. Every decision informed. Every claim connected.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="rounded-lg bg-teal-500 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-600"
          >
            See Charterwell in Your Workflow
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const stats = [
    { value: "10–15", label: "documents per claim, processed manually" },
    { value: "17", label: "disconnected data sources per carrier" },
    { value: "15–20 min", label: "per FNOL just to validate what should be obvious" },
  ];

  return (
    <section className="border-t border-navy-100 bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-navy-500 sm:text-4xl">
          Claims professionals are drowning in documents
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Point solutions for each step create a fragmented stack. Legacy platforms bolt AI onto decades-old architecture.
          The result: 80% of carriers deploy AI. Only 7% scale it.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.value} className="rounded-xl border border-navy-100 bg-surface p-6 text-center">
              <p className="text-3xl font-bold text-teal-500 sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSection() {
  const steps = [
    {
      step: "01",
      title: "Ingest",
      description: "Documents arrive in any format — email, fax, uploads, EDI feeds. Charterwell normalizes and classifies them automatically.",
    },
    {
      step: "02",
      title: "Understand",
      description: "AI reads, classifies, and extracts — understanding context, not just text. 50+ P&C document types with insurance-specific intelligence.",
    },
    {
      step: "03",
      title: "Route",
      description: "Claims triaged and assigned to the right adjuster based on coverage type, complexity, and carrier-specific rules.",
    },
    {
      step: "04",
      title: "Check",
      description: "Compliance verified against 50-state rules and carrier playbooks. Every decision documented for audit trail.",
    },
    {
      step: "05",
      title: "Act",
      description: "Adjusters work in a unified workspace with full claim context. No more alt-tabbing between 12 tools.",
    },
  ];

  return (
    <section id="product" className="border-t border-navy-100 bg-surface px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-navy-500 sm:text-4xl">
          From document to decision in minutes, not hours
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          One workspace replaces your claims AI stack. The entire pipeline is AI-native — not AI bolted on.
        </p>

        <div className="mt-14 space-y-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="flex gap-6 rounded-xl border border-navy-100 bg-white p-6 shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-sm font-bold text-teal-600">
                {item.step}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-navy-500">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Document Intelligence Engine",
      description: "AI that doesn't just extract data — it understands what documents mean for your claim. Context-aware extraction across 50+ P&C document types.",
      metric: "95%+ extraction accuracy",
    },
    {
      title: "Playbook System",
      description: "Carrier-specific rules encoded as living playbooks. Adjudication logic, compliance requirements, escalation triggers. Your institutional knowledge, systemized.",
      metric: "50-state compliance",
    },
    {
      title: "Unified Workspace",
      description: "One environment where claims professionals think, decide, and act. Every document, decision, and workflow — connected.",
      metric: "< 3 min FNOL triage",
    },
    {
      title: "Enterprise Integration",
      description: "Connects to Guidewire, Duck Creek, and major core systems. Charterwell is your system of intelligence — not a replacement for your system of record.",
      metric: "60–90 day pilot",
    },
  ];

  return (
    <section id="features" className="border-t border-navy-100 bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-navy-500 sm:text-4xl">
          Built for claims. Built for carriers.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Not a point solution. Not a bolt-on. Built from the ground up around intelligence.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-navy-100 bg-surface p-8"
            >
              <h3 className="text-lg font-semibold text-navy-500">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{feature.description}</p>
              <p className="mt-4 text-sm font-semibold text-teal-500">{feature.metric}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section id="why" className="border-t border-navy-100 bg-surface px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-navy-500 sm:text-4xl">
          The document layer is the foundation
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          Every claims decision starts with understanding documents. No one owns this layer today. Charterwell does.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <p className="text-3xl font-bold text-navy-500">85%</p>
            <p className="mt-1 text-sm text-muted">processing time reduction</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-navy-500">40%</p>
            <p className="mt-1 text-sm text-muted">claims cycle time reduction</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-navy-500">$80B</p>
            <p className="mt-1 text-sm text-muted">annual U.S. insurance fraud addressed</p>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-xl border border-navy-100 bg-white p-8 shadow-sm">
          <blockquote className="text-center text-lg italic leading-relaxed text-navy-400">
            &ldquo;88% of insurers say they are deploying or planning to deploy AI. Only 7% have successfully scaled it into production. The gap between intent and execution is enormous.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function SocialProofSection() {
  return (
    <section className="border-t border-navy-100 bg-white px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted">
          Trusted by forward-thinking P&C carriers
        </p>
        <p className="mt-4 text-sm text-muted">
          Design partner program now open — join the carriers building the next generation of claims operations.
        </p>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-navy-500 px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          See Charterwell in your workflow
        </h2>
        <p className="mt-4 text-lg text-navy-200">
          60–90 day pilot. One claim type. One geography. Measurable ROI before enterprise commitment.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-lg bg-teal-500 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-400"
        >
          Request a Demo
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <ProductSection />
      <FeaturesSection />
      <WhySection />
      <SocialProofSection />
      <CTASection />
    </>
  );
}
