import EventDetail from "@/components/templates/EventDetail";
import { getEventBySlug } from "@/lib/queries/event";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const event = await getEventBySlug(slug);
  if (!event) return notFound();

  return <EventDetail event={event} />;
}
