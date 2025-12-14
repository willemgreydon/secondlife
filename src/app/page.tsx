import PageBuilder from "@/components/site/PageBuilder";
import { getPageBySlug } from "@/lib/queries/page";
import { getAllMissions } from "@/lib/queries/missions-index";
import { initiativesListQuery, eventsListQuery } from "@/lib/sanity.queries";
import { teamListQuery } from "@/lib/queries/team";
import { getAllPartners } from "@/lib/queries/partners-index";
import { getServerClient } from "@/lib/sanity.preview";

export default async function Page() {
  const page = await getPageBySlug("home");
  if (!page) return null;

  const client = await getServerClient();

  const [missions, initiatives, events, team, partners] = await Promise.all([
    getAllMissions(),
    getAllPartners(),
    client.fetch(initiativesListQuery),
    client.fetch(eventsListQuery),
    client.fetch(teamListQuery),
  ]);

  return (
    <PageBuilder
      content={page.content}
      context={{ missions, initiatives, events, team, partners }}
    />
  );
}
