import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ImageGallery } from "@/components/media/ImageGallery";
import { MediaEmbed } from "@/components/media/MediaEmbed";
import { Tag } from "@/components/ui/Tag";
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
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href={project.demoLink} className="text-accent" target="_blank" rel="noopener noreferrer">
            Live demo
          </a>
          <a href={project.sourceCodeLink} className="text-accent" target="_blank" rel="noopener noreferrer">
            Source code
          </a>
        </div>
      </header>

      <section className="card p-5">
        <h2 className="text-lg font-semibold">Architecture</h2>
        <p className="mt-3 text-sm text-muted">{project.architecture || "Architecture notes will be expanded soon."}</p>
      </section>

      <section className="card p-5">
        <h2 className="text-lg font-semibold">Development Notes</h2>
        <article className="prose-shell mt-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            skipHtml
            components={{
              a: (props) => (
                <a {...props} className="text-accent" target="_blank" rel="noopener noreferrer">
                  {props.children}
                </a>
              ),
            }}
          >
            {project.content}
          </ReactMarkdown>
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

      <section className="card space-y-4 p-5">
        <h2 className="text-lg font-semibold">Project Timeline</h2>
        <ol className="space-y-2 text-sm text-muted">
          <li>Started: {project.date}</li>
          <li>Current status: {project.status}</li>
          <li>Category: {project.type}</li>
        </ol>
      </section>

      {project.media.length > 0 ? (
        <section className="card space-y-4 p-5">
          <h2 className="text-lg font-semibold">Screenshots & Demo Media</h2>
          <MediaEmbed type="image" src={project.media[0]} alt={project.title} />
          <ImageGallery images={project.media.slice(1)} title={project.title} />
        </section>
      ) : null}
    </main>
  );
}
