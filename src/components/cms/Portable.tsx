"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = urlFor(value)?.width(1600).quality(80).url();
      if (!src) return null;
      return (
        <div className="my-6 overflow-hidden rounded-2xl">
          <Image src={src} alt={value?.alt || ""} width={1600} height={900} className="w-full h-auto" />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => <h2 className="mt-8 text-2xl md:text-3xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 text-xl md:text-2xl font-semibold">{children}</h3>,
    normal: ({ children }) => <p className="mt-4 text-gray-700 dark:text-gray-300">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 pl-4 italic text-gray-600 dark:text-gray-300">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc pl-6 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal pl-6 space-y-1">{children}</ol>,
  },
};

export default function Portable({ value }: { value: any[] }) {
  return <PortableText value={value} components={components} />;
}