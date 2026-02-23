export type Blog = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
};

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

const stripWrappingQuotes = (value: string) => value.replace(/^['"]|['"]$/g, "");

const parseFrontmatter = (raw: string) => {
  const match = raw.match(FRONTMATTER_PATTERN);
  const frontmatter = match?.[1] ?? "";
  const content = raw.replace(FRONTMATTER_PATTERN, "").trim();
  const metadata = new Map<string, string>();

  frontmatter.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const [key, ...rest] = trimmed.split(":");
    const value = rest.join(":").trim();

    if (!key || !value) {
      return;
    }

    metadata.set(key.trim(), stripWrappingQuotes(value));
  });

  const tagsValue = metadata.get("tags");
  let tags: string[] = [];

  if (tagsValue?.startsWith("[") && tagsValue.endsWith("]")) {
    try {
      const parsed = JSON.parse(tagsValue);
      if (Array.isArray(parsed)) {
        tags = parsed.filter((tag): tag is string => typeof tag === "string");
      }
    } catch {
      tags = [];
    }
  }

  return {
    title: metadata.get("title") ?? "",
    date: metadata.get("date") ?? "",
    description: metadata.get("description") ?? "",
    tags,
    content,
  };
};

const modules = import.meta.glob("../../../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const markdownModules = modules as Record<string, string>;

export const blogs: Blog[] = Object.entries(markdownModules).map(([path, raw]) => {
  const slug = path.split("/").pop()?.replace(".md", "") ?? "";
  const parsed = parseFrontmatter(raw);

  return {
    slug,
    title: parsed.title || slug,
    date: parsed.date,
    description: parsed.description,
    tags: parsed.tags,
    content: parsed.content,
  };
});

export const sortedBlogs = [...blogs].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);
