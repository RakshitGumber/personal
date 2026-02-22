import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <header className="flex h-24 w-full items-center justify-between px-27.5">
      <Link
        to="/"
        className="rounded-md px-4 py-2 text-2xl font-bold text-heading transition hover:bg-white/10"
      >
        Rakshit Gumber
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          to="/blog"
          className="rounded-md px-4 py-2 text-lg font-medium transition hover:bg-white/10"
        >
          Blog
        </Link>
        {/* <Link
          to="/project"
          className="rounded-md px-4 py-2 text-lg font-medium transition hover:bg-white/10"
        >
          Projects
        </Link> */}
      </nav>
    </header>
  );
};
