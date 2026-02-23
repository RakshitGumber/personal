import { useEffect } from "react";
import { SITE_CONFIG } from "@/lib/seo";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

const ensureMeta = (selector: string, attr: "name" | "property", key: string) => {
  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  return element;
};

export function Seo({ title, description, path = "/", image = "/og/default-og.svg" }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_CONFIG.name}`;
    const url = `${SITE_CONFIG.url}${path}`;
    const imageUrl = image.startsWith("http") ? image : `${SITE_CONFIG.url}${image}`;

    document.title = fullTitle;

    ensureMeta('meta[name="description"]', "name", "description").content = description;
    ensureMeta('meta[property="og:title"]', "property", "og:title").content = fullTitle;
    ensureMeta('meta[property="og:description"]', "property", "og:description").content = description;
    ensureMeta('meta[property="og:type"]', "property", "og:type").content = "website";
    ensureMeta('meta[property="og:url"]', "property", "og:url").content = url;
    ensureMeta('meta[property="og:image"]', "property", "og:image").content = imageUrl;
    ensureMeta('meta[name="twitter:card"]', "name", "twitter:card").content = "summary_large_image";
    ensureMeta('meta[name="twitter:title"]', "name", "twitter:title").content = fullTitle;
    ensureMeta('meta[name="twitter:description"]', "name", "twitter:description").content = description;
    ensureMeta('meta[name="twitter:image"]', "name", "twitter:image").content = imageUrl;

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, image]);

  return null;
}
