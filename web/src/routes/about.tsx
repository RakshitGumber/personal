import { createFileRoute } from "@tanstack/react-router";
import { Seo } from "@/components/seo/Seo";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-8">
      <Seo title="About" description="Personal story, software philosophy, and current areas of exploration." path="/about" />
      <header className="space-y-3 border-b border-line pb-6">
        <h1 className="text-4xl font-semibold tracking-tight">About</h1>
        <p className="text-muted">Engineer, writer, and experimental builder focused on systems and developer tooling.</p>
      </header>

      <section className="card space-y-4 p-6">
        <h2 className="text-xl font-semibold">Personal Story</h2>
        <p className="text-muted">
          I build software by writing, observing, and iterating in public. I document architecture choices, dead ends,
          and implementation details while shipping real systems.
        </p>
      </section>

      <section className="card space-y-4 p-6">
        <h2 className="text-xl font-semibold">Software Philosophy</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted">
          <li>Favor simple primitives over layered abstraction.</li>
          <li>Measure before optimizing and write down findings.</li>
          <li>Build tools that make future experiments easier.</li>
        </ul>
      </section>

      <section className="card space-y-4 p-6">
        <h2 className="text-xl font-semibold">Current Exploration Areas</h2>
        <p className="text-muted">
          Memory layouts, concurrency behavior, log-structured data systems, and command-driven interfaces for
          developer workflows.
        </p>
      </section>

      <section className="card space-y-4 p-6">
        <h2 className="text-xl font-semibold">Skills</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted">
          <li>Low-level systems engineering in C and Rust</li>
          <li>Performance profiling, tracing, and instrumentation</li>
          <li>Developer tooling and interface design</li>
        </ul>
      </section>

      <section className="card space-y-4 p-6">
        <h2 className="text-xl font-semibold">Contact</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="https://github.com" className="text-accent" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://x.com" className="text-accent" target="_blank" rel="noopener noreferrer">
            X / Twitter
          </a>
          <a href="mailto:hello@example.com" className="text-accent">
            Email
          </a>
        </div>
      </section>
    </main>
  );
}
