"use client";
import Image from "next/image";

type GalleryImage = {
  _id?: string;
  _key?: string;
  alt?: string;
  caption?: string;
  asset?: {
    url?: string;
  };
};

type GalleryProps = {
  title?: string;
  images?: GalleryImage[];
  columns?: number;
};

export default function Gallery({
  title,
  images = [],
  columns = 3,
}: GalleryProps) {
  if (!Array.isArray(images) || images.length === 0) return null;

  const gridCols =
    columns === 4
      ? "lg:grid-cols-4"
      : columns === 2
      ? "lg:grid-cols-2"
      : "lg:grid-cols-3";

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {title && <h2 className="mb-6 text-3xl font-semibold">{title}</h2>}

      <div className={`grid gap-4 sm:grid-cols-2 ${gridCols}`}>
        {images.map((img, index) => {
          const url = img?.asset?.url;
          if (!url) return null;

          return (
            <div
              key={img._key ?? img._id ?? index}
              className="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-100"
            >
              <Image
                src={url}
                alt={img.alt ?? ""}
                fill
                sizes="33vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
