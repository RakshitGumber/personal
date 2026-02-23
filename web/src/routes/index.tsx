import { createFileRoute } from "@tanstack/react-router";
import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Seo } from "@/components/seo/Seo";
import { blogPosts, mediaPosts, projectPosts, thoughtPosts } from "@/lib/content";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const featuredProjects = projectPosts.slice(0, 3);
  const latestBlogs = blogPosts.slice(0, 3);
  const latestThoughts = thoughtPosts.slice(0, 4);
  const latestMedia = mediaPosts.slice(0, 4);

  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current) return;
    animate(heroRef.current, { opacity: [0.2, 1], transform: ["translateY(12px)", "translateY(0px)"] }, { duration: 0.28 });
  }, [prefersReducedMotion]);

  return (
    <div className="space-y-20">
      <Seo title="Home" description="Personal workshop for software experiments, deep writing, and dev media." path="/" />

      <section id="top" ref={heroRef} className="space-y-8 border-b border-line pb-12">
        <p className="font-mono text-xs tracking-[0.22em] text-accent">
          SOFTWARE ENGINEER // LAB NOTEBOOK
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Building low-level systems, documenting the process, and shipping experiments in public.
        </h1>
        <p className="max-w-2xl text-base text-muted md:text-lg">
          I write technical blogs, share implementation notes, and publish development clips while exploring systems,
          performance, and tooling design.
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-muted">
          <a href="#featured-projects" className="border border-line px-3 py-2 hover:border-accent hover:text-text">
            featured projects
          </a>
          <a href="#latest-posts" className="border border-line px-3 py-2 hover:border-accent hover:text-text">
            latest blogs
          </a>
          <a href="#recent-thoughts" className="border border-line px-3 py-2 hover:border-accent hover:text-text">
            recent thoughts
          </a>
        </div>
      </section>

      <section id="featured-projects" className="space-y-6">
        <header className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Featured Projects</h2>
          <a href="/projects" className="text-sm text-accent">
            view all
          </a>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.slug}
              className={`card p-5 ${prefersReducedMotion ? "" : "transition-transform duration-150 hover:-translate-y-1"}`}
            >
              <p className="mb-3 font-mono text-xs text-muted">{project.date}</p>
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="mt-3 text-sm text-muted">{project.summary}</p>
              <a className="mt-4 inline-block text-sm text-accent" href={`/projects/${project.slug}`}>
                open notes
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="latest-posts" className="space-y-6">
        <header className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Latest Blog Posts</h2>
          <a href="/blog" className="text-sm text-accent">
            read all
          </a>
        </header>
        <div className="space-y-3">
          {latestBlogs.map((blog) => (
            <article key={blog.slug} className="card flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="mt-1 text-sm text-muted">{blog.summary}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted">
                <span>{blog.minutes} min read</span>
                <span>{blog.date}</span>
                <a className="text-accent" href={`/blog/${blog.slug}`}>
                  open
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="recent-thoughts" className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <header className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Recent Thoughts</h2>
            <a href="/thoughts" className="text-sm text-accent">
              full feed
            </a>
          </header>
          <div className="space-y-3">
            {latestThoughts.map((thought) => (
              <article key={thought.slug} className="card p-4">
                <p className="text-sm text-[#d9d9d9]">{thought.text}</p>
                <p className="mt-3 font-mono text-xs text-muted">{thought.date}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <header className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Recent Clips & Images</h2>
            <a href="/media" className="text-sm text-accent">
              gallery
            </a>
          </header>
          <div className="grid grid-cols-2 gap-3">
            {latestMedia.map((item) => (
              <article key={item.slug} className="card overflow-hidden">
                {item.type === "video" ? (
                  <video src={item.src} controls className="aspect-video w-full object-cover" preload="metadata" />
                ) : (
                  <img src={item.src} alt={item.title} className="aspect-video w-full object-cover" loading="lazy" />
                )}
                <div className="p-3">
                  <p className="text-sm">{item.title}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{item.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line pt-8">
        <p className="text-sm text-muted">
          Find me on{" "}
          <a href="https://github.com" className="text-accent">
            GitHub
          </a>
          ,{" "}
          <a href="https://twitter.com" className="text-accent">
            Twitter
          </a>
          , and{" "}
          <a href="https://youtube.com" className="text-accent">
            YouTube
          </a>
          .
        </p>
      </section>
    </div>
  );
}
