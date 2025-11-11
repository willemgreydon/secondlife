'use client'
export default function Video({ title, url, caption }: { title?:string; url?:string; caption?:string }) {
  if (!url) return null
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      {title && <h2 className="mb-4 text-2xl font-semibold">{title}</h2>}
      <div className="aspect-video w-full overflow-hidden rounded-2xl">
        <iframe src={url} title={title || 'Video'} className="h-full w-full" allow="autoplay; fullscreen; picture-in-picture" />
      </div>
      {caption && <p className="mt-2 text-sm opacity-80">{caption}</p>}
    </section>
  )
}
