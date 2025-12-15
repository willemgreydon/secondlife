"use client";
import MissionCard from "@/components/missions/MissionCard";

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

  const filtered =
    status !== "all"
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
            <MissionCard
              key={m._key || m._id || i}
              mission={{
                title: m.title ?? "",
                slug: m.slug ?? "",
                coverUrl: m.coverUrl,
                plasticCollectedKg: m.wasteCollectedKg,
                volunteers: m.volunteers,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
