import PartnerDetail from "@/components/templates/PartnerDetail";
import { getPartnerBySlug } from "@/lib/queries/partner";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const partner = await getPartnerBySlug(slug);
  if (!partner) return notFound();

  return <PartnerDetail partner={partner} />;
}
