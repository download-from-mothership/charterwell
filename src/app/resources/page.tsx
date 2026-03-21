import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Insights, research, and thought leadership on AI in insurance claims processing from the Charterwell team.",
};

export default function ResourcesPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="bg-surface px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-navy-500 sm:text-5xl">Resources</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Insights on AI in insurance, claims intelligence, and the future of document workflows.
          </p>
        </div>
      </section>

      <section className="border-t border-navy-100 bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {posts.length === 0 ? (
            <div className="rounded-xl border border-navy-100 bg-surface p-12 text-center">
              <p className="text-sm font-semibold text-navy-500">Coming soon</p>
              <p className="mt-2 text-sm text-muted">
                Our first articles and research reports are in development. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/resources/${post.slug}`}
                  className="group block rounded-xl border border-navy-100 bg-surface p-8 transition-shadow hover:shadow"
                >
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-navy-500 group-hover:text-teal-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                  <p className="mt-4 text-sm font-medium text-teal-500">
                    Read article &rarr;
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
