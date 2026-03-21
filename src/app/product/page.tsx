import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product",
  description:
    "From document to decision in minutes. See how Charterwell's AI Claims Intelligence Workspace processes, understands, and routes claims automatically.",
};

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-navy-500 sm:text-5xl">
            One workspace replaces your claims AI stack
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            From intake to payout. Every document understood. Every decision informed.
            The entire pipeline is AI-native — not AI bolted on.
          </p>
        </div>
      </section>

      {/* Workflow */}
      <section className="border-t border-navy-100 bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-navy-500 sm:text-3xl">
            From document to decision
          </h2>
          <div className="mt-14 space-y-12">
            {[
              {
                step: "Ingest",
                desc: "Documents arrive in any format — email attachments, fax, uploaded images, EDI feeds. Charterwell normalizes and classifies them automatically.",
              },
              {
                step: "Understand",
                desc: "AI extracts structured data from every document type: loss details, policy numbers, coverage limits, medical codes, repair estimates. Not just OCR — contextual understanding of what the data means for this specific claim.",
              },
              {
                step: "Route",
                desc: "Claims automatically routed to the right adjuster based on coverage type, complexity, and carrier-specific rules. Simple claims fast-tracked. Complex claims get experienced adjusters.",
              },
              {
                step: "Check",
                desc: "State-specific filing requirements, NAIC standards, fraud indicators, SIU referral triggers — all checked automatically, all documented for audit trail.",
              },
              {
                step: "Act",
                desc: "Approved claims flow directly to payment systems. The entire lifecycle — from first notice of loss to payment — lives in one workspace.",
              },
            ].map((item, i) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-500">{item.step}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical credibility */}
      <section className="border-t border-navy-100 bg-surface px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-navy-500 sm:text-3xl">
            Built for insurance. Built for production.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { metric: "50+", label: "P&C document types understood" },
              { metric: "50-state", label: "compliance rules built in" },
              { metric: "95%+", label: "extraction accuracy" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-navy-100 bg-white p-6 text-center">
                <p className="text-3xl font-bold text-teal-500">{item.metric}</p>
                <p className="mt-2 text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-500 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            See Charterwell in your workflow
          </h2>
          <p className="mt-4 text-navy-200">
            60–90 day pilot. Measurable ROI before enterprise commitment.
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
