// import { createFileRoute } from "@tanstack/react-router";
// import { Seo } from "@/components/seo/Seo";
// import { labPosts } from "@/lib/content";

// export const Route = createFileRoute("/lab")({
//   component: RouteComponent,
// });

// function RouteComponent() {
//   return (
//     <main className="space-y-8">
//       <Seo title="Lab" description="A living feed of active experiments, dev logs, screenshots, and quick prototypes." path="/lab" />
//       <header className="space-y-3 border-b border-line pb-6">
//         <h1 className="text-4xl font-semibold tracking-tight">Lab / Experiments</h1>
//         <p className="max-w-2xl text-muted">Raw progress logs of what is being built right now.</p>
//       </header>

//       <section className="space-y-3">
//         {labPosts.map((entry) => (
//           <article key={entry.slug} className="card p-5 transition-transform duration-150 hover:-translate-y-0.5">
//             <div className="flex flex-wrap items-center gap-2 text-xs">
//               <span className="font-mono text-muted">{entry.date}</span>
//               <span className="pill px-2 py-1">{entry.status}</span>
//             </div>
//             <h2 className="mt-3 text-xl font-semibold">{entry.title}</h2>
//             <p className="mt-2 text-sm text-muted">{entry.update}</p>
//             {entry.asset ? (
//               <img src={entry.asset} alt={entry.title} className="mt-4 aspect-video w-full border border-line object-cover" />
//             ) : null}
//           </article>
//         ))}
//       </section>
//     </main>
//   );
// }
