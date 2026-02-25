import PageBuilder from "@/components/site/PageBuilder";
import { getPageBySlug } from "@/lib/queries/page";
import { getAllMissions } from "@/lib/queries/missions-index";
import { teamListQuery } from "@/lib/queries/team";
import { getAllPartners } from "@/lib/queries/partners-index";
import {
  initiativesListQuery,
  eventsListQuery,
  jobsListQuery,
} from "@/lib/sanity.queries";
import { getServerClient } from "@/lib/sanity.preview";

export default async function Page() {
  const page = await getPageBySlug("home");
  if (!page) return null;

  const client = await getServerClient();

  const [missions, initiatives, events, team, partners, jobs] = await Promise.all(
    [
      getAllMissions(),
      client.fetch(initiativesListQuery),
      client.fetch(eventsListQuery),
      client.fetch(teamListQuery),
      getAllPartners(),
      client.fetch(jobsListQuery),
    ]
  );

  return (
    <PageBuilder
      content={page.content}
      context={{ missions, initiatives, events, team, partners, jobs }}
    />
  );
}