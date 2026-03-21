import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Charterwell for claims leaders, CIOs, and claims operations directors. See how the AI Claims Intelligence Workspace solves your specific challenges.",
};

const personas = [
  {
    id: "claims-leaders",
    label: "For Claims Leaders",
    subtitle: "VP Claims & Chief Claims Officers",
    headline: "Cut your claims cycle time in half without adding headcount",
    description:
      "Your combined ratio is under pressure. Experienced adjusters are retiring faster than you can hire. And every board meeting asks the same question: where's the AI ROI? Charterwell gives you measurable impact from day one.",
    painPoints: [
      {
        pain: "FNOL triage takes 15–20 minutes per claim",
        solution: "AI-powered triage in under 3 minutes — documents classified, data extracted, adjuster assigned",
      },
      {
        pain: "Experienced adjusters spend 40% of their time on data entry",
        solution: "Automated document understanding frees adjusters to focus on complex decisions",
      },
      {
        pain: "Claims cycle time is too long to be competitive",
        solution: "40% end-to-end cycle time reduction through continuous document processing",
      },
      {
        pain: "Leakage from inconsistent adjudication across the book",
        solution: "Carrier-specific playbooks ensure every claim follows your rules, every time",
      },
    ],
    metrics: [
      { value: "40%", label: "cycle time reduction" },
      { value: "< 3 min", label: "FNOL triage" },
      { value: "85%", label: "processing time saved" },
    ],
    cta: "See the Claims Leader view",
  },
  {
    id: "technology-leaders",
    label: "For CIOs & CTOs",
    subtitle: "Technology & Digital Leaders",
    headline: "One workspace replaces your claims AI stack",
    description:
      "You've been asked to consolidate vendors, reduce integration complexity, and deliver AI at scale — all while maintaining SOC 2 compliance and keeping the lights on. Charterwell is the platform that makes vendor consolidation real.",
    painPoints: [
      {
        pain: "10+ AI point solutions that don't talk to each other",
        solution: "One workspace that owns the full document lifecycle — ingest, understand, route, check, act",
      },
      {
        pain: "12–24 month integration timelines for new AI tools",
        solution: "60–90 day pilot deployment. Pre-built connectors for Guidewire and Duck Creek",
      },
      {
        pain: "Security and compliance concerns with each new vendor",
        solution: "SOC 2 Type II architecture. Data never leaves your environment. Full audit trail",
      },
      {
        pain: "AI tools that require constant tuning and maintenance",
        solution: "Insurance-native AI that understands 50+ P&C document types out of the box",
      },
    ],
    metrics: [
      { value: "60–90 day", label: "pilot deployment" },
      { value: "50+", label: "document types" },
      { value: "SOC 2", label: "compliant" },
    ],
    cta: "See the architecture",
  },
  {
    id: "operations",
    label: "For Claims Operations",
    subtitle: "Directors & Team Leads",
    headline: "Your examiners deserve better than alt-tabbing between 12 windows",
    description:
      "You see the inefficiency every day. New adjusters take months to get up to speed. Experienced adjusters waste hours on data entry. And when audit season comes, pulling compliance documentation is a scramble. Charterwell changes the daily experience of claims work.",
    painPoints: [
      {
        pain: "New adjusters take 6–12 months to handle claims independently",
        solution: "AI-assisted workflows guide new adjusters through carrier-specific processes from day one",
      },
      {
        pain: "Inconsistent decisions across the team",
        solution: "Playbook-driven adjudication ensures consistency without removing human judgment",
      },
      {
        pain: "Compliance documentation is manual and error-prone",
        solution: "Every decision automatically documented. Audit-ready compliance trail built in",
      },
      {
        pain: "Straight-through processing is a dream, not a reality",
        solution: "Simple claims auto-processed end-to-end. Complex claims get experienced adjusters with full context",
      },
    ],
    metrics: [
      { value: "85%", label: "processing time saved" },
      { value: "50-state", label: "compliance built in" },
      { value: "100%", label: "audit trail coverage" },
    ],
    cta: "See the Operations view",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="bg-surface px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-navy-500 sm:text-5xl">
            Built for how you work
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Whether you lead claims strategy, own the technology stack, or run daily operations —
            Charterwell is designed for your specific challenges.
          </p>
        </div>
      </section>

      {personas.map((persona, i) => (
        <section
          key={persona.id}
          id={persona.id}
          className={`border-t border-navy-100 px-6 py-20 ${i % 2 === 0 ? "bg-white" : "bg-surface"}`}
        >
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-500">
              {persona.label}
            </p>
            <p className="mt-1 text-xs text-muted">{persona.subtitle}</p>
            <h2 className="mt-4 text-2xl font-bold text-navy-500 sm:text-3xl">
              {persona.headline}
            </h2>
            <p className="mt-4 max-w-3xl text-muted leading-relaxed">
              {persona.description}
            </p>

            {/* Pain → Solution grid */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {persona.painPoints.map((pp) => (
                <div key={pp.pain} className="rounded-xl border border-navy-100 bg-white p-6">
                  <p className="text-sm font-medium text-navy-400">{pp.pain}</p>
                  <div className="mt-3 flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <p className="text-sm text-navy-500">{pp.solution}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="mt-10 flex flex-wrap gap-8">
              {persona.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-2xl font-bold text-teal-500">{m.value}</p>
                  <p className="text-xs text-muted">{m.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-block rounded-lg bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
            >
              {persona.cta}
            </Link>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="bg-navy-500 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            See Charterwell in your workflow
          </h2>
          <p className="mt-4 text-navy-200">
            We tailor every conversation to your role and your claims operation. No generic demo.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-teal-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-teal-400"
          >
            Request a Demo
          </Link>
        </div>
      </section>
    </>
  );
}
