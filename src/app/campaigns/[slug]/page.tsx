import CampaignDetail from "@/components/templates/CampaignDetail";
import { getCampaignBySlug } from "@/lib/queries/campaign";
import { notFound } from "next/navigation";

type PageProps = { params: { slug: string } };

export default async function Page({ params }: PageProps) {
  const campaign = await getCampaignBySlug(params.slug);
  if (!campaign) return notFound();

  return <CampaignDetail campaign={campaign} />;
}
