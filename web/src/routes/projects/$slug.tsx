import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Seo } from "@/components/seo/Seo";
import { projectPosts } from "@/lib/content";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projectPosts.find((entry) => entry.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  component: RouteComponent,
  notFoundComponent: () => (
    <main className="card p-8">
      <h1 className="text-2xl font-semibold">Project not found</h1>
      <Link to="/projects" className="mt-3 inline-block text-accent">
        Back to projects
      </Link>
    </main>
  ),
});

function RouteComponent() {
  const project = Route.useLoaderData();

  return (
    <main className="mx-auto w-full max-w-4xl space-y-8">
      <Seo title={project.title} description={project.summary} path={`/projects/${project.slug}`} />
      <header className="space-y-4 border-b border-line pb-6">
        <p className="font-mono text-xs text-muted">{project.date}</p>
        <h1 className="text-4xl font-semibold tracking-tight">{project.title}</h1>
        <p className="text-muted">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="pill px-2 py-1">
              {item}
            </span>
          ))}
        </div>
        <a href={project.github} className="inline-block text-sm text-accent">
          GitHub repository
        </a>
      </header>

      <section className="card p-5">
        <h2 className="text-lg font-semibold">Development Notes</h2>
        <article className="prose-shell mt-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
        </article>
      </section>

      <section className="card p-5">
        <h2 className="text-lg font-semibold">Lessons Learned</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-muted">
          {project.lessons.map((lesson) => (
            <li key={lesson}>{lesson}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
