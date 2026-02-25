// import { createFileRoute } from "@tanstack/react-router";
// import { Seo } from "@/components/seo/Seo";
// import { nowPosts } from "@/lib/content";

// export const Route = createFileRoute("/now")({
//   component: RouteComponent,
// });

// function RouteComponent() {
//   const latest = nowPosts[0];

//   if (!latest) {
//     return (
//       <main className="card p-6">
//         <Seo title="Now" description="Current work, learning focus, and books." path="/now" />
//         <h1 className="text-3xl font-semibold">Now</h1>
//         <p className="mt-2 text-muted">No updates available yet.</p>
//       </main>
//     );
//   }

//   return (
//     <main className="mx-auto w-full max-w-4xl space-y-6">
//       <Seo title="Now" description={latest.summary} path="/now" />
//       <header className="border-b border-line pb-6">
//         <h1 className="text-4xl font-semibold tracking-tight">Now</h1>
//         <p className="mt-3 text-muted">{latest.summary}</p>
//         <p className="mt-3 font-mono text-xs text-muted">Updated {latest.date}</p>
//       </header>

//       <section className="grid gap-4 md:grid-cols-3">
//         <article className="card p-5">
//           <h2 className="text-lg font-semibold">Current Projects</h2>
//           <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
//             {latest.currentProjects.map((item) => (
//               <li key={item}>{item}</li>
//             ))}
//           </ul>
//         </article>
//         <article className="card p-5">
//           <h2 className="text-lg font-semibold">Current Learning</h2>
//           <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
//             {latest.learningFocus.map((item) => (
//               <li key={item}>{item}</li>
//             ))}
//           </ul>
//         </article>
//         <article className="card p-5">
//           <h2 className="text-lg font-semibold">Books / Ideas</h2>
//           <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
//             {latest.booksIdeas.map((item) => (
//               <li key={item}>{item}</li>
//             ))}
//           </ul>
//         </article>
//       </section>
//     </main>
//   );
// }
