// src/app/[slug]/page.tsx
import PageBuilder from "@/components/site/PageBuilder";
import { getPageBySlug } from "@/lib/queries/page";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const doc = await getPageBySlug(params.slug);
  if (!doc) return notFound();
  return <PageBuilder content={doc.content} />;
}
