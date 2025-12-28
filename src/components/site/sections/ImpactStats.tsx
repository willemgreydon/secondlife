"use client";

type Metric = {
  metric_key: string;
  title: string;
  current_value: number;
  unit?: string;
};

type ImpactStatsProps = {
  title?: string;
  metrics?: Metric[];
};

export default function ImpactStats({
  title = "Impact So Far",
  metrics = [],
}: ImpactStatsProps) {
  if (!Array.isArray(metrics) || metrics.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 bg-background dark:bg-black">
      {title && (
        <h2 className="mb-6 text-3xl font-semibold text-foreground dark:text-white">
          {title}
        </h2>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.metric_key}
            className="
              rounded-2xl
              border border-border
              bg-card
              p-6
              text-center
              dark:bg-neutral-900
            "
          >
            <div className="text-3xl font-bold text-foreground dark:text-white">
              {m.current_value}
              {m.unit ? ` ${m.unit}` : ""}
            </div>

            <div className="mt-1 text-sm text-muted-foreground dark:text-neutral-300">
              {m.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
