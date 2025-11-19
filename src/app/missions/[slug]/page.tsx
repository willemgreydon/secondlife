import MissionDetail from "@/components/templates/MissionDetail";
import { getMissionBySlug } from "@/lib/queries/mission";
import { notFound } from "next/navigation";

type PageProps = { params: { slug: string } };

export default async function Page({ params }: PageProps) {
  const mission = await getMissionBySlug(params.slug);
  if (!mission) return notFound();

  return <MissionDetail mission={mission} />;
}