import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/queries/page";
import PageBuilder from "@/components/site/PageBuilder";
import { getAllMissions } from "@/lib/queries/missions-index";

export default async function MissionsPage() {
  const page = await getPageBySlug("missions");
  if (!page) return notFound();

  const missions = await getAllMissions();

  return (
    <PageBuilder
      content={page.content}
      context={{ missions }}
    />
  );
}
