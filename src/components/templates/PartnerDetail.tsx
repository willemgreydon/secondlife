// src/components/templates/PartnerDetail.tsx

"use client";

import PageBuilder from "@/components/site/PageBuilder";

export default function PartnerDetail({ partner }: { partner: any }) {
  if (!partner) {
    return (
      <div className="py-16 text-center text-gray-500 dark:text-gray-300">
        Partner not found.
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors">
      {Array.isArray(partner.content) && partner.content.length > 0 && (
        <PageBuilder content={partner.content} />
      )}
    </div>
  );
}