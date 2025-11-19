// src/components/templates/PartnersIndexPage.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

type Partner = {
  _id: string;
  title: string;
  url?: string;
  slug: string;
  logo?: string;
};

export default function PartnersIndexPage({ partners }: { partners: Partner[] }) {
  if (!partners || partners.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500 dark:text-gray-300">
        No partners available.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-10 text-center text-4xl font-bold tracking-tight">
        Our Partners
      </h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {partners.map((p) => (
          <Link
            key={p._id}
            href={`/partners/${p.slug}`}
            className="group block rounded-xl border border-gray-200 bg-white p-6 shadow transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            {p.logo && (
              <div className="relative mb-4 h-24 w-full">
                <Image
                  src={p.logo}
                  alt={p.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}

            <div className="text-center text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {p.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
