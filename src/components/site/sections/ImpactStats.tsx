'use client'

export default function ImpactStats({
  title,
  stats,
}: {
  title?: string
  stats?: { label: string; value: string; unit?: string }[]
}) {
  if (!stats?.length) return null
  return (
    <section className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        {title && <h2 className="mb-10 text-3xl font-semibold">{title}</h2>}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="rounded-lg border border-gray-200 dark:border-zinc-800 p-6">
              <div className="text-4xl font-bold">
                {s.value}
                {s.unit && <span className="text-lg font-medium opacity-80"> {s.unit}</span>}
              </div>
              <div className="mt-2 text-sm opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}