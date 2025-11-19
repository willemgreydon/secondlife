// src/app/partners/[slug]/page.tsx

import PartnerDetail from "@/components/templates/PartnerDetail";
import { getPartnerBySlug } from "@/lib/queries/partner";
import { notFound } from "next/navigation";

type PartnerPageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PartnerPageProps) {
  const partner = await getPartnerBySlug(params.slug);

  if (!partner) return notFound();

  return <PartnerDetail partner={partner} />;
}
