import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import { extractHeadings, TableOfContents } from "@/components/mdx/TableOfContents";
import { usePrismHighlight } from "@/components/mdx/usePrismHighlight";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Seo } from "@/components/seo/Seo";
import { blogPosts } from "@/lib/content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((entry) => entry.slug === params.slug);
    if (!post) {
      throw notFound();
    }
    return post;
  },
  component: RouteComponent,
  notFoundComponent: () => (
    <main className="card p-8">
      <h1 className="text-3xl font-semibold">Post not found</h1>
      <p className="mt-3 text-muted">The article you requested does not exist.</p>
      <Link to="/blog" className="mt-4 inline-block text-accent">
        Back to blog
      </Link>
    </main>
  ),
});

function RouteComponent() {
  const post = Route.useLoaderData();
  const PostBody = post.component;
  const progress = useScrollProgress();
  const headings = extractHeadings(post.content);
  const relatedPosts = blogPosts
    .filter((entry) => entry.slug !== post.slug)
    .filter((entry) => entry.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);
  usePrismHighlight(post.slug);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6">
      <div aria-hidden className="fixed left-0 top-16 z-50 h-0.5 bg-accent" style={{ width: `${progress}%` }} />
      <Seo
        title={post.title}
        description={post.summary}
        path={`/blog/${post.slug}`}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.summary,
          datePublished: post.date,
          author: { "@type": "Person", name: "Rakshit Gumber" },
        }}
      />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="space-y-6">
          <header className="border-b border-line pb-6">
            <p className="font-mono text-xs tracking-[0.2em] text-accent">{post.tags.join(" / ")}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{post.title}</h1>
            <p className="mt-3 text-muted">{post.summary}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.minutes} min read</span>
            </div>
          </header>

          <article className="prose-shell pb-16">
            <MDXProvider components={mdxComponents}>
              <PostBody />
            </MDXProvider>
          </article>

          {relatedPosts.length > 0 ? (
            <section className="space-y-3 border-t border-line pt-6">
              <h2 className="text-xl font-semibold">Related Posts</h2>
              <ul className="space-y-2">
                {relatedPosts.map((entry) => (
                  <li key={entry.slug}>
                    <Link to="/blog/$slug" params={{ slug: entry.slug }} className="text-accent">
                      {entry.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        <TableOfContents headings={headings} />
      </div>
    </main>
  );
}
