import CampaignDetail from "@/components/templates/CampaignDetail";
import { getCampaignBySlug } from "@/lib/queries/campaign";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const campaign = await getCampaignBySlug(slug);
  if (!campaign) return notFound();

  return <CampaignDetail campaign={campaign} />;
}
