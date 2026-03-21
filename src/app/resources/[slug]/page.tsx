import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function renderMarkdown(content: string) {
  // Simple markdown-to-HTML for headings, paragraphs, bold, italic, links, and lists.
  // No heavy dependencies. Sufficient for blog content at launch.
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="my-4 list-disc space-y-2 pl-6 text-muted">
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  function inlineMarkdown(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-teal-500 underline hover:text-teal-600">$1</a>');
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={key++} className="mb-4 mt-10 text-2xl font-bold text-navy-500">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={key++} className="mb-3 mt-8 text-xl font-semibold text-navy-500">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
    } else if (trimmed === "") {
      flushList();
    } else {
      flushList();
      elements.push(
        <p
          key={key++}
          className="my-4 leading-relaxed text-muted"
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(trimmed) }}
        />
      );
    }
  }
  flushList();

  return <>{elements}</>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="bg-white px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/resources"
          className="text-sm text-teal-500 hover:text-teal-600 transition-colors"
        >
          &larr; Back to Resources
        </Link>

        <header className="mt-8">
          <h1 className="text-3xl font-bold leading-tight text-navy-500 sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted">
            <span>{post.author}</span>
            <span aria-hidden="true">&middot;</span>
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
        </header>

        <div className="mt-10 border-t border-navy-100 pt-10">
          {renderMarkdown(post.content)}
        </div>

        <div className="mt-16 rounded-xl border border-navy-100 bg-surface p-8 text-center">
          <h2 className="text-xl font-bold text-navy-500">
            See Charterwell in your workflow
          </h2>
          <p className="mt-2 text-sm text-muted">
            60–90 day pilot. Measurable ROI before enterprise commitment.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-600"
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </article>
  );
}
