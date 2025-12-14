"use client";

import Image from "next/image";
import Link from "next/link";

type Partner = {
  _id?: string;
  _key?: string;
  name?: string;
  slug?: string;
  website?: string;
  logo?: string;
};

type PartnersProps = {
  title?: string;
  description?: string;
  partners?: Partner[];
  linksOnly?: boolean;
};

export default function Partners({
  title,
  description,
  partners = [],
  linksOnly = false,
}: PartnersProps) {
  if (!Array.isArray(partners) || partners.length === 0) return null;

  /* ------------------------------------------------------------
     FALLBACK: LINK LIST (editor explicitly wants links only)
  ------------------------------------------------------------- */
  if (linksOnly) {
    return (
      <section className="mx-auto max-w-6xl px-4">
        {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p, index) => (
            <li
              key={p._id ?? p._key ?? `${p.slug}-${index}`}
              className="rounded-2xl border p-4"
            >
              {p.slug ? (
                <Link
                  href={`/partners/${p.slug}`}
                  className="text-lg font-semibold hover:underline"
                >
                  {p.name}
                </Link>
              ) : (
                <span className="text-lg font-semibold">{p.name}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  /* ------------------------------------------------------------
     DEFAULT: LOGO CAROUSEL (BEST PRACTICE)
  ------------------------------------------------------------- */
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16">
      {(title || description) && (
        <div className="mb-10 text-center">
          {title && (
            <h2 className="text-3xl font-semibold tracking-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="mx-auto mt-3 max-w-2xl text-sm opacity-70">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="relative overflow-hidden">
        <div className="flex gap-14 animate-partners-scroll">
          {[...partners, ...partners].map((p, i) => {
            const href = p.website || (p.slug ? `/partners/${p.slug}` : undefined);

            return (
              <Link
                key={`${p._id}-${i}`}
                href={href ?? "#"}
                target={p.website ? "_blank" : undefined}
                className="flex min-w-[160px] items-center justify-center opacity-80 transition hover:opacity-100"
              >
                {p.logo && (
                  <Image
                    src={p.logo}
                    alt={p.name ?? ""}
                    width={160}
                    height={80}
                    className="max-h-16 w-auto object-contain grayscale transition hover:grayscale-0"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
