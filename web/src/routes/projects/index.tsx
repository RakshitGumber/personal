import { createFileRoute, Link } from "@tanstack/react-router";
import { Seo } from "@/components/seo/Seo";
import { projectPosts } from "@/lib/content";

export const Route = createFileRoute("/projects/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="space-y-8">
      <Seo title="Projects" description="Engineering projects with architecture notes, media, and lessons learned." path="/projects" />
      <header className="space-y-3 border-b border-line pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
        <p className="max-w-3xl text-muted">
          Long-running systems projects, experimental software, and field notes from building.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projectPosts.map((project) => (
          <article key={project.slug} className="card flex flex-col p-5 transition-transform duration-150 hover:-translate-y-0.5">
            <p className="font-mono text-xs text-muted">{project.date}</p>
            <h2 className="mt-3 text-xl font-semibold">{project.title}</h2>
            <p className="mt-3 text-sm text-muted">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span className="pill px-2 py-1" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <Link to="/projects/$slug" params={{ slug: project.slug }} className="mt-5 inline-block text-sm text-accent">
              Open project
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
