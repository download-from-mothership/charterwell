import type { Metadata } from "next";

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

        <form className="mt-12 space-y-6" action="https://formspree.io/f/placeholder" method="POST">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-navy-500">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-muted focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy-500">
                Work Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-muted focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                placeholder="jane@carrier.com"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-navy-500">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-muted focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                placeholder="Acme Insurance"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-navy-500">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-muted focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                placeholder="VP Claims"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-navy-500">
              Tell us about your claims workflow
              <span className="font-normal text-muted"> (optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-muted focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              placeholder="What claim types are you processing? What tools are you using today? What's your biggest pain point?"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-teal-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-600"
          >
            Schedule a Conversation
          </button>

          <p className="text-center text-xs text-muted">
            We&apos;ll respond within one business day. No spam. No sales sequences.
          </p>
        </form>
      </div>
    </section>
  );
}
