"use client";

import Image from "next/image";
import Link from "next/link";

type MissionCardProps = {
  mission: {
    title: string;
    slug: string;
    excerpt?: string;
    coverUrl?: string;
    plasticCollectedKg?: number;
    volunteers?: number;
    droneFlights?: number;
  };
};

export default function MissionCard({ mission }: MissionCardProps) {
  return (
    <Link
      href={`/missions/${mission.slug}`}
      className="group block overflow-hidden rounded-xl bg-card text-card-foreground shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {mission.coverUrl ? (
          <Image
            src={mission.coverUrl}
            alt={mission.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-1 text-lg font-semibold">{mission.title}</h3>

        {mission.excerpt && (
          <p className="text-sm text-muted-foreground">{mission.excerpt}</p>
        )}

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>{mission.plasticCollectedKg ?? 0} kg</span>
          <span>{mission.volunteers ?? 0} Volunteers</span>
        </div>
      </div>
    </Link>
  );
}
