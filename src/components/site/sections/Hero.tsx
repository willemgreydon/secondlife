"use client";
import Image from "next/image";
import { getImageUrl } from "@/lib/sanity.image";

type HeroProps = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  bgImage?: any;
};

export default function Hero(props: HeroProps) {
  const { title, subtitle, ctaText, ctaHref, bgImage } = props;

  const bgUrl = getImageUrl(bgImage);

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background + Overlay */}
      {bgUrl && (
        <div className="absolute inset-0 -z-10">
          <Image src={bgUrl} alt={title || "Hero background"} fill sizes="100vw" priority className="object-cover" />
          {/* Light overlay (#2bbbe2 @ 88%), Dark overlay (#0285a9 @ 88%) */}
          <div className="absolute inset-0 bg-[rgba(43,187,226,0.88)] dark:bg-[rgba(2,133,169,0.88)]" aria-hidden="true" />
        </div>
      )}

      {/* Centered content; Light mode inverted = white text */}
      <div className="flex min-h-[64vh] items-center justify-center px-6 text-center text-white">
        <div className="max-w-3xl">
          {title && <h1 className="leading-tight text-5xl font-bold md:text-7xl">{title}</h1>}
          {subtitle && <p className="mt-4 text-lg opacity-95 md:text-xl">{subtitle}</p>}

          {ctaText && ctaHref && (
            <a
              href={ctaHref}
              className="
                mt-8 inline-flex items-center justify-center
                rounded-lg px-6 py-3
                bg-[#2bbbe2] text-white
                hover:bg-[#2d2d2d]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                transition-colors
              ">
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
