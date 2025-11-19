// src/app/partners/page.tsx
import PartnersIndexPage from "@/components/templates/PartnersIndexPage";
import { partnersListQuery } from "@/lib/sanity.queries";
import { client } from "@/lib/sanity.client";

export default async function Page() {
  const partners = await client.fetch(partnersListQuery);
  return <PartnersIndexPage partners={partners} />;
}
