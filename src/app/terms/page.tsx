import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Charterwell terms of service governing use of the charterwell.ai website.",
};

export default function TermsPage() {
  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-navy-500">Terms of Service</h1>
        <p className="mt-4 text-sm text-muted">Last updated: March 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
          <p>
            These terms govern your use of the charterwell.ai website operated by Charterwell, Inc.
            By accessing this website, you agree to these terms.
          </p>
          <h2 className="text-lg font-semibold text-navy-500">Use of the Website</h2>
          <p>
            This website is provided for informational purposes about Charterwell&apos;s products and
            services. You may not use this website for any unlawful purpose or in any way that could
            damage, disable, or impair the website.
          </p>
          <h2 className="text-lg font-semibold text-navy-500">Intellectual Property</h2>
          <p>
            All content, trademarks, and intellectual property on this website are owned by
            Charterwell, Inc. and are protected by applicable laws.
          </p>
          <h2 className="text-lg font-semibold text-navy-500">Limitation of Liability</h2>
          <p>
            Charterwell provides this website &ldquo;as is&rdquo; without warranties of any kind.
            We shall not be liable for any damages arising from your use of this website.
          </p>
          <h2 className="text-lg font-semibold text-navy-500">Contact</h2>
          <p>
            For questions about these terms, contact us at legal@charterwell.ai.
          </p>
        </div>
      </div>
    </section>
  );
}
