import InitiativeDetail from "@/components/templates/InitiativeDetail";
import { getInitiativeBySlug } from "@/lib/queries/initiative";
import { notFound } from "next/navigation";

type PageProps = { params: { slug: string } };

export default async function Page({ params }: PageProps) {
  const initiative = await getInitiativeBySlug(params.slug);
  if (!initiative) return notFound();

  return <InitiativeDetail initiative={initiative} />;
}
