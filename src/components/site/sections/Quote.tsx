'use client'

export default function Quote({ quote, author }: { quote?: string; author?: string }) {
  if (!quote) return null
  return (
    <section className="bg-gray-50 text-gray-900 dark:bg-zinc-900 dark:text-gray-100 transition-colors">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <blockquote className="text-2xl font-medium italic leading-relaxed">“{quote}”</blockquote>
        {author && <p className="mt-4 text-sm opacity-80">— {author}</p>}
      </div>
    </section>
  )
}