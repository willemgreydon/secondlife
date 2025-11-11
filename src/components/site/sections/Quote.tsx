'use client'
export default function Quote({ quote, author }: { quote?:string; author?:string }) {
  if (!quote) return null
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <blockquote className="text-2xl font-light leading-relaxed">“{quote}”</blockquote>
      {author && <div className="mt-4 text-right text-sm opacity-80">— {author}</div>}
    </section>
  )
}
