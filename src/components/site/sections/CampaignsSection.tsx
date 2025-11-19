// src/components/site/sections/CampaignsSection.tsx

"use client";

import CampaignGrid, { CampaignGridProps } from "./CampaignGrid";

type CampaignsSectionProps = {
  title?: string;
  campaigns?: CampaignGridProps["campaigns"];
  limit?: number;
};

export default function CampaignsSection({
  title,
  campaigns = [],
  limit = 100,
}: CampaignsSectionProps) {
  return (
    <CampaignGrid
      title={title}
      campaigns={campaigns}
      limit={limit}
    />
  );
}
