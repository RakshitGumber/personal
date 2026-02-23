import { createFileRoute } from "@tanstack/react-router";
import { Seo } from "@/components/seo/Seo";
import { thoughtPosts } from "@/lib/content";

export const Route = createFileRoute("/thoughts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="space-y-8">
      <Seo title="Thoughts" description="Short-form engineering notes, links, and in-progress observations." path="/thoughts" />
      <header className="space-y-3 border-b border-line pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">Thoughts</h1>
        <p className="max-w-2xl text-muted">Chronological feed of short posts, links, and quick ideas.</p>
      </header>

      <section className="space-y-3">
        {thoughtPosts.map((entry) => (
          <article key={entry.slug} className="card p-5">
            <p className="text-sm text-[#d4d4d4]">{entry.text}</p>
            {entry.links.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-3">
                {entry.links.map((link) => (
                  <a key={link} href={link} className="text-xs text-accent">
                    {link}
                  </a>
                ))}
              </div>
            ) : null}
            {entry.media ? <img src={entry.media} alt="thought media" className="mt-4 max-h-80 w-full border border-line object-cover" /> : null}
            <p className="mt-4 font-mono text-xs text-muted">{entry.date}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
