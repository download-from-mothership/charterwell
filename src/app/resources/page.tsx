import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Insights, research, and thought leadership on AI in insurance claims processing from the Charterwell team.",
};

export default function ResourcesPage() {
  return (
    <section className="bg-surface px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-navy-500 sm:text-5xl">Resources</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          Insights on AI in insurance, claims intelligence, and the future of document workflows.
        </p>
        <div className="mt-16 rounded-xl border border-navy-100 bg-white p-12">
          <p className="text-sm font-semibold text-navy-500">Coming soon</p>
          <p className="mt-2 text-sm text-muted">
            Our first articles and research reports are in development. Check back soon.
          </p>
        </div>
      </div>
    </section>
  );
}
