import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import { usePrismHighlight } from "@/components/mdx/usePrismHighlight";
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
  usePrismHighlight(post.slug);

  return (
    <main className="mx-auto w-full max-w-4xl space-y-6">
      <Seo title={post.title} description={post.summary} path={`/blog/${post.slug}`} />
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
    </main>
  );
}
