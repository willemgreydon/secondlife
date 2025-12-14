"use client";
import Image from "next/image";

type ImageBlockProps = {
  image?: {
    asset?: {
      url?: string;
    };
  };
  alt?: string;
  caption?: string;
};

export default function ImageBlock({ image, alt, caption }: ImageBlockProps) {
  const url = image?.asset?.url;
  if (!url) return null;

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100">
        <Image src={url} alt={alt ?? ""} fill className="object-cover" />
      </div>

      {caption && (
        <p className="mt-2 text-sm text-gray-500 text-center">{caption}</p>
      )}
    </section>
  );
}
