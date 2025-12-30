// src/lib/queries/policy-briefs.ts

import { client } from "@/lib/sanity.client";

export interface PolicyBrief {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  summary?: string;
  publishedAt?: string;
  region?: string;
  language?: string;
  pdf?: {
    asset?: {
      url: string;
    };
  };
}

export async function getAllPolicyBriefs(): Promise<PolicyBrief[]> {
  return client.fetch(
    `*[_type == "policyBrief"]
      | order(publishedAt desc) {
        _id,
        title,
        slug,
        summary,
        publishedAt,
        region,
        language,
        pdf {
          asset->{
            url
          }
        }
      }`
  );
}
