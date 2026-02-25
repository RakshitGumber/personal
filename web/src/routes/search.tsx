// import { createFileRoute, Link } from "@tanstack/react-router";
// import { useMemo, useState } from "react";
// import { SearchBar } from "@/components/ui/SearchBar";
// import { blogPosts, projectPosts } from "@/libs/content";

// export const Route = createFileRoute("/search")({
//   component: RouteComponent,
// });

// function RouteComponent() {
//   const [query, setQuery] = useState("");

//   const blogResults = useMemo(
//     () =>
//       blogPosts.filter((entry) =>
//         `${entry.title} ${entry.summary} ${entry.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()),
//       ),
//     [query],
//   );

//   const projectResults = useMemo(
//     () =>
//       projectPosts.filter((entry) =>
//         `${entry.title} ${entry.summary} ${entry.stack.join(" ")}`
//           .toLowerCase()
//           .includes(query.toLowerCase()),
//       ),
//     [query],
//   );

//   return (
//     <main className="space-y-8">
//       <Seo title="Search" description="Search across blogs and projects." path="/search" />
//       <header className="space-y-3 border-b border-line pb-6">
//         <h1 className="text-4xl font-semibold tracking-tight">Search</h1>
//         <SearchBar
//           label="Search site"
//           value={query}
//           onChange={setQuery}
//           placeholder="Search blogs and projects..."
//           className="max-w-md"
//         />
//       </header>

//       <section className="grid gap-6 md:grid-cols-2">
//         <article className="space-y-3">
//           <h2 className="text-xl font-semibold">Blogs</h2>
//           {blogResults.map((entry) => (
//             <Link
//               key={entry.slug}
//               to="/blog/$slug"
//               params={{ slug: entry.slug }}
//               className="card block p-4 hover:text-accent"
//             >
//               {entry.title}
//             </Link>
//           ))}
//         </article>
//         <article className="space-y-3">
//           <h2 className="text-xl font-semibold">Projects</h2>
//           {projectResults.map((entry) => (
//             <Link
//               key={entry.slug}
//               to="/projects/$slug"
//               params={{ slug: entry.slug }}
//               className="card block p-4 hover:text-accent"
//             >
//               {entry.title}
//             </Link>
//           ))}
//         </article>
//       </section>
//     </main>
//   );
// }
