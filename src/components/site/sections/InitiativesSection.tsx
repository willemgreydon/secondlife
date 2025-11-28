"use client";

import InitiativesGrid from "./InitiativesGrid";

type InitiativesSectionProps = {
  title?: string;
  initiatives?: any[];
  limit?: number;
};

export default function InitiativesSection(props: InitiativesSectionProps) {
  const { title, initiatives = [], limit = 100 } = props;
  return (
    <section className="py-10 md:py-16">
      <InitiativesGrid title={title} initiatives={initiatives} limit={limit} />
    </section>
  );
}
