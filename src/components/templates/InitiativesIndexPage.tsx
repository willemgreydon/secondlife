import BasePage from "./BasePage";

export default function InitiativesIndexPage({ doc }: { doc: any }) {
  return (
    <BasePage
      doc={doc}
      context={{
        initiatives: doc.initiatives || [],
      }}
    />
  );
}
