import BasePage from "./BasePage";

export default function CampaignsIndexPage({ doc }: { doc: any }) {
  return (
    <BasePage
      doc={doc}
      context={{
        campaigns: doc.campaigns || [],
      }}
    />
  );
}
