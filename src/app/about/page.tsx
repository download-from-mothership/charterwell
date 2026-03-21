import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Charterwell is building the AI Claims Intelligence Workspace. We bring deep insurance domain knowledge and production-grade AI engineering to transform claims operations.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-surface px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-navy-500 sm:text-5xl">
            We&apos;re building the Claims Intelligence category
          </h1>
          <div className="mt-8 space-y-6 text-muted leading-relaxed">
            <p>
              Insurance runs on documents. Every claim starts with a stack of unstructured paper:
              police reports, medical records, policy declarations, damage photos, repair estimates,
              adjuster notes, compliance filings. A single P&amp;C claim touches 10–15 documents.
              Complex commercial claims touch hundreds.
            </p>
            <p>
              We built Charterwell because we believe the document layer is the foundation of
              every claims decision — and no one owns it today. Point solutions solve one step.
              Legacy platforms bolt AI onto decades-old architecture. The workspace — the operating
              system for insurance document workflows — does not exist yet.
            </p>
            <p>
              Until now.
            </p>
          </div>
        </div>
      </section>

      {/* Why now */}
      <section className="border-t border-navy-100 bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-navy-500 sm:text-3xl">Why now</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "AI capability threshold crossed",
                desc: "Large language models and vision models can now process insurance documents with the accuracy the industry demands.",
              },
              {
                title: "Workforce crisis accelerating",
                desc: "Experienced adjusters are retiring. New adjusters take years to train. AI is the only way to maintain quality as headcount declines.",
              },
              {
                title: "Regulatory pressure increasing",
                desc: "State departments demand faster resolution, better fraud detection, and more rigorous compliance documentation.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-navy-100 bg-surface p-6">
                <h3 className="font-semibold text-navy-500">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="border-t border-navy-100 bg-surface px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-navy-500 sm:text-3xl">The team</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Insurance expertise meets AI expertise. We&apos;ve built vertical AI platforms
            for document-heavy, regulated professions before — and we&apos;re doing it again for insurance.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-lg bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-600"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
