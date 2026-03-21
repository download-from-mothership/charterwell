import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Charterwell privacy policy. How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-navy-500">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted">Last updated: March 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
          <p>
            Charterwell, Inc. (&ldquo;Charterwell,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) is committed to
            protecting your privacy. This policy describes how we collect, use, and safeguard information
            when you visit charterwell.ai.
          </p>
          <h2 className="text-lg font-semibold text-navy-500">Information We Collect</h2>
          <p>
            When you submit a form on our website, we collect the information you provide: your name,
            email address, company name, role, and any message content. We use privacy-respecting
            analytics that do not use cookies or collect personally identifiable information.
          </p>
          <h2 className="text-lg font-semibold text-navy-500">How We Use Your Information</h2>
          <p>
            We use the information you provide solely to respond to your inquiry and to communicate
            with you about Charterwell&apos;s products and services. We do not sell or share your
            personal information with third parties for marketing purposes.
          </p>
          <h2 className="text-lg font-semibold text-navy-500">Contact</h2>
          <p>
            For privacy-related questions, contact us at privacy@charterwell.ai.
          </p>
        </div>
      </div>
    </section>
  );
}
