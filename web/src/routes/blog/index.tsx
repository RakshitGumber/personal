import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Seo } from "@/components/seo/Seo";
import { blogPosts } from "@/lib/content";

export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTag, setActiveTag] = useState<string>("all");
  const [query, setQuery] = useState("");

  const tags = useMemo(() => {
    const mergedTags = new Set(blogPosts.flatMap((post) => post.tags));
    return ["all", ...Array.from(mergedTags)];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesTag = activeTag === "all" || post.tags.includes(activeTag);
      const matchesQuery =
        !query ||
        `${post.title} ${post.summary} ${post.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
      return matchesTag && matchesQuery;
    });
  }, [activeTag, query]);

  return (
    <main className="space-y-8">
      <Seo title="Blog" description="Technical blog posts covering systems, experiments, and implementation notes." path="/blog" />
      <header className="space-y-4 border-b border-line pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
        <p className="max-w-2xl text-muted">Long-form technical writing, deep dives, and developer notes.</p>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts..."
            className="w-full border border-line bg-surface px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-accent md:max-w-xs"
          />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`pill px-3 py-1 ${activeTag === tag ? "border-accent text-accent" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="space-y-4">
        {filteredPosts.map((blog) => (
          <article key={blog.slug} className="card p-5 transition-transform duration-150 hover:-translate-y-0.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <span>{blog.date}</span>
              <span>•</span>
              <span>{blog.minutes} min read</span>
              <span>•</span>
              <span>{blog.tags.join(", ")}</span>
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              <Link to="/blog/$slug" params={{ slug: blog.slug }} className="hover:text-accent">
                {blog.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted">{blog.summary}</p>
          </article>
        ))}
        {filteredPosts.length === 0 ? (
          <article className="card p-5 text-muted">No matching posts found.</article>
        ) : null}
      </section>
    </main>
  );
}
