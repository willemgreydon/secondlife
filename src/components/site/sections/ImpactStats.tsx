'use client'

type Metric = {
  metric_key: string
  title: string
  current_value: number
  unit?: string
  as_of_date?: string
  description?: string
}

export default function ImpactStats({
  metrics,
  className,
}: {
  metrics: Metric[]
  className?: string
}) {
  if (!metrics?.length) return null

  return (
    <section className={className}>
      <div className="container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m) => (
            <div
              key={m.metric_key}
              className="rounded-2xl border p-5 bg-card text-card-foreground"
            >
              <div className="text-3xl font-semibold">
                {formatNumber(m.current_value)}
                {m.unit ? <span className="text-base ml-1">{m.unit}</span> : null}
              </div>
              <div className="mt-1 text-sm font-medium">{m.title}</div>
              {m.as_of_date && (
                <div className="mt-1 text-xs text-muted-foreground">
                  as of {new Date(m.as_of_date).toLocaleDateString()}
                </div>
              )}
              {m.description && (
                <p className="mt-2 text-sm text-muted-foreground">{m.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function formatNumber(n: number) {
  try {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n)
  } catch {
    return String(n)
  }
}
