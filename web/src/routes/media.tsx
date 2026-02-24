import { createFileRoute } from "@tanstack/react-router";
import { MediaEmbed } from "@/components/media/MediaEmbed";
import { Seo } from "@/components/seo/Seo";
import { mediaPosts } from "@/lib/content";

export const Route = createFileRoute("/media")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="space-y-8">
      <Seo title="Media" description="Development clips, recordings, and screenshot gallery from active software work." path="/media" />
      <header className="space-y-3 border-b border-line pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">Media</h1>
        <p className="max-w-2xl text-muted">Clips, recordings, and visuals from projects and experiments.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mediaPosts.map((item) => (
          <article key={item.slug} className="card overflow-hidden">
            <MediaEmbed type={item.type} src={item.src} alt={item.title} />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-1 text-sm text-muted">{item.description}</p>
              <p className="mt-3 font-mono text-xs text-muted">{item.date}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
