"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type Partner = {
  _id: string;
  name: string;
  slug?: string | { current: string };
  website?: string;
  logo?: { url?: string; alt?: string };
  logoDark?: { url?: string; alt?: string };
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
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDrag = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const stopDrag = () => setIsDragging(false);

  const onDrag = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

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
    <section className="mx-auto max-w-7xl px-4 py-0">
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

      <div
        ref={sliderRef}
        className="overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={startDrag}
        onMouseLeave={stopDrag}
        onMouseUp={stopDrag}
        onMouseMove={onDrag}
      >
        <div
          className={`flex gap-6 ${
            isDragging ? "" : "animate-partners-scroll"
          } hover:[animation-play-state:paused]`}
        >
          {[...partners, ...partners].map((p, i) => {
            const lightLogo = p.logo?.url;
            const darkLogo = p.logoDark?.url;

            if (!lightLogo) return null;

            const slug =
              typeof p.slug === "string" ? p.slug : p.slug?.current;

            const href = p.website || (slug ? `/partners/${slug}` : "#");

            return (
              <Link
                key={`${p._id}-${i}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-[180px] items-center justify-center transition-transform duration-300 hover:scale-105"
              >
                <div className="relative flex items-center justify-center">
                  <Image
                    src={lightLogo}
                    alt={p.logo?.alt || p.name}
                    width={240}
                    height={120}
                    className="max-h-20 w-auto object-contain dark:hidden"
                  />

                  {darkLogo && (
                    <Image
                      src={darkLogo}
                      alt={p.logoDark?.alt || p.name}
                      width={240}
                      height={120}
                      className="hidden max-h-20 w-auto object-contain dark:block"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}