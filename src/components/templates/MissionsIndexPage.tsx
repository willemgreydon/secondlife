// src/components/templates/MissionsIndexPage.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

type Mission = {
  _id: string;
  title: string;
  slug: string;
  status?: string;
  excerpt?: string;
  coverUrl?: string | null;
  wasteCollectedKg?: number | null;
  volunteers?: number | null;
};

type MissionsIndexPageProps = {
  missions: Mission[];
};

export default function MissionsIndexPage({ missions }: MissionsIndexPageProps) {
  const hasMissions = Array.isArray(missions) && missions.length > 0;

  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Missions</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Overview of all Second Life missions, including status, collected plastic and
            volunteers. Click a card to see the full mission story.
          </p>
        </header>

        {!hasMissions && (
          <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
            No missions found yet. Once missions are published in Sanity, they will appear here.
          </div>
        )}

        {hasMissions && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {missions.map((mission) => {
              const waste =
                typeof mission.wasteCollectedKg === "number"
                  ? Math.round(mission.wasteCollectedKg)
                  : 0;
              const volunteers = mission.volunteers ?? 0;

              const hasCover = !!mission.coverUrl;

              return (
                <Link
                  key={mission._id}
                  href={`/missions/${mission.slug}`}
                  className="group block overflow-hidden rounded-xl border bg-white/80 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80"
                >
                  {/* Bildbereich */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                    {hasCover ? (
                      <Image
                        src={mission.coverUrl as string}
                        alt={mission.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-300 group-hover:scale-[1.03] group-hover:brightness-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs text-gray-500 dark:text-gray-400">
                        No image available for this mission
                      </div>
                    )}
                  </div>

                  {/* Text / Status / Metrics */}
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h2 className="line-clamp-2 text-base font-semibold leading-snug">
                        {mission.title}
                      </h2>

                      {mission.status && (
                        <span className="whitespace-nowrap rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium capitalize text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
                          {mission.status}
                        </span>
                      )}
                    </div>

                    {mission.excerpt && (
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {mission.excerpt}
                      </p>
                    )}

                    {/* Metrics – wie auf der Startseite */}
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-md bg-gray-100 px-3 py-2 text-center text-xs dark:bg-gray-800">
                        <div className="text-base font-bold">{waste}</div>
                        <div className="opacity-70">Kg Collected</div>
                      </div>

                      <div className="rounded-md bg-gray-100 px-3 py-2 text-center text-xs dark:bg-gray-800">
                        <div className="text-base font-bold">{volunteers}</div>
                        <div className="opacity-70">Volunteers</div>
                      </div>
                    </div>

                    <div className="mt-4 text-sm font-medium text-primary">
                      <span className="inline-flex items-center gap-1">
                        View mission
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
