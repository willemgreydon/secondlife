// src/app/missions/[slug]/page.tsx
import MissionDetail from "@/components/templates/MissionDetail";
import { getMissionBySlug } from "@/lib/queries/mission";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const mission = await getMissionBySlug(slug);
  if (!mission) return notFound();

  return <MissionDetail mission={mission} />;
}
