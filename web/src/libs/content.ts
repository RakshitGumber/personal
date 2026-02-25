import type { ComponentType } from "react";

type RawModuleValue = string | { default?: unknown } | unknown;
type MdxModule = { default: ComponentType };
type Frontmatter = Record<string, unknown>;

type BaseContent = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  featured: boolean;
  coverImage: string;
};

export type BlogPost = BaseContent & {
  component: ComponentType;
  content: string;
  minutes: number;
  readingTime: number;
  pinned: boolean;
};

export type ProjectPost = BaseContent & {
  stack: string[];
  language: string;
  type: string;
  status: string;
  architecture: string;
  demoLink: string;
  sourceCodeLink: string;
  media: string[];
  lessons: string[];
  content: string;
};

export type CaseStudyPost = BaseContent & {
  component: ComponentType;
  problem: string;
  approach: string;
  architecture: string;
  tradeoffs: string;
  lessonsLearned: string;
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

export type NowPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  currentProjects: string[];
  learningFocus: string[];
  booksIdeas: string[];
};

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

const getSlug = (filePath: string) => filePath.split("/").at(-1)?.replace(".mdx", "") ?? "";
const byDateDesc = (a: { date: string }, b: { date: string }) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

function normalizeRaw(raw: RawModuleValue): string {
  if (typeof raw === "string") return raw;
  if (raw && typeof raw === "object" && "default" in (raw as Record<string, unknown>)) {
    const value = (raw as { default?: unknown }).default;
    return typeof value === "string" ? value : "";
  }
  return "";
}

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

function parseFrontmatter(rawInput: RawModuleValue): { data: Frontmatter; content: string } {
  const raw = normalizeRaw(rawInput);
  const match = raw.match(FRONTMATTER_PATTERN);
  if (!match) return { data: {}, content: raw.trim() };

  const body = raw.replace(FRONTMATTER_PATTERN, "").trim();
  const lines = match[1].split(/\r?\n/);
  const data: Frontmatter = {};
  let currentArrayKey = "";

  for (const line of lines) {
    if (!line.trim()) continue;

    if (line.trimStart().startsWith("- ") && currentArrayKey) {
      const existing = data[currentArrayKey];
      const parsed = String(parseYamlValue(line.trim().slice(2)));
      if (Array.isArray(existing)) {
        existing.push(parsed);
      } else {
        data[currentArrayKey] = [parsed];
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
      data[key] = inner ? inner.split(",").map((item) => String(parseYamlValue(item))) : [];
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

function safeBool(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function warnInvalid(filePath: string, field: string) {
  if (import.meta.env.DEV) {
    console.warn(`[content] Missing or invalid "${field}" in ${filePath}`);
  }
}

function requireString(data: Frontmatter, filePath: string, field: string, fallback = "") {
  const value = data[field];
  if (typeof value !== "string") {
    warnInvalid(filePath, field);
    return fallback;
  }
  return value;
}

function baseFromFrontmatter(filePath: string, slug: string, data: Frontmatter): BaseContent {
  return {
    slug: safeString(data.slug, slug),
    title: requireString(data, filePath, "title", slug),
    date: requireString(data, filePath, "date", "1970-01-01"),
    summary: safeString(data.description, ""),
    tags: safeArray(data.tags),
    featured: safeBool(data.featured, false),
    coverImage: safeString(data.coverImage, ""),
  };
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
    if (!component) return null;

    const { data, content } = parseFrontmatter(raw);
    const base = baseFromFrontmatter(filePath, slug, data);
    const calculated = estimateReadingMinutes(content);
    const readingTime = typeof data.readingTime === "number" ? Math.max(1, data.readingTime) : calculated;

    return {
      ...base,
      component,
      content,
      minutes: readingTime,
      readingTime,
      pinned: safeBool(data.pinned, base.featured),
    };
  })
  .filter((entry): entry is BlogPost => Boolean(entry))
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
    const base = baseFromFrontmatter(filePath, slug, data);
    return {
      ...base,
      stack: safeArray(data.stack),
      language: safeString(data.language, safeArray(data.stack)[0] ?? "unknown"),
      type: safeString(data.type, "system"),
      status: safeString(data.status, "active"),
      architecture: safeString(data.architecture, ""),
      demoLink: safeString(data.demoLink, "#"),
      sourceCodeLink: safeString(data.sourceCodeLink, safeString(data.github, "#")),
      media: safeArray(data.media),
      lessons: safeArray(data.lessons),
      content,
    };
  })
  .sort(byDateDesc);

const caseStudyRawModules = import.meta.glob("../../content/case-studies/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, RawModuleValue>;
const caseStudyComponentModules = import.meta.glob("../../content/case-studies/*.mdx", {
  eager: true,
}) as Record<string, MdxModule>;

export const caseStudyPosts: CaseStudyPost[] = Object.entries(caseStudyRawModules)
  .map(([filePath, raw]) => {
    const slug = getSlug(filePath);
    const component = caseStudyComponentModules[filePath]?.default;
    if (!component) return null;
    const { data } = parseFrontmatter(raw);
    const base = baseFromFrontmatter(filePath, slug, data);
    return {
      ...base,
      component,
      problem: safeString(data.problem, ""),
      approach: safeString(data.approach, ""),
      architecture: safeString(data.architecture, ""),
      tradeoffs: safeString(data.tradeoffs, ""),
      lessonsLearned: safeString(data.lessonsLearned, ""),
    };
  })
  .filter((entry): entry is CaseStudyPost => Boolean(entry))
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
      date: requireString(data, filePath, "date", "1970-01-01"),
      text: requireString(data, filePath, "text", ""),
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
      title: requireString(data, filePath, "title", slug),
      date: requireString(data, filePath, "date", "1970-01-01"),
      type: (safeString(data.type, "image") === "video" ? "video" : "image") as "image" | "video",
      src: requireString(data, filePath, "src", ""),
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
      title: requireString(data, filePath, "title", slug),
      date: requireString(data, filePath, "date", "1970-01-01"),
      status: safeString(data.status, "active"),
      update: safeString(data.update, ""),
      asset: safeString(data.asset, ""),
    };
  })
  .sort(byDateDesc);

const nowRawModules = import.meta.glob("../../content/now/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, RawModuleValue>;

export const nowPosts: NowPost[] = Object.entries(nowRawModules)
  .map(([filePath, raw]) => {
    const slug = getSlug(filePath);
    const { data } = parseFrontmatter(raw);
    return {
      slug,
      title: requireString(data, filePath, "title", "Now"),
      date: requireString(data, filePath, "date", "1970-01-01"),
      summary: safeString(data.description, ""),
      currentProjects: safeArray(data.currentProjects),
      learningFocus: safeArray(data.learningFocus),
      booksIdeas: safeArray(data.booksIdeas),
    };
  })
  .sort(byDateDesc);
