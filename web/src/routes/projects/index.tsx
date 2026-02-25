// import { createFileRoute } from "@tanstack/react-router";
// import { useMemo, useState } from "react";
// import { ProjectCard } from "@/components/ui/ProjectCard";
// import { SearchBar } from "@/components/ui/SearchBar";
// import { Tag } from "@/components/ui/Tag";
// // import { Seo } from "@/components/seo/Seo";
// import { projectPosts } from "@/libs/content";
// // import { trackEvent } from "@/utils/analytics";

// export const Route = createFileRoute("/projects/")({
//   component: RouteComponent,
// });

// function RouteComponent() {
//   const [query, setQuery] = useState("");
//   const [language, setLanguage] = useState("all");
//   const [type, setType] = useState("all");
//   const [status, setStatus] = useState("all");
//   const [previewSlug, setPreviewSlug] = useState("");

//   const languages = useMemo(() => ["all", ...new Set(projectPosts.map((post) => post.language))], []);
//   const types = useMemo(() => ["all", ...new Set(projectPosts.map((post) => post.type))], []);
//   const statuses = useMemo(() => ["all", ...new Set(projectPosts.map((post) => post.status))], []);
//   const previewProject = projectPosts.find((project) => project.slug === previewSlug);

//   const filteredProjects = useMemo(
//     () =>
//       projectPosts.filter((project) => {
//         const matchesQuery =
//           !query ||
//           `${project.title} ${project.summary} ${project.stack.join(" ")}`
//             .toLowerCase()
//             .includes(query.toLowerCase());
//         const matchesLanguage = language === "all" || project.language === language;
//         const matchesType = type === "all" || project.type === type;
//         const matchesStatus = status === "all" || project.status === status;
//         return matchesQuery && matchesLanguage && matchesType && matchesStatus;
//       }),
//     [query, language, type, status],
//   );

//   return (
//     <main className="space-y-8">
//       {/* <Seo title="Projects" description="Engineering projects with architecture notes, media, and lessons learned." path="/projects" /> */}
//       <header className="space-y-3 border-b border-line pb-6">
//         <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
//         <p className="max-w-3xl text-muted">
//           Long-running systems projects, experimental software, and field notes from building.
//         </p>
//         <div className="space-y-3">
//           <SearchBar
//             label="Search projects"
//             value={query}
//             onChange={setQuery}
//             placeholder="Search projects..."
//             className="max-w-md"
//           />
//           <div className="flex flex-wrap gap-2">
//             {[
//               ["language", languages, language, setLanguage],
//               ["type", types, type, setType],
//               ["status", statuses, status, setStatus],
//             ].map(([label, values, active, setter]) => (
//               <div key={String(label)} className="flex flex-wrap items-center gap-2">
//                 {/* <p className="text-xs uppercase tracking-[0.12em] text-muted">{label}</p> */}
//                 {(values as string[]).map((value) => (
//                   <button
//                     key={value}
//                     type="button"
//                     onClick={() => (setter as (value: string) => void)(value)}
//                   >
//                     <Tag active={active === value}>{value}</Tag>
//                   </button>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </header>

//       <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//         {filteredProjects.map((project) => (
//           <ProjectCard
//             key={project.slug}
//             project={project}
//             onPreview={() => setPreviewSlug(project.slug)}
//             // onOpen={() => trackEvent("project_click", { slug: project.slug })}
//           />
//         ))}
//         {filteredProjects.length === 0 ? (
//           <article className="card p-5 text-muted">No projects matched your filters.</article>
//         ) : null}
//       </section>

//       {previewProject ? (
//         <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
//           <div className="card w-full max-w-xl p-6">
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h2 className="text-2xl font-semibold">{previewProject.title}</h2>
//                 <p className="mt-2 text-sm text-muted">{previewProject.summary}</p>
//               </div>
//               <button type="button" onClick={() => setPreviewSlug("")} className="text-sm text-muted">
//                 close
//               </button>
//             </div>
//             <p className="mt-4 text-sm text-muted">{previewProject.architecture}</p>
//             <div className="mt-4 flex gap-4 text-sm">
//               <a
//                 href={previewProject.demoLink}
//                 className="text-accent"
//                 rel="noopener noreferrer"
//                 target="_blank"
//               >
//                 demo
//               </a>
//               <a
//                 href={previewProject.sourceCodeLink}
//                 className="text-accent"
//                 rel="noopener noreferrer"
//                 target="_blank"
//               >
//                 source
//               </a>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </main>
//   );
// }
