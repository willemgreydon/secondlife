"use client";

import Image from "next/image";
import Link from "next/link";

type Partner = {
  _id: string;
  name: string;
  slug?: string;
  website?: string;
  logo?: {
    asset?: {
      url?: string;
    };
    alt?: string;
  };
};

type Props = {
  title?: string;
  description?: string;
  partners?: Partner[];
  linksOnly?: boolean;
};

export default function PartnersSection({
  title,
  description,
  partners = [],
  linksOnly = false,
}: Props) {
  if (!partners.length) return null;

  if (linksOnly) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12">
        {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
        <ul className="space-y-2">
          {partners.map((p) => (
            <li key={p._id}>
              <Link
                href={`/partners/${p.slug}`}
                className="text-sky-600 hover:underline"
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {(title || description) && (
        <div className="mb-10 text-center">
          {title && <h2 className="text-3xl font-semibold">{title}</h2>}
          {description && (
            <p className="mx-auto mt-3 max-w-2xl text-sm opacity-70">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="overflow-hidden">
        <div className="flex gap-14">
          {[...partners, ...partners].map((p, i) => {
            const logoUrl = p.logo?.asset?.url;
            if (!logoUrl) return null;

            const href =
              p.website || (p.slug ? `/partners/${p.slug.current}` : "#");

            return (
              <Link
                key={`${p._id}-${i}`}
                href={href}
                target={p.website ? "_blank" : undefined}
                className="flex min-w-[160px] items-center justify-center opacity-80 hover:opacity-100"
              >
                <Image
                  src={logoUrl}
                  alt={p.logo?.alt || p.name}
                  width={160}
                  height={80}
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
