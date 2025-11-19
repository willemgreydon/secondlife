// src/app/[slug]/page.tsx
import PageBuilder from "@/components/site/PageBuilder";
import { getPageBySlug } from "@/lib/queries/page";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const doc = await getPageBySlug(slug);
  if (!doc) return notFound();

  return <PageBuilder content={doc.content} />;
}
