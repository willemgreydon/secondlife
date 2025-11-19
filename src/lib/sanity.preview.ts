// /src/lib/sanity.preview.ts
import { createClient } from "next-sanity";
import { draftMode } from "next/headers";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export async function getServerClient() {
  const { isEnabled } = await draftMode();

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !isEnabled,
    perspective: isEnabled ? "previewDrafts" : "published",
    stega: isEnabled
      ? { studioUrl: "/studio", enabled: true }
      : undefined,
  });
}
