// src/components/site/sections/TeamGrid.tsx
type Member = {
  _id: string
  name: string
  role?: string
  image?: string
  linkedin?: string
  bio?: any
}

export default function TeamGrid({ title, members = [] as Member[] }) {
  if (!members.length) return null

  return (
    <section className="container mx-auto px-4 py-10">
      {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <article key={m._id} className="rounded-xl border p-4">
            {m.image && (
              <img
                src={m.image}
                alt={m.name}
                className="mb-3 h-40 w-full rounded-lg object-cover"
              />
            )}
            <div className="font-medium">{m.name}</div>
            {m.role && <div className="text-sm text-muted-foreground">{m.role}</div>}
            {m.linkedin && (
              <a
                href={m.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm text-[var(--brand-primary)] hover:underline"
              >
                LinkedIn
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
