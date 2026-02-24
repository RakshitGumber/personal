import type { MouseEventHandler } from "react";
import { Link } from "@tanstack/react-router";
import type { ProjectPost } from "@/lib/content";
import { Tag } from "@/components/ui/Tag";

type ProjectCardProps = {
  project: ProjectPost;
  onPreview?: MouseEventHandler<HTMLButtonElement>;
  onOpen?: () => void;
};

export function ProjectCard({ project, onPreview, onOpen }: ProjectCardProps) {
  return (
    <article className="card flex flex-col p-5 transition-transform duration-150 hover:-translate-y-0.5">
      <p className="font-mono text-xs text-muted">{project.date}</p>
      <h2 className="mt-3 text-xl font-semibold">{project.title}</h2>
      <p className="mt-2 text-sm text-muted">{project.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted">
        <span>{project.language}</span>
        <span>•</span>
        <span>{project.type}</span>
        <span>•</span>
        <span>{project.status}</span>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Link to="/projects/$slug" params={{ slug: project.slug }} className="text-sm text-accent" onClick={onOpen}>
          Open project
        </Link>
        {onPreview ? (
          <button type="button" onClick={onPreview} className="text-sm text-muted hover:text-text">
            Quick preview
          </button>
        ) : null}
      </div>
    </article>
  );
}
