"use client";

type stat = { label: string; value: string };

type StatsProps = {
  title?: string;
  stats?: stat[];
};
export default function Stats(props: StatsProps) {
  const { title, stats = [] } = props;

  if (!Array.isArray(stats) || stats.length === 0) return null;
  return (
    <section className="mx-auto max-w-6xl px-4">
      {title && <h2 className="mb-6 text-3xl font-semibold">{title}</h2>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="rounded-2xl border p-6 text-center">
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="mt-1 text-sm opacity-70">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
