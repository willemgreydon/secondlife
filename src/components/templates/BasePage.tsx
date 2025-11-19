import PageBuilder from "@/components/site/PageBuilder";

export default function BasePage({
  doc,
  context = {},
}: {
  doc: any;
  context?: any;
}) {
  if (!doc) return null;

  return (
    <main>
      {doc.content && (
        <PageBuilder content={doc.content} context={context} />
      )}
    </main>
  );
}
