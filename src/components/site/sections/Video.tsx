'use client'

export default function VideoSection({ title, url }: { title?: string; url?: string }) {
  if (!url) return null
  return (
    <section className="bg-black text-gray-100 dark:bg-zinc-950 transition-colors">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        {title && <h2 className="mb-6 text-3xl font-semibold">{title}</h2>}
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <iframe
            src={url}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </section>
  )
}