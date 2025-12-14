import { notFound } from "next/navigation";
import { getMissionBySlug } from "@/lib/queries/getMissionBySlug";
import { getPageBySlug } from "@/lib/queries/page";
import MissionDetail from "@/components/templates/MissionDetail";
import PageBuilder from "@/components/site/PageBuilder";
import { getAllMissions } from "@/lib/queries/missions-index";
import { getAllPartners } from "@/lib/queries/partners-index";
import { initiativesListQuery, eventsListQuery } from "@/lib/sanity.queries";
import { teamListQuery } from "@/lib/queries/team";
import { getServerClient } from "@/lib/sanity.preview";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Missions that are authored as full editorial pages
 * (they exist as `page` documents, not `mission`)
 */
const PAGE_LIKE_MISSIONS = new Set([
  "revolutionizing-beach-cleanups",
  "mission-tide",
  "dana-24-vlc",
]);

export default async function MissionPage({ params }: Props) {
  const { slug } = await params;
  const client = await getServerClient();

  // Shared context
  const [missions, initiatives, events, team, partners] = await Promise.all([
    getAllMissions(),
    client.fetch(initiativesListQuery),
    client.fetch(eventsListQuery),
    client.fetch(teamListQuery),
    getAllPartners(),
  ]);

  // 1️⃣ Page-style missions
  if (PAGE_LIKE_MISSIONS.has(slug)) {
    const page = await getPageBySlug(slug);
    if (!page) return notFound();

    return (
      <PageBuilder
        content={page.content}
        context={{ missions, initiatives, events, team, partners }}
      />
    );
  }

  // 2️⃣ Normal missions
  const mission = await getMissionBySlug(slug);
  if (!mission) return notFound();

  return <MissionDetail mission={mission} />;
}
