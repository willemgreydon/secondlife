"use client";

import Link from "next/link";
import Image from "next/image";

export type InitiativeCard = {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  status?: string;
  cover?: string;
};

export type InitiativesGridProps = {
  title?: string;
  initiatives?: InitiativeCard[];
  limit?: number;
};

export default function InitiativesGrid(props: InitiativesGridProps) {
  const { title, initiatives = [], limit = 100 } = props;
  
  const items = initiatives.slice(0, limit);

  return (
    <section className="py-10 md:py-16">
      {title && <h2 className="text-3xl font-bold mb-6 md:mb-10">{title}</h2>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((initiative) => (
          <Link
            key={initiative._id}
            href={`/initiatives/${initiative.slug}`}
            className="group block rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors">
            {initiative.cover && (
              <div className="relative aspect-[16/10] bg-gray-100 dark:bg-gray-800">
                <Image src={initiative.cover} alt={initiative.title} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{initiative.title}</h3>

              {initiative.excerpt && <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{initiative.excerpt}</p>}

              {initiative.status && <p className="text-xs mt-2 opacity-70">{initiative.status}</p>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
