export default function MissionsGrid({ title, missions = [] }: { title?: string; missions?: any[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}

      {missions.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No missions yet for this category.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {missions.map(m => (
            <article key={m._id} className="rounded-xl border p-4 hover:shadow-sm transition">
              {m.cover && (
                <img
                  src={m.cover}
                  alt={m.title ?? ''}
                  className="mb-3 aspect-[16/9] w-full rounded-lg object-cover"
                />
              )}
              <h3 className="font-medium">{m.title}</h3>
              {m.status && (
                <span className="mt-1 inline-block rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-zinc-800">
                  {m.status}
                </span>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}