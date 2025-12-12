// src/lib/sanity.image.ts
import imageUrlBuilder from "@sanity/image-url";

/**
 * IMPORTANT:
 * Do NOT use a runtime client here.
 * Image builder must be initialized with static config.
 */
const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
});

/* -------------------------------- TYPES -------------------------------- */

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

/* ------------------------------ MAIN API ------------------------------- */

export function getImageUrl(
  img: AnyImage,
  opts: GetImageUrlOptions = {}
): string | null {
  if (!img) return null;

  // Already a URL (fallback-safe)
  if (typeof img === "string") {
    return img || null;
  }

  const asset = img.asset;
  if (!asset) return null;

  // Asset already has resolved URL
  if (asset.url) {
    return asset.url;
  }

  // Asset ref → build URL
  if (asset._ref) {
    let q = builder.image(img);

    if (opts.width) q = q.width(opts.width);
    if (opts.height) q = q.height(opts.height);
    if (opts.fit) q = q.fit(opts.fit);
    if (opts.autoFormat !== false) q = q.auto("format");

    return q.url();
  }

  return null;
}
