import { useState } from "react";
import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="w-full border-b border-border/60 bg-background/95">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="rounded-md px-3 py-2 text-xl font-bold text-heading transition hover:bg-white/10 sm:text-2xl"
        >
          Rakshit Gumber
        </Link>

        <button
          type="button"
          className="rounded-md border border-border px-3 py-2 text-sm text-heading transition hover:bg-white/10 md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          Menu
        </button>

        <nav className="hidden items-center gap-4 md:flex">
          <Link
            to="/blog"
            className="rounded-md px-4 py-2 text-base font-medium text-heading transition hover:bg-white/10"
          >
            Blog
          </Link>
        </nav>
      </div>

      {isOpen ? (
        <nav className="mx-auto flex w-full max-w-6xl flex-col gap-2 border-t border-border/60 px-4 py-3 sm:px-6 md:hidden">
          <Link
            to="/blog"
            onClick={closeMenu}
            className="rounded-md px-3 py-2 text-base font-medium text-heading transition hover:bg-white/10"
          >
            Blog
          </Link>
        </nav>
      ) : null}
    </header>
  );
};
