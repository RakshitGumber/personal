import { createFileRoute } from "@tanstack/react-router";
import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { MediaEmbed } from "@/components/media/MediaEmbed";
// import { Seo } from "@/components/seo/Seo";
import { BlogCard } from "@/components/ui/BlogCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ThoughtCard } from "@/components/ui/ThoughtCard";
import { blogPosts, mediaPosts, nowPosts, projectPosts, thoughtPosts } from "@/libs/content";

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
  const currentNow = nowPosts[0];

  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current) return;
    animate(
      heroRef.current,
      { opacity: [0.2, 1], transform: ["translateY(12px)", "translateY(0px)"] },
      { duration: 0.28 },
    );
  }, [prefersReducedMotion]);

  return (
    <div className="space-y-20">
      {/* <Seo
        title="Home"
        description="Personal workshop for software experiments, deep writing, and dev media."
        path="/"
      /> */}

      {/* <section id="top" ref={heroRef} className="space-y-8 border-b border-line pb-12"> */}
      {/* <p className="font-mono text-xs tracking-[0.22em] text-accent">SOFTWARE ENGINEER // LAB NOTEBOOK</p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Building low-level systems, documenting the process, and shipping experiments in public.
        </h1> */}
      {/* <p className="max-w-2xl text-base text-muted md:text-lg">
          I write technical blogs, share implementation notes, and publish development clips while exploring
          systems, performance, and tooling design.
        </p> */}
      {/* {currentNow ? (
          <p className="text-sm text-muted">Current focus: {currentNow.currentProjects[0]}</p>
        ) : null}
        <div className="flex flex-wrap gap-3 text-sm text-muted">
          <a
            href="#featured-projects"
            className="border border-line px-3 py-2 hover:border-accent hover:text-text"
          >
            featured projects
          </a>
          <a
            href="#latest-posts"
            className="border border-line px-3 py-2 hover:border-accent hover:text-text"
          >
            latest blogs
          </a>
          <a
            href="#recent-thoughts"
            className="border border-line px-3 py-2 hover:border-accent hover:text-text"
          >
            recent thoughts
          </a>
        </div> */}
      {/* </section> */}

      {/* <section id="featured-projects" className="space-y-6"> */}
      {/* <header className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Featured Projects</h2>
          <a href="/projects" className="text-sm text-accent">
            view all
          </a>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
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
            <BlogCard key={blog.slug} post={blog} />
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
                <ThoughtCard thought={thought} />
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
                <MediaEmbed type={item.type} src={item.src} alt={item.title} />
                <div className="p-3">
                  <p className="text-sm">{item.title}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{item.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div> */}
      {/* </section>

      <section className="border-t border-line pt-8"> */}
      {/* <p className="text-sm text-muted">
          Find me on{" "}
          <a href="https://github.com" className="text-accent" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          ,{" "}
          <a href="https://twitter.com" className="text-accent" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          , and{" "}
          <a href="https://youtube.com" className="text-accent" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          .
        </p> */}
      {/* </section> */}
    </div>
  );
}
