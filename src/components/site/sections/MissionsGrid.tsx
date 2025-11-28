"use client";

import Image from "next/image";

type Mission = {
  _id: string;
  title: string;
  slug: string;
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

export default function MissionsGrid(props: MissionsGridProps) {
  const { title, missions = [], status = "all", limit = 100 } = props;
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {missions.slice(0, limit).map((mission) => (
            <a key={mission._id} href={`/missions/${mission.slug}`} className="block rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition">
              {mission.coverUrl && (
                <div className="relative h-48 w-full">
                  <Image src={mission.coverUrl} alt={mission.title} fill className="object-cover" />
                </div>
              )}

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{mission.title}</h3>

                {mission.status && <p className="text-sm text-gray-500 mb-2">Status: {mission.status}</p>}

                <div className="text-sm text-gray-700">
                  {mission.wasteCollectedKg !== undefined && <div>Waste: {mission.wasteCollectedKg} kg</div>}
                  {mission.volunteers !== undefined && <div>Volunteers: {mission.volunteers}</div>}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
