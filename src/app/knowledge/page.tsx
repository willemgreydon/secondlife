// src/app/knowledge/page.tsx

import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/queries/page";
import PageBuilder from "@/components/site/PageBuilder";
import { getAllPolicyBriefs } from "@/lib/queries/policy-briefs";
import { getAllPublications } from "@/lib/queries/publications";

export default async function KnowledgePage() {
  const page = await getPageBySlug("knowledge");
  if (!page) return notFound();

  const policyBriefs = await getAllPolicyBriefs();
  const publications = await getAllPublications();

  const knowledgeItems = [
    ...policyBriefs.map(item => ({
      ...item,
      type: "policyBrief" as const,
    })),
    ...publications.map(item => ({
      ...item,
      type: "publication" as const,
    })),
  ].sort(
    (a, b) =>
      new Date(b.publishedAt ?? 0).getTime() -
      new Date(a.publishedAt ?? 0).getTime()
  );

  return (
    <PageBuilder
      content={page.content}
      context={{ knowledgeItems }}
    />
  );
}
