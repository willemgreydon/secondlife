// app/events/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/queries/event";
import EventDetail from "@/components/templates/EventDetail";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params; // ✅ REQUIRED in Next 15

  const event = await getEventBySlug(slug);
  if (!event) return notFound();

  return <EventDetail event={event} />;
}
