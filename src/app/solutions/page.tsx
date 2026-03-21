import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Charterwell for claims leaders, CIOs, and claims operations directors. See how the AI Claims Intelligence Workspace solves your specific challenges.",
};

const personas = [
  {
    title: "For Claims Leaders",
    subtitle: "VP Claims & Chief Claims Officers",
    headline: "Cut your claims cycle time in half without adding headcount",
    points: [
      "40% claims cycle time reduction end-to-end",
      "FNOL triage in under 3 minutes, down from 15–20",
      "Experienced adjusters focus on complex claims, not data entry",
      "Measurable impact on combined ratio from day one",
    ],
    cta: "See the Claims Leader view",
  },
  {
    title: "For CIOs & CTOs",
    subtitle: "Technology & Digital Leaders",
    headline: "One workspace replaces your claims AI stack",
    points: [
      "Integrates with Guidewire, Duck Creek, and major core systems",
      "SOC 2 Type II compliant architecture",
      "Deploy in 60–90 days, not 12–24 months",
      "Reduce vendor sprawl — one platform, not 10 point solutions",
    ],
    cta: "See the architecture",
  },
  {
    title: "For Claims Operations",
    subtitle: "Directors & Team Leads",
    headline: "Your examiners deserve better than alt-tabbing between 12 windows",
    points: [
      "85% processing time reduction per claim",
      "Consistent adjudication via carrier-specific playbooks",
      "New adjusters onboard faster with AI-assisted workflows",
      "Every decision documented for compliance audit trail",
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
          key={persona.title}
          className={`border-t border-navy-100 px-6 py-20 ${i % 2 === 0 ? "bg-white" : "bg-surface"}`}
        >
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-500">
              {persona.title}
            </p>
            <p className="mt-1 text-xs text-muted">{persona.subtitle}</p>
            <h2 className="mt-4 text-2xl font-bold text-navy-500 sm:text-3xl">
              {persona.headline}
            </h2>
            <ul className="mt-8 space-y-4">
              {persona.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-muted">{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-lg bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-600"
            >
              {persona.cta}
            </Link>
          </div>
        </section>
      ))}
    </>
  );
}
