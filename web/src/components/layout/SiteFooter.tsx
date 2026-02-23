export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="container-shell flex flex-col gap-2 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>Built with React, Vite, TypeScript, Tailwind, and MDX.</p>
        <p className="font-mono">Press K for command palette.</p>
      </div>
    </footer>
  );
}
