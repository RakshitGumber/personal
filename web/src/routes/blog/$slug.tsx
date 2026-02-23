import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { Navbar } from "../../components/Navbar";
import { sortedBlogs } from "../../libs/getBlogs";

export const Route = createFileRoute("/blog/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = useParams({ from: "/blog/$slug" });

  const blog = sortedBlogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <>
        <Navbar />
        <main className="mx-auto w-full max-w-3xl px-6 pb-12 pt-10">
          <h1 className="font-heading text-3xl text-heading">Post not found</h1>
          <p className="mt-2 text-secondary">The requested blog post does not exist.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-6 pb-12 pt-10">
        <article className="prose prose-invert max-w-none">
          <h1 className="font-heading text-4xl text-heading">{blog.title}</h1>
          {blog.date ? <p className="mb-6 text-sm text-foreground">{blog.date}</p> : null}
          <div className="text-secondary">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </article>
      </main>
    </>
  );
}
