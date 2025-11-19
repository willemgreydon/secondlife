"use client";

import MissionsGrid from "./MissionsGrid";

export default function MissionsSection({
  title,
  missions = [],
  status = "all",
  limit = 100,
  showMetrics,
}: {
  title?: string;
  missions?: any[];
  status?: string;
  limit?: number;
  showMetrics?: boolean;
}) {
  return (
    <section className="py-10 md:py-16">
      <MissionsGrid
        title={title}
        missions={missions}
        status={status}
        limit={limit}
      />
    </section>
  );
}
