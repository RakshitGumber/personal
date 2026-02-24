import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const siteUrl = "https://rakshit.dev";
const contentBlogDir = path.resolve(root, "content/blog");
const contentProjectDir = path.resolve(root, "content/projects");
const contentCaseStudyDir = path.resolve(root, "content/case-studies");
const outputPublicDir = path.resolve(root, "public");

async function getBlogPosts() {
  const entries = await fs.readdir(contentBlogDir);
  const mdxFiles = entries.filter((entry) => entry.endsWith(".mdx"));

  const posts = [];
  for (const fileName of mdxFiles) {
    const fullPath = path.join(contentBlogDir, fileName);
    const raw = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(raw);
    const slug = fileName.replace(".mdx", "");
    posts.push({
      slug,
      title: typeof data.title === "string" ? data.title : slug,
      date: typeof data.date === "string" ? data.date : "1970-01-01",
      description: typeof data.description === "string" ? data.description : "",
      content,
    });
  }

  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function buildRss(posts) {
  const items = posts
    .map(
      (post) => `
  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${siteUrl}/blog/${post.slug}</link>
    <guid>${siteUrl}/blog/${post.slug}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description>${escapeXml(post.description || post.content.slice(0, 180))}</description>
  </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Rakshit Gumber Blog</title>
    <link>${siteUrl}</link>
    <description>Technical writing, systems experiments, and build notes.</description>
${items}
  </channel>
</rss>`;

  await fs.writeFile(path.join(outputPublicDir, "rss.xml"), xml, "utf8");
}

async function buildSitemap(posts) {
  const staticRoutes = ["/", "/blog", "/projects", "/case-studies", "/search", "/now", "/lab", "/media", "/thoughts", "/about"];
  const projectEntries = (await fs.readdir(contentProjectDir))
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => entry.replace(".mdx", ""));
  const caseStudyEntries = (await fs.readdir(contentCaseStudyDir))
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => entry.replace(".mdx", ""));

  const urls = [
    ...staticRoutes.map((route) => `<url><loc>${siteUrl}${route}</loc></url>`),
    ...posts.map((post) => `<url><loc>${siteUrl}/blog/${post.slug}</loc></url>`),
    ...projectEntries.map((slug) => `<url><loc>${siteUrl}/projects/${slug}</loc></url>`),
    ...caseStudyEntries.map((slug) => `<url><loc>${siteUrl}/case-studies/${slug}</loc></url>`),
  ].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  await fs.writeFile(path.join(outputPublicDir, "sitemap.xml"), xml, "utf8");
}

async function buildRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`;
  await fs.writeFile(path.join(outputPublicDir, "robots.txt"), robots, "utf8");
}

const posts = await getBlogPosts();
await buildRss(posts);
await buildSitemap(posts);
await buildRobots();
