// src/components/templates/PartnerDetail.tsx

"use client";

import Image from "next/image";

export default function PartnerDetail({ partner }: { partner: any }) {
  if (!partner) {
    return (
      <div className="py-16 text-center text-gray-500 dark:text-gray-300">
        Partner not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">{partner.title}</h1>

      {partner.logo && (
        <div className="relative h-40 w-60 mb-8">
          <Image
            src={partner.logo}
            alt={partner.title}
            fill
            className="object-contain"
          />
        </div>
      )}

      {partner.url && (
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline dark:text-blue-400"
        >
          Visit Partner Website
        </a>
      )}

      {partner.description && (
        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {partner.description}
        </p>
      )}
    </div>
  );
}
