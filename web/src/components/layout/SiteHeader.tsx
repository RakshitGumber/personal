import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

const navItems = [
  { to: "/", label: "home" },
  { to: "/blog", label: "blog" },
  { to: "/projects", label: "projects" },
  { to: "/lab", label: "lab" },
  { to: "/media", label: "media" },
  { to: "/thoughts", label: "thoughts" },
  { to: "/about", label: "about" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link to="/" className="font-mono text-sm tracking-wider text-text">
          rakshit.gumber
        </Link>

        <button
          className="rounded-sm border border-line px-2 py-1 text-xs text-muted md:hidden"
          type="button"
          aria-label="toggle menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          menu
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-sm px-3 py-1.5 text-sm transition ${
                  isActive ? "bg-surface-2 text-accent" : "text-muted hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {isOpen ? (
        <nav className="container-shell flex flex-col gap-2 border-t border-line py-3 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-sm px-2 py-1.5 text-sm text-muted hover:bg-surface-2 hover:text-text"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
