import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import { Seo } from "@/components/seo/Seo";
import { caseStudyPosts } from "@/lib/content";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const post = caseStudyPosts.find((entry) => entry.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: RouteComponent,
  notFoundComponent: () => (
    <main className="card p-6">
      <h1 className="text-2xl font-semibold">Case study not found</h1>
      <Link to="/case-studies" className="mt-3 inline-block text-accent">
        Back to case studies
      </Link>
    </main>
  ),
});

function RouteComponent() {
  const post = Route.useLoaderData();
  const PostBody = post.component;

  return (
    <main className="mx-auto w-full max-w-4xl space-y-6">
      <Seo title={post.title} description={post.summary} path={`/case-studies/${post.slug}`} />
      <header className="border-b border-line pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-3 text-muted">{post.summary}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="card p-4">
          <h2 className="text-lg font-semibold">Problem</h2>
          <p className="mt-2 text-sm text-muted">{post.problem}</p>
        </article>
        <article className="card p-4">
          <h2 className="text-lg font-semibold">Approach</h2>
          <p className="mt-2 text-sm text-muted">{post.approach}</p>
        </article>
        <article className="card p-4">
          <h2 className="text-lg font-semibold">Architecture</h2>
          <p className="mt-2 text-sm text-muted">{post.architecture}</p>
        </article>
        <article className="card p-4">
          <h2 className="text-lg font-semibold">Tradeoffs</h2>
          <p className="mt-2 text-sm text-muted">{post.tradeoffs}</p>
        </article>
      </section>

      <section className="card p-5">
        <h2 className="text-lg font-semibold">Lessons Learned</h2>
        <p className="mt-2 text-sm text-muted">{post.lessonsLearned}</p>
      </section>

      <article className="prose-shell">
        <MDXProvider components={mdxComponents}>
          <PostBody />
        </MDXProvider>
      </article>
    </main>
  );
}
