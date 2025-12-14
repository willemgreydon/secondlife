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
  status?: string;     // ✅ ADD
  limit?: number;
};

export default function MissionsGrid({
  title,
  missions = [],
  status = "all",
  limit = 100,
}: MissionsGridProps) {
  if (!Array.isArray(missions)) return null;

  // ✅ STATUS FILTER (editor-driven)
  const filtered =
    status && status !== "all"
      ? missions.filter((m) => m.status === status)
      : missions;

  const safeMissions = filtered.slice(0, limit);

  if (!safeMissions.length) return null;

  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {safeMissions.map((m, i) => (
            <a
              key={m._key || m._id || i}
              href={m.slug ? `/missions/${m.slug}` : "#"}
              className="block rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition"
            >
              {m.coverUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={m.coverUrl}
                    alt={m.title ?? ""}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{m.title}</h3>

                {m.status && (
                  <p className="text-sm text-gray-500 mb-2">
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
