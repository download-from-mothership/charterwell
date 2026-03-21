"use client";

import { useState, type FormEvent } from "react";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "placeholder";
const FORM_ACTION = `https://formspree.io/f/${FORMSPREE_ID}`;

type FormStatus = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "mt-1.5 block w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-muted focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORM_ACTION, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-12 rounded-xl border border-teal-200 bg-teal-50 p-8 text-center" role="status">
        <svg className="mx-auto h-12 w-12 text-teal-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="mt-4 text-lg font-semibold text-navy-500">
          Thank you for reaching out
        </h2>
        <p className="mt-2 text-sm text-muted">
          We&apos;ll respond within one business day with a time to connect.
        </p>
      </div>
    );
  }

  return (
    <form className="mt-12 space-y-6" onSubmit={handleSubmit} noValidate>
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
            autoComplete="name"
            className={inputClasses}
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
            autoComplete="email"
            className={inputClasses}
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
            autoComplete="organization"
            className={inputClasses}
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
            autoComplete="organization-title"
            className={inputClasses}
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
          className={inputClasses}
          placeholder="What claim types are you processing? What tools are you using today? What's your biggest pain point?"
        />
      </div>

      {status === "error" && (
        <div className="rounded-lg border border-crimson/20 bg-crimson/5 px-4 py-3 text-sm text-crimson" role="alert">
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-teal-500 px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Schedule a Conversation"}
      </button>

      <p className="text-center text-xs text-muted">
        We&apos;ll respond within one business day. No spam. No sales sequences.
      </p>
    </form>
  );
}
