// import { createFileRoute } from "@tanstack/react-router";
// import { useMemo, useState } from "react";
// import { BlogCard } from "@/components/ui/BlogCard";
// import { Pagination } from "@/components/ui/Pagination";
// import { SearchBar } from "@/components/ui/SearchBar";
// import { Tag } from "@/components/ui/Tag";
// import { Seo } from "@/components/seo/Seo";
// import { blogPosts } from "@/lib/content";

// export const Route = createFileRoute("/blog/")({
//   component: RouteComponent,
// });

// function RouteComponent() {
//   const [activeTag, setActiveTag] = useState<string>("all");
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const perPage = 5;

//   const tags = useMemo(() => {
//     const mergedTags = new Set(blogPosts.flatMap((post) => post.tags));
//     return ["all", ...Array.from(mergedTags)];
//   }, []);

//   const pinnedPosts = useMemo(() => blogPosts.filter((post) => post.pinned), []);

//   const filteredPosts = useMemo(() => {
//     return blogPosts.filter((post) => {
//       const matchesTag = activeTag === "all" || post.tags.includes(activeTag);
//       const matchesQuery =
//         !query ||
//         `${post.title} ${post.summary} ${post.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
//       return matchesTag && matchesQuery;
//     });
//   }, [activeTag, query]);

//   const pageCount = Math.max(1, Math.ceil(filteredPosts.length / perPage));
//   const pagedPosts = filteredPosts.slice((page - 1) * perPage, page * perPage);

//   return (
//     <main className="space-y-8">
//       <Seo title="Blog" description="Technical blog posts covering systems, experiments, and implementation notes." path="/blog" />
//       <header className="space-y-4 border-b border-line pb-6">
//         <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
//         <p className="max-w-2xl text-muted">Long-form technical writing, deep dives, and developer notes.</p>
//         <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//           <SearchBar
//             label="Search posts"
//             value={query}
//             onChange={(value) => {
//               setPage(1);
//               setQuery(value);
//             }}
//             placeholder="Search posts..."
//             className="w-full md:max-w-xs"
//           />
//           <div className="flex flex-wrap gap-2">
//             {tags.map((tag) => (
//               <button
//                 key={tag}
//                 type="button"
//                 onClick={() => {
//                   setPage(1);
//                   setActiveTag(tag);
//                 }}
//               >
//                 <Tag active={activeTag === tag}>{tag}</Tag>
//               </button>
//             ))}
//           </div>
//         </div>
//       </header>

//       {pinnedPosts.length > 0 && activeTag === "all" && !query ? (
//         <section className="space-y-4">
//           <h2 className="text-xl font-semibold tracking-tight">Pinned Posts</h2>
//           <div className="grid gap-4 md:grid-cols-2">
//             {pinnedPosts.map((post) => (
//               <BlogCard key={post.slug} post={post} />
//             ))}
//           </div>
//         </section>
//       ) : null}

//       <section className="space-y-4">
//         {pagedPosts.map((blog) => (
//           <BlogCard key={blog.slug} post={blog} />
//         ))}
//         {filteredPosts.length === 0 ? (
//           <article className="card p-5 text-muted">No matching posts found.</article>
//         ) : null}
//         <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
//       </section>
//     </main>
//   );
// }
