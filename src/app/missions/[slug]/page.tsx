import { getMissionBySlug } from "@/lib/queries/getMissionBySlug";
import MissionDetail from "@/components/templates/MissionDetail";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const mission = await getMissionBySlug(slug);
  
  if (!mission) return notFound();
  return <MissionDetail mission={mission} />;
}
