type CampaignDetailProps = {
  campaign: any;
};

export default function CampaignDetail({ campaign }: CampaignDetailProps) {
  return (
    <div>
      <h1>{campaign.title}</h1>
      <p>{campaign.excerpt}</p>
    </div>
  );
}
