'use client'
export default function Accordion({ items = [], title }: { items?: {title:string;content:string}[]; title?: string }) {
  if (!items.length) return null
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}
      <div className="divide-y">
        {items.map((it, i) => (
          <details key={i} className="group py-4">
            <summary className="cursor-pointer list-none font-medium">{it.title}</summary>
            <div className="pt-2 text-sm opacity-90 whitespace-pre-wrap">{it.content}</div>
          </details>
        ))}
      </div>
    </section>
  )
}