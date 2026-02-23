import type { ComponentType } from "react";

type MdxModule = {
  default: ComponentType;
};

type RawModuleValue = string | { default?: unknown } | unknown;

type Frontmatter = Record<string, unknown>;

type BaseContent = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
};

export type BlogPost = BaseContent & {
  component: ComponentType;
  minutes: number;
};

export type ProjectPost = BaseContent & {
  stack: string[];
  github: string;
  lessons: string[];
  content: string;
};

export type ThoughtPost = {
  slug: string;
  date: string;
  text: string;
  links: string[];
  media?: string;
};

export type MediaPost = {
  slug: string;
  title: string;
  date: string;
  type: "image" | "video";
  src: string;
  description: string;
};

export type LabPost = {
  slug: string;
  title: string;
  date: string;
  status: string;
  update: string;
  asset?: string;
};

const getSlug = (filePath: string) => filePath.split("/").at(-1)?.replace(".mdx", "") ?? "";
const byDateDesc = (a: { date: string }, b: { date: string }) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parseYamlValue(value: string): unknown {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function normalizeRaw(raw: RawModuleValue): string {
  if (typeof raw === "string") return raw;
  if (raw && typeof raw === "object" && "default" in (raw as Record<string, unknown>)) {
    const value = (raw as { default?: unknown }).default;
    if (typeof value === "string") return value;
  }
  return "";
}

function parseFrontmatter(rawInput: RawModuleValue): { data: Frontmatter; content: string } {
  const raw = normalizeRaw(rawInput);
  const match = raw.match(FRONTMATTER_PATTERN);
  if (!match) {
    return { data: {}, content: raw.trim() };
  }

  const body = raw.replace(FRONTMATTER_PATTERN, "").trim();
  const lines = match[1].split(/\r?\n/);
  const data: Frontmatter = {};
  let currentArrayKey = "";

  for (const line of lines) {
    if (!line.trim()) continue;
    const isArrayItem = line.trimStart().startsWith("- ");
    if (isArrayItem && currentArrayKey) {
      const existing = data[currentArrayKey];
      if (Array.isArray(existing)) {
        existing.push(String(parseYamlValue(line.trim().slice(2))));
      } else {
        data[currentArrayKey] = [String(parseYamlValue(line.trim().slice(2)))];
      }
      continue;
    }

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();

    if (!rawValue) {
      currentArrayKey = key;
      data[key] = [];
      continue;
    }

    currentArrayKey = "";
    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      const inner = rawValue.slice(1, -1).trim();
      if (!inner) {
        data[key] = [];
        continue;
      }
      data[key] = inner.split(",").map((item) => String(parseYamlValue(item)));
      continue;
    }

    data[key] = parseYamlValue(rawValue);
  }

  return { data, content: body };
}

function estimateReadingMinutes(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function safeString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function safeArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

const blogRawModules = import.meta.glob("../../content/blog/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, RawModuleValue>;

const blogComponentModules = import.meta.glob("../../content/blog/*.mdx", {
  eager: true,
}) as Record<string, MdxModule>;

export const blogPosts: BlogPost[] = Object.entries(blogRawModules)
  .map(([filePath, raw]) => {
    const slug = getSlug(filePath);
    const component = blogComponentModules[filePath]?.default;
    const { data, content } = parseFrontmatter(raw);
    if (!component) return null;

    return {
      slug,
      title: safeString(data.title, slug),
      date: safeString(data.date, ""),
      summary: safeString(data.description, ""),
      tags: safeArray(data.tags),
      component,
      minutes: estimateReadingMinutes(content),
    };
  })
  .filter((post): post is BlogPost => Boolean(post))
  .sort(byDateDesc);

const projectRawModules = import.meta.glob("../../content/projects/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, RawModuleValue>;

export const projectPosts: ProjectPost[] = Object.entries(projectRawModules)
  .map(([filePath, raw]) => {
    const slug = getSlug(filePath);
    const { data, content } = parseFrontmatter(raw);

    return {
      slug,
      title: safeString(data.title, slug),
      date: safeString(data.date, ""),
      summary: safeString(data.description, ""),
      tags: safeArray(data.tags),
      stack: safeArray(data.stack),
      github: safeString(data.github, "#"),
      lessons: safeArray(data.lessons),
      content,
    };
  })
  .sort(byDateDesc);

const thoughtsRawModules = import.meta.glob("../../content/thoughts/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, RawModuleValue>;

export const thoughtPosts: ThoughtPost[] = Object.entries(thoughtsRawModules)
  .map(([filePath, raw]) => {
    const slug = getSlug(filePath);
    const { data } = parseFrontmatter(raw);
    return {
      slug,
      date: safeString(data.date, ""),
      text: safeString(data.text, ""),
      links: safeArray(data.links),
      media: safeString(data.media, ""),
    };
  })
  .sort(byDateDesc);

const mediaRawModules = import.meta.glob("../../content/media/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, RawModuleValue>;

export const mediaPosts: MediaPost[] = Object.entries(mediaRawModules)
  .map(([filePath, raw]) => {
    const slug = getSlug(filePath);
    const { data } = parseFrontmatter(raw);
    return {
      slug,
      title: safeString(data.title, slug),
      date: safeString(data.date, ""),
      type: safeString(data.type, "image") as "image" | "video",
      src: safeString(data.src, ""),
      description: safeString(data.description, ""),
    };
  })
  .sort(byDateDesc);

const labRawModules = import.meta.glob("../../content/lab/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, RawModuleValue>;

export const labPosts: LabPost[] = Object.entries(labRawModules)
  .map(([filePath, raw]) => {
    const slug = getSlug(filePath);
    const { data } = parseFrontmatter(raw);
    return {
      slug,
      title: safeString(data.title, slug),
      date: safeString(data.date, ""),
      status: safeString(data.status, "active"),
      update: safeString(data.update, ""),
      asset: safeString(data.asset, ""),
    };
  })
  .sort(byDateDesc);
