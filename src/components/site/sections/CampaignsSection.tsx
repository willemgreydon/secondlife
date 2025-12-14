"use client";

import CampaignGrid, { Campaign } from "./CampaignGrid";

type CampaignsSectionProps = {
  title?: string;
  campaigns?: Campaign[];
  limit?: number;
};

export default function CampaignsSection({
  title,
  campaigns = [],
  limit = 100,
}: CampaignsSectionProps) {
  if (!Array.isArray(campaigns) || campaigns.length === 0) {
    return null;
  }

  return (
    <CampaignGrid
      title={title}
      campaigns={campaigns}
      limit={limit}
    />
  );
}
