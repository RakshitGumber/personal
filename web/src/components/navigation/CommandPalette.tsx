import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

type CommandItem = {
  id: string;
  label: string;
  action: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      if (event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const items = useMemo<CommandItem[]>(
    () => [
      { id: "home", label: "Go to Home", action: () => navigate({ to: "/" }) },
      { id: "blog", label: "Go to Blog", action: () => navigate({ to: "/blog" }) },
      { id: "projects", label: "Go to Projects", action: () => navigate({ to: "/projects" }) },
      { id: "lab", label: "Go to Lab", action: () => navigate({ to: "/lab" }) },
      { id: "media", label: "Go to Media", action: () => navigate({ to: "/media" }) },
      { id: "thoughts", label: "Go to Thoughts", action: () => navigate({ to: "/thoughts" }) },
      { id: "about", label: "Go to About", action: () => navigate({ to: "/about" }) },
      { id: "rss", label: "Open RSS Feed", action: () => window.open("/rss.xml", "_blank") },
    ],
    [navigate],
  );

  const filteredItems = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-start bg-black/70 px-4 pt-[12vh] md:pt-[16vh]">
      <div className="w-full max-w-xl border border-line bg-surface">
        <div className="border-b border-line p-3">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full border border-line bg-bg px-3 py-2 text-sm text-text outline-none placeholder:text-muted focus:border-accent"
            placeholder="type a command..."
          />
        </div>
        <ul className="max-h-72 overflow-auto p-2 custom-scrollbar">
          {filteredItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  item.action();
                  setOpen(false);
                  setQuery("");
                }}
                className="w-full px-3 py-2 text-left text-sm text-muted transition hover:bg-surface-2 hover:text-text"
              >
                {item.label}
              </button>
            </li>
          ))}
          {filteredItems.length === 0 ? (
            <li className="px-3 py-2 text-sm text-muted">No commands found.</li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
