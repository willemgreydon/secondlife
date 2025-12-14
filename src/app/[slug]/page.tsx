import { notFound } from "next/navigation";
import PageBuilder from "@/components/site/PageBuilder";
import { getPageBySlug } from "@/lib/queries/page";
import { getAllMissions } from "@/lib/queries/missions-index";
import { teamListQuery } from "@/lib/queries/team";
import { getAllPartners } from "@/lib/queries/partners-index";
import { initiativesListQuery, eventsListQuery } from "@/lib/sanity.queries";
import { getServerClient } from "@/lib/sanity.preview";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const page = await getPageBySlug(slug);
  if (!page) return notFound();

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
