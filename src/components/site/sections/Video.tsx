'use client'

export default function Video({ url, title, autoplay, loop }: { url?: string; title?: string; autoplay?: boolean; loop?: boolean }) {
  if (!url) return null
  return (
    <section className="mx-auto max-w-5xl px-4">
      {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
      <div className="aspect-video overflow-hidden rounded-2xl">
        <video src={url} controls autoPlay={autoplay} loop={loop} className="h-full w-full object-cover" />
      </div>
    </section>
  )
}
