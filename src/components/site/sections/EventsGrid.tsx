"use client";
import Link from "next/link";

type EventItem = {
  _id?: string;
  _key?: string;
  slug?: string;
  title?: string;
  date?: string;
};

export default function EventsGrid({
  title,
  events = [],
}: {
  title?: string;
  events?: EventItem[];
}) {
  const safeEvents = Array.isArray(events) ? events : [];
  if (!safeEvents.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4">
      {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {safeEvents.map((e, i) => (
          <li key={e._key || e._id || i} className="rounded-2xl border p-4">
            {e.slug && (
              <Link href={`/events/${e.slug}`} className="text-lg font-semibold hover:underline">
                {e.title}
              </Link>
            )}
            {e.date && (
              <div className="text-sm opacity-70">
                {new Date(e.date).toLocaleDateString()}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
