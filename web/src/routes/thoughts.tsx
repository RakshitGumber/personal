import { createFileRoute } from "@tanstack/react-router";
import { ThoughtCard } from "@/components/ui/ThoughtCard";
import { thoughtPosts } from "@/libs/content";

export const Route = createFileRoute("/thoughts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="space-y-8">
      <header className="space-y-3 border-b border-line pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">Thoughts</h1>
        <p className="max-w-2xl text-muted">Chronological feed of short posts, links, and quick ideas.</p>
      </header>

      <section className="space-y-3">
        {thoughtPosts.map((entry) => (
          <article key={entry.slug} className="card p-5">
            <ThoughtCard thought={entry} />
            {entry.links.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-3">
                {entry.links.map((link) => (
                  <a
                    key={link}
                    href={link}
                    className="text-xs text-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ) : null}
            {entry.media ? (
              <img
                src={entry.media}
                alt={`Media for thought posted on ${entry.date}`}
                loading="lazy"
                decoding="async"
                className="mt-4 max-h-80 w-full border border-line object-cover"
              />
            ) : null}
          </article>
        ))}
      </section>
    </main>
  );
}
