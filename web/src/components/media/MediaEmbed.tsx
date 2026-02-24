type MediaEmbedProps = {
  type: "image" | "video";
  src: string;
  alt: string;
};

export function MediaEmbed({ type, src, alt }: MediaEmbedProps) {
  if (type === "video") {
    return <video src={src} controls preload="metadata" className="aspect-video w-full object-cover" />;
  }
  return <img src={src} alt={alt} loading="lazy" decoding="async" className="aspect-video w-full object-cover" />;
}
