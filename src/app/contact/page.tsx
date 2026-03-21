import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "See Charterwell in your workflow. Schedule a conversation with our team to learn how the AI Claims Intelligence Workspace can transform your claims operations.",
};

export default function ContactPage() {
  return (
    <section className="bg-surface px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-navy-500 sm:text-4xl">
            See Charterwell in your workflow
          </h1>
          <p className="mt-4 text-muted">
            Tell us about your claims operation and we&apos;ll show you how Charterwell fits.
            No generic demo — we tailor every conversation to your workflow.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
