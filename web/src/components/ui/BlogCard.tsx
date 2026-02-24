import { Link } from "@tanstack/react-router";
import type { BlogPost } from "@/lib/content";
import { Tag } from "@/components/ui/Tag";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="card p-5 transition-transform duration-150 hover:-translate-y-0.5">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
        <span>{post.date}</span>
        <span>•</span>
        <span>{post.minutes} min read</span>
      </div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-accent">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm text-muted">{post.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </article>
  );
}
