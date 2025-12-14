"use client";

import Image from "next/image";
import { getImageUrl } from "@/lib/sanity.image";

type HeroProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  image?: any;
  bgImage?: any;
};

export default function Hero({
  eyebrow,
  title,
  subtitle,
  ctaText,
  ctaHref,
  image,
  bgImage,
}: HeroProps) {
  
  const heroImage = image ?? bgImage;
  const bgUrl = getImageUrl(heroImage, { width: 1920 });

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      {bgUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgUrl}
            alt={title || "Hero background"}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-[#2bbbe2]/50 dark:bg-[#0285a9]/50"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex min-h-[64vh] items-center justify-center px-6 text-center text-white">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-sm uppercase tracking-widest opacity-90">
              {eyebrow}
            </p>
          )}
          {title && (
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-4 text-lg opacity-95 md:text-xl">
              {subtitle}
            </p>
          )}
          {ctaText && ctaHref && (
            <a
              href={ctaHref}
              className="mt-8 inline-flex rounded-lg bg-[#2bbbe2] px-6 py-3 text-white transition hover:bg-[#2d2d2d]"
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
