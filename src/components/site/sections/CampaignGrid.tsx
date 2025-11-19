// src/components/site/sections/CampaignGrid.tsx

"use client";

import Link from "next/link";
import Image from "next/image";

export type CampaignGridProps = {
  title?: string;
  campaigns?: {
    _id: string;
    title: string;
    excerpt?: string;
    slug?: string;
    status?: string;
    cover?: string;
  }[];
  limit?: number;
};

export default function CampaignGrid({
  title,
  campaigns = [],
  limit = 100,
}: CampaignGridProps) {
  const items = campaigns.slice(0, limit);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      {title && (
        <h2 className="mb-8 text-3xl font-bold tracking-tight">{title}</h2>
      )}

      {items.length === 0 && (
        <p className="text-gray-500 dark:text-gray-300">
          No campaigns available.
        </p>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <Link
            key={c._id}
            href={`/campaigns/${c.slug}`}
            className="group rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm transition hover:shadow-md dark:hover:border-gray-700"
          >
            {c.cover && (
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                <Image
                  src={c.cover}
                  alt={c.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
            )}

            <h3 className="text-xl font-semibold mb-2">{c.title}</h3>

            {c.excerpt && (
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {c.excerpt}
              </p>
            )}

            {c.status && (
              <span className="mt-3 inline-block rounded bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs text-gray-600 dark:text-gray-300">
                {c.status}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
