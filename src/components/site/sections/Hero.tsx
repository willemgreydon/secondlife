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
  overlay?: 'soft' | 'medium' | 'strong'
  gradientOverlay?: boolean
}

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  bgImage,
  overlay = 'medium',
  gradientOverlay = false,
}: HeroProps) {
  return (
    <section
      className={[
        'relative min-h-[56vh] md:min-h-[64vh] flex items-center justify-center text-center',
        'hero-overlay',
        gradientOverlay ? 'hero-overlay--gradient' : '',
      ].join(' ')}
      data-overlay={overlay}
    >
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

      {/* Content */}
      <div className="container mx-auto px-4 py-20 text-foreground">
        {title && (
          <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-sm">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-foreground/90">
            {subtitle}
          </p>
        )}
        {ctaText && ctaHref && (
          <div className="mt-8">
            <Link
              href={ctaHref}
              className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-medium
                         bg-[var(--brand-primary)] text-[var(--brand-primary-foreground)]
                         hover:brightness-110 transition"
            >
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
