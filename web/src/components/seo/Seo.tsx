// import { useEffect } from "react";
// import { SITE_CONFIG } from "@/lib/seo";

// type SeoProps = {
//   title: string;
//   description: string;
//   path?: string;
//   image?: string;
//   type?: "website" | "article";
//   structuredData?: Record<string, unknown>;
// };

// const ensureMeta = (selector: string, attr: "name" | "property", key: string) => {
//   let element = document.querySelector<HTMLMetaElement>(selector);
//   if (!element) {
//     element = document.createElement("meta");
//     element.setAttribute(attr, key);
//     document.head.appendChild(element);
//   }
//   return element;
// };

// export function Seo({
//   title,
//   description,
//   path = "/",
//   image = "/og/default-og.svg",
//   type = "website",
//   structuredData,
// }: SeoProps) {
//   useEffect(() => {
//     const fullTitle = `${title} | ${SITE_CONFIG.name}`;
//     const url = `${SITE_CONFIG.url}${path}`;
//     const imageUrl = image.startsWith("http") ? image : `${SITE_CONFIG.url}${image}`;

//     document.title = fullTitle;

//     ensureMeta('meta[name="description"]', "name", "description").content = description;
//     ensureMeta('meta[property="og:title"]', "property", "og:title").content = fullTitle;
//     ensureMeta('meta[property="og:description"]', "property", "og:description").content = description;
//     ensureMeta('meta[property="og:type"]', "property", "og:type").content = type;
//     ensureMeta('meta[property="og:url"]', "property", "og:url").content = url;
//     ensureMeta('meta[property="og:image"]', "property", "og:image").content = imageUrl;
//     ensureMeta('meta[name="robots"]', "name", "robots").content = "index,follow";
//     ensureMeta('meta[name="twitter:card"]', "name", "twitter:card").content = "summary_large_image";
//     ensureMeta('meta[name="twitter:title"]', "name", "twitter:title").content = fullTitle;
//     ensureMeta('meta[name="twitter:description"]', "name", "twitter:description").content = description;
//     ensureMeta('meta[name="twitter:image"]', "name", "twitter:image").content = imageUrl;

//     let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
//     if (!canonical) {
//       canonical = document.createElement("link");
//       canonical.rel = "canonical";
//       document.head.appendChild(canonical);
//     }
//     canonical.href = url;

//     const schema = structuredData ?? {
//       "@context": "https://schema.org",
//       "@type": "WebPage",
//       name: fullTitle,
//       description,
//       url,
//     };

//     const scriptId = "seo-structured-data";
//     let script = document.getElementById(scriptId) as HTMLScriptElement | null;
//     if (!script) {
//       script = document.createElement("script");
//       script.id = scriptId;
//       script.type = "application/ld+json";
//       document.head.appendChild(script);
//     }
//     script.text = JSON.stringify(schema);
//   }, [title, description, path, image, type, structuredData]);

//   return null;
// }
