// import { createFileRoute, Link } from "@tanstack/react-router";
// import { Seo } from "@/components/seo/Seo";
// import { Tag } from "@/components/ui/Tag";
// import { caseStudyPosts } from "@/lib/content";

// export const Route = createFileRoute("/case-studies/")({
//   component: RouteComponent,
// });

// function RouteComponent() {
//   return (
//     <main className="space-y-8">
//       <Seo
//         title="Case Studies"
//         description="Long-form engineering breakdowns with architecture decisions and tradeoffs."
//         path="/case-studies"
//       />
//       <header className="space-y-3 border-b border-line pb-6">
//         <h1 className="text-4xl font-semibold tracking-tight">Case Studies</h1>
//         <p className="max-w-3xl text-muted">Long-form engineering narratives: problem, approach, architecture, tradeoffs, and lessons.</p>
//       </header>

//       <section className="space-y-4">
//         {caseStudyPosts.map((study) => (
//           <article key={study.slug} className="card p-5">
//             <p className="font-mono text-xs text-muted">{study.date}</p>
//             <h2 className="mt-2 text-2xl font-semibold">
//               <Link to="/case-studies/$slug" params={{ slug: study.slug }} className="hover:text-accent">
//                 {study.title}
//               </Link>
//             </h2>
//             <p className="mt-2 text-sm text-muted">{study.summary}</p>
//             <div className="mt-3 flex flex-wrap gap-2">
//               {study.tags.map((tag) => (
//                 <Tag key={tag}>{tag}</Tag>
//               ))}
//             </div>
//           </article>
//         ))}
//       </section>
//     </main>
//   );
// }
