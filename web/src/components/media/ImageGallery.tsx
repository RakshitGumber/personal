type ImageGalleryProps = {
  images: string[];
  title: string;
};

export function ImageGallery({ images, title }: ImageGalleryProps) {
  if (images.length === 0) return null;

  return (
    <section className="grid gap-3 sm:grid-cols-2">
      {images.map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt={`${title} screenshot ${index + 1}`}
          loading="lazy"
          decoding="async"
          className="aspect-video w-full border border-line object-cover"
        />
      ))}
    </section>
  );
}
