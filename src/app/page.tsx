import PageBuilder from "@/components/site/PageBuilder";
import { getHomePage } from "@/lib/queries/home";
import { getAllMissions } from "@/lib/queries/missions-index";
import { initiativesListQuery, eventsListQuery } from "@/lib/sanity.queries";
import { getServerClient } from "@/lib/sanity.preview";

export default async function Page() {
  const page = await getHomePage();

  const client = await getServerClient();

  const [missions, initiatives, events] = await Promise.all([
    getAllMissions(),
    client.fetch(initiativesListQuery),
    client.fetch(eventsListQuery),
  ]);

  return (
    <PageBuilder
      content={page.content}
      context={{ missions, initiatives, events }}
    />
  );
}
