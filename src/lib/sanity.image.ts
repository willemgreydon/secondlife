// src/lib/sanity.image.ts
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import type { ImageRef } from "@/types/cms";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// A tiny local client just for the builder (no token needed)
const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

/** Convenience: returns a builder you can chain (width/height/quality/auto) or null if no image */
export const urlFor = (src?: ImageRef | null) => (src ? builder.image(src) : null);