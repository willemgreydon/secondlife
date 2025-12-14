"use client";

type metric = {
  metric_key: string;
  title: string;
  current_value: number;
  unit?: string;
};
type ImpactStatsProps = {
  title?: string;
  metrics?: metric[];
};

export default function ImpactStats(props: ImpactStatsProps) {
  const { title = "Impact So Far", metrics = [] } = props;

  if (!Array.isArray(metrics) || metrics.length === 0) return null;
  return (
    <section className="mx-auto max-w-6xl px-4">
      {title && <h2 className="mb-6 text-3xl font-semibold">{title}</h2>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.metric_key} className="rounded-2xl border p-6 text-center">
            <div className="text-3xl font-bold">
              {m.current_value}
              {m.unit ? ` ${m.unit}` : ""}
            </div>
            <div className="mt-1 text-sm opacity-70">{m.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
