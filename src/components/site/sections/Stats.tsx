"use client";

type Stat = { label: string; value: string };

type StatsProps = {
  title?: string;
  stats?: Stat[];
};

export default function Stats({ title, stats = [] }: StatsProps) {
  if (!Array.isArray(stats) || stats.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 bg-background dark:bg-black">
      {title && (
        <h2 className="mb-6 text-3xl font-semibold text-foreground dark:text-white">
          {title}
        </h2>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={i}
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
              {s.value}
            </div>

            <div className="mt-1 text-sm text-muted-foreground dark:text-neutral-300">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
