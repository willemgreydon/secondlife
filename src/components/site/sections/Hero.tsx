// src/components/site/sections/Hero.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

type HeroProps = {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  bgImage?: string
  gradientOverlay?: boolean
}

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  bgImage,
  gradientOverlay = false,
}: HeroProps) {
  return (
    <section className="relative min-h-[56vh] md:min-h-[64vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt={title || 'Hero background'}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      )}

      {/* Overlay */}
      <div
        className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${
          gradientOverlay
            ? 'bg-gradient-to-b from-[rgba(43,187,226,0.88)] to-[rgba(43,187,226,0.6)] dark:from-[rgba(43,187,226,0.88)] dark:to-[rgba(43,187,226,0.8)]'
            : 'bg-[rgba(43,187,226,0.88)] dark:bg-[rgba(43,187,226,0.88)]'
        }`}
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-20">
        {title && (
          <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-sm text-white">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90">
            {subtitle}
          </p>
        )}
        {ctaText && ctaHref && (
          <div className="mt-8">
            <Link
              href={ctaHref}
              className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-medium
                         bg-white text-[#2BBBE2] hover:bg-[#2BBBE2] hover:text-white transition"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
