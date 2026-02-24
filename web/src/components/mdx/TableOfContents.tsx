type Heading = {
  id: string;
  text: string;
  level: number;
};

type TableOfContentsProps = {
  headings: Heading[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <aside className="card sticky top-20 p-4" aria-label="Table of contents">
      <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">Contents</h2>
      <ul className="mt-3 space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`text-sm text-muted hover:text-accent ${heading.level === 3 ? "pl-3" : ""}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split(/\r?\n/);
  const headings: Heading[] = [];

  for (const line of lines) {
    const match = /^(##|###)\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1] === "##" ? 2 : 3;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text, level });
  }

  return headings;
}
