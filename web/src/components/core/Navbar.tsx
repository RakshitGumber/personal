import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="z-40 w-full bg-background">
      <div className="flex h-24 items-center justify-between max-w-7xl mx-auto px-6">
        <Link to="/" className="px-4 pt-3 pb-1 active:bg-slate-400/30 rounded-md">
          <h1 className="font-arvo text-xl font-semibold tracking-widest">Rakshit Gumber</h1>
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          {/* <nav className="flex items-center gap-2">
            <Link to="/blog" className="rounded-sm px-3 py-1.5 text-sm transition bg-surface-2 text-accent">
              Blogs
            </Link>
          </nav> */}
        </div>
        {/* 
        <button
          className="rounded-sm border border-line px-2 py-1 text-xs text-muted md:hidden"
          onClick={() => setIsOpen((value) => !value)}
        >
          menu
        </button> */}
      </div>

      {isOpen ? (
        <nav className="flex flex-col gap-2 border-t border-line py-3 md:hidden">
          {/* <Link
              key={item.to}
              to={item.to}
              className="rounded-sm px-2 py-1.5 text-sm text-muted hover:bg-surface-2 hover:text-text"
              onClick={() => setIsOpen(false)}
            >

            </Link> */}
        </nav>
      ) : null}
      <hr className="border-line w-3/5 mx-auto" />
    </header>
  );
}
