import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <h1 className="text-6xl font-bold text-navy-500">404</h1>
      <p className="mt-4 text-lg text-muted">Page not found.</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-600"
      >
        Back to Home
      </Link>
    </section>
  );
}
