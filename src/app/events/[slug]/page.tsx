import EventDetail from "@/components/templates/EventDetail";
import { getEventBySlug } from "@/lib/queries/event";
import { notFound } from "next/navigation";

type PageProps = { params: { slug: string } };

export default async function Page({ params }: PageProps) {
  const event = await getEventBySlug(params.slug);
  if (!event) return notFound();

  return <EventDetail event={event} />;
}
