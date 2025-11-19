// src/components/templates/MissionCard.tsx
import Image from "next/image";
import Link from "next/link";

export default function MissionCard({ mission }: { mission: any }) {
  const {
    slug,
    title,
    cover,
    wasteCollectedKg,
    volunteers,
    status,
  } = mission;

  return (
    <Link
      href={`/missions/${slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 shadow-sm transition hover:shadow-lg dark:border-gray-800"
    >
      {/* Image */}
      {cover && (
        <div className="relative h-48 w-full">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover transition group-hover:brightness-110"
          />
        </div>
      )}

      {/* Body */}
      <div className="space-y-3 p-5">
        <div className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
          {status}
        </div>

        <h3 className="text-lg font-bold">{title}</h3>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-md bg-gray-100 px-3 py-2 text-center dark:bg-gray-800">
            <div className="font-bold">{wasteCollectedKg ?? 0}</div>
            <div className="text-xs opacity-70">Kg Collected</div>
          </div>

          <div className="rounded-md bg-gray-100 px-3 py-2 text-center dark:bg-gray-800">
            <div className="font-bold">{volunteers ?? 0}</div>
            <div className="text-xs opacity-70">Volunteers</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
