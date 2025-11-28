"use client";
import Image from "next/image";
import { getImageUrl } from "@/lib/sanity.image";

type ImageBlockProps = {
  imageUrl?: any;
  alt?: string;
  caption?: string;
};

export default function ImageBlock(props: ImageBlockProps) {
  const { imageUrl, alt, caption } = props;
  
  const url = typeof imageUrl === "string" ? imageUrl : getImageUrl(imageUrl);
  if (!url) return null;
  return (
    <figure className="mx-auto max-w-5xl px-4">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100">
        <Image src={url} alt={alt || ""} fill sizes="100vw" className="object-cover" />
      </div>
      {caption && <figcaption className="mt-2 text-center text-sm opacity-70">{caption}</figcaption>}
    </figure>
  );
}
