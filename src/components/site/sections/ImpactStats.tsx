'use client'
type Metric = { metric_key?:string; title:string; current_value:number; unit?:string; as_of_date?:string }
export default function ImpactStats({ title, metrics = [] as Metric[] }) {
  if (!metrics.length) return null
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <div key={m.metric_key ?? i} className="rounded-2xl border bg-white p-4">
            <div className="text-3xl font-semibold">{m.current_value.toLocaleString()} {m.unit}</div>
            <div className="mt-1 text-sm opacity-80">{m.title}</div>
            {m.as_of_date && <div className="mt-1 text-xs opacity-60">as of {m.as_of_date}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
