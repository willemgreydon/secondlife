'use client'

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  bgImage,
}: {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  bgImage?: string
}) {
  return (
    <section
      className="relative flex min-h-[70vh] flex-col items-center justify-center
                 bg-white text-gray-900 dark:bg-black dark:text-gray-100
                 transition-colors overflow-hidden"
      style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className="absolute inset-0 bg-white/70 dark:bg-black/70" aria-hidden="true" />
      <div className="relative z-10 max-w-3xl text-center px-6">
        {title && <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>}
        {subtitle && <p className="mt-4 text-lg opacity-90">{subtitle}</p>}
        {ctaText && ctaHref && (
          <a
            href={ctaHref}
            className="mt-8 inline-block rounded-full border border-gray-800
                       px-5 py-2.5 text-sm font-medium hover:bg-gray-900 hover:text-white
                       dark:border-gray-200 dark:hover:bg-gray-100 dark:hover:text-black
                       transition-colors"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}