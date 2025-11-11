'use client'
export default function Stats({ title, stats = [] as {label:string; value:string}[] }) {
  if (!stats.length) return null
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="rounded-2xl border bg-white p-4">
            <dt className="text-sm opacity-70">{s.label}</dt>
            <dd className="text-3xl font-semibold">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
