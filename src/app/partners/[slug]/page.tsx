// partners/[slug]/page.tsx

import { notFound } from "next/navigation";
import PartnerDetail from "@/components/templates/PartnerDetail";
import { getPartnerBySlug } from "@/lib/queries/partner";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const partner = await getPartnerBySlug(slug);

  if (!partner) {
    notFound();
  }

  return <PartnerDetail partner={partner} />;
}