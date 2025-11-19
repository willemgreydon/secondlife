import BasePage from "./BasePage";

export default function EventsIndexPage({ doc }: { doc: any }) {
  return (
    <BasePage
      doc={doc}
      context={{
        events: doc.events || [],
      }}
    />
  );
}
