// src/lib/sanity.image.ts
import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { client } from "@/lib/sanity.client";

const builder = imageUrlBuilder(client as any);

export function urlForImage(source: Image | any) {
  return builder.image(source);
}

type AnyImage =
  | string
  | {
      asset?: {
        _ref?: string;
        url?: string;
      } | null;
    }
  | null
  | undefined;

type GetImageUrlOptions = {
  width?: number;
  height?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  autoFormat?: boolean;
};

/**
 * getImageUrl
 * - akzeptiert String-URLs ODER Sanity-Image-Objekte
 * - gibt eine finale URL zurück oder null
 */
export function getImageUrl(
  img: AnyImage,
  opts: GetImageUrlOptions = {}
): string | null {
  if (!img) return null;

  // Bereits fertige URL
  if (typeof img === "string") {
    return img || null;
  }

  const asset = (img as any).asset;
  if (!asset) return null;

  // Direkt-URL aus asset
  if ("url" in asset && asset.url) {
    return asset.url || null;
  }

  // Referenz → über Builder auflösen
  if ("_ref" in asset && asset._ref) {
    let q = builder.image(img as any);

    if (opts.width) q = q.width(opts.width);
    if (opts.height) q = q.height(opts.height);
    if (opts.fit) q = q.fit(opts.fit);
    if (opts.autoFormat !== false) q = q.auto("format");

    return q.url();
  }

  return null;
}
