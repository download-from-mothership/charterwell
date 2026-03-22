import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BASE_URL = process.env.SITE_URL || "https://charterwell.io";
const BLOG_DIR = path.join(process.cwd(), "content/blog");

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/product", priority: "0.9", changefreq: "monthly" },
  { path: "/solutions", priority: "0.9", changefreq: "monthly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/resources", priority: "0.8", changefreq: "weekly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
];

const today = new Date().toISOString().split("T")[0];

let blogEntries = [];
if (fs.existsSync(BLOG_DIR)) {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  blogEntries = files.map((file) => {
    const slug = file.replace(/\.(mdx|md)$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data } = matter(raw);
    return {
      path: `/resources/${slug}`,
      priority: "0.6",
      changefreq: "monthly",
      lastmod: data.date || today,
    };
  });
}

const urls = [
  ...staticPages.map((p) => ({ ...p, lastmod: today })),
  ...blogEntries,
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${BASE_URL}${u.path}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

fs.writeFileSync(path.join(process.cwd(), "public/sitemap.xml"), sitemap);
console.log(`Sitemap generated with ${urls.length} URLs`);
