import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "../../components/Navbar";
import { sortedBlogs } from "../../libs/getBlogs";

export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
});

function RouteComponent() {
  const topBlogs = sortedBlogs.slice(0, 10);

  return (
    <>
      <Navbar />
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 pb-12 pt-8">
        <header className="space-y-2">
          <h1 className="font-heading text-4xl text-heading">Blog</h1>
          <p className="text-secondary">Notes, experiments, and project learnings.</p>
        </header>

        <section className="space-y-4">
          {topBlogs.map((blog) => (
            <article
              key={blog.slug}
              className="rounded-xl border border-border bg-white/[0.02] p-6 transition hover:bg-white/[0.04]"
            >
              <h2 className="font-heading text-2xl text-heading">
                <Link to="/blog/$slug" params={{ slug: blog.slug }} className="underline-offset-4 hover:underline">
                  {blog.title}
                </Link>
              </h2>
              <p className="mt-2 text-secondary">{blog.description}</p>
              {blog.date ? <p className="mt-4 text-sm text-foreground">{blog.date}</p> : null}
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
