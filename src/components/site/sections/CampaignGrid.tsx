"use client";

import Link from "next/link";
import Image from "next/image";

export type Campaign = {
  _id?: string;
  _key?: string;
  title?: string;
  excerpt?: string;
  slug?: string;
  status?: string;
  cover?: string;
};

export type CampaignGridProps = {
  title?: string;
  campaigns?: Campaign[];
  limit?: number;
};

export default function CampaignGrid({
  title,
  campaigns = [],
  limit = 100,
}: CampaignGridProps) {
  const items = Array.isArray(campaigns)
    ? campaigns.slice(0, limit)
    : [];

  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      {title && (
        <h2 className="mb-8 text-3xl font-bold tracking-tight">
          {title}
        </h2>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => {
          const href = c.slug ? `/campaigns/${c.slug}` : undefined;

          return (
            <div
              key={c._key || c._id || i}
              className="group rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm transition hover:shadow-md dark:hover:border-gray-700"
            >
              {href ? (
                <Link href={href} className="block">
                  <CardContent campaign={c} />
                </Link>
              ) : (
                <CardContent campaign={c} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CardContent({ campaign }: { campaign: Campaign }) {
  return (
    <>
      {campaign.cover && (
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
          <Image
            src={campaign.cover}
            alt={campaign.title ?? ""}
            fill
            className="object-cover transition group-hover:scale-105"
          />
        </div>
      )}

      <h3 className="text-xl font-semibold mb-2">
        {campaign.title}
      </h3>

      {campaign.excerpt && (
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {campaign.excerpt}
        </p>
      )}

      {campaign.status && (
        <span className="mt-3 inline-block rounded bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs text-gray-600 dark:text-gray-300">
          {campaign.status}
        </span>
      )}
    </>
  );
}
