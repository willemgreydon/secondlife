import EventsIndexPage from "@/components/templates/EventsIndexPage"
import { getEventsIndex } from "@/lib/queries/events-index"

export default async function Page() {
  const doc = await getEventsIndex()
  return <EventsIndexPage doc={doc} />
}
