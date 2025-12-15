"use client";
import Image from "next/image";

type Mission = {
  _id?: string;
  _key?: string;
  title?: string;
  slug?: string;
  status?: string;
  coverUrl?: string;
  wasteCollectedKg?: number;
  volunteers?: number;
};

type MissionsGridProps = {
  title?: string;
  missions?: Mission[];
  status?: string;
  limit?: number;
};

export default function MissionsGrid({
  title,
  missions = [],
  status = "all",
  limit = 100,
}: MissionsGridProps) {
  if (!Array.isArray(missions)) return null;

  // Status filter (editor-driven)
  const filtered =
    status && status !== "all"
      ? missions.filter((m) => m.status === status)
      : missions;

  const safeMissions = filtered.slice(0, limit);

  if (!safeMissions.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-4">
      <div className="container mx-auto px-4">
        {title && <h2 className="mb-8 text-3xl font-bold">{title}</h2>}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {safeMissions.map((m, i) => (
            <a
              key={m._key || m._id || i}
              href={m.slug ? `/missions/${m.slug}` : "#"}
              className="block overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg"
            >
              {m.coverUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={m.coverUrl}
                    alt={m.title ?? ""}
                    fill
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 50vw,
                           33vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold">{m.title}</h3>

                {m.status && (
                  <p className="mb-2 text-sm text-gray-500">
                    Status: {m.status}
                  </p>
                )}

                <div className="text-sm text-gray-700">
                  {m.wasteCollectedKg !== undefined && (
                    <div>Waste: {m.wasteCollectedKg} kg</div>
                  )}
                  {m.volunteers !== undefined && (
                    <div>Volunteers: {m.volunteers}</div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
