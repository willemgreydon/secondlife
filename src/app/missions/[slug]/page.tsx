import { getMissionBySlug } from "@/lib/queries/getMissionBySlug";
import MissionDetail from "@/components/templates/MissionDetail";
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
