// src/lib/queries/publications.ts

import { client } from "@/lib/sanity.client";

export interface Publication {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  summary?: string;
  publishedAt?: string;
  language?: string;
  pdf?: {
    asset?: {
      url: string;
    };
  };
}

export async function getAllPublications(): Promise<Publication[]> {
  return client.fetch(
    `*[_type == "publication"]
      | order(publishedAt desc) {
        _id,
        title,
        slug,
        summary,
        publishedAt,
        language,
        pdf {
          asset->{
            url
          }
        }
      }`
  );
}
