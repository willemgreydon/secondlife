"use client";

import InitiativesGrid from "./InitiativesGrid";

export default function InitiativesSection({
  title,
  initiatives = [],
  limit = 100,
}: {
  title?: string;
  initiatives?: any[];
  limit?: number;
}) {
  return (
    <section className="py-10 md:py-16">
      <InitiativesGrid title={title} initiatives={initiatives} limit={limit} />
    </section>
  );
}
