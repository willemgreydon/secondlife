'use client'

export default function Stats({ title, stats }: { title?: string; stats?: { label: string; value: string }[] }) {
  if (!stats?.length) return null
  return (
    <section className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        {title && <h2 className="mb-8 text-3xl font-semibold">{title}</h2>}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-4xl font-bold">{s.value}</div>
              <div className="mt-2 text-sm opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}