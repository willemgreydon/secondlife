type MissionsIndexPageProps = {
  missions: any[];
};

export default function MissionsIndexPage({ missions }: MissionsIndexPageProps) {
  return (
    <div className="max-w-7xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">Missions</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {missions.map((mission) => (
          <div key={mission._id} className="border p-4 rounded-lg shadow">
            {mission.coverUrl && (
              <img
                src={mission.coverUrl}
                alt={mission.title}
                className="rounded mb-4"
              />
            )}

            <h2 className="text-xl font-semibold">{mission.title}</h2>

            {mission.excerpt && (
              <p className="text-sm mt-2 opacity-80">{mission.excerpt}</p>
            )}

            <a
              href={`/missions/${mission.slug}`}
              className="text-blue-600 font-medium mt-4 inline-block"
            >
              View Mission →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
