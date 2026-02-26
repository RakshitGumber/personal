import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white">
      <div className="flex h-24 items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="font-sans text-xl font-bold tracking-wider text-black">
          Rakshit Gumber
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex items-center gap-2">
            {/* {navItems.map((item) => {
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
            })} */}
          </nav>
        </div>

        <button
          className="rounded-sm border border-line px-2 py-1 text-xs text-muted md:hidden"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          menu
        </button>
      </div>

      {isOpen ? (
        <nav className="container-shell flex flex-col gap-2 border-t border-line py-3 md:hidden">
          {/* <Link
              key={item.to}
              to={item.to}
              className="rounded-sm px-2 py-1.5 text-sm text-muted hover:bg-surface-2 hover:text-text"
              onClick={() => setIsOpen(false)}
            >

            </Link> */}
        </nav>
      ) : null}
    </header>
  );
}
