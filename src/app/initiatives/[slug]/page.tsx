import InitiativeDetail from "@/components/templates/InitiativeDetail";
import { getInitiativeBySlug } from "@/lib/queries/initiative";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const initiative = await getInitiativeBySlug(slug);
  if (!initiative) return notFound();

  return <InitiativeDetail initiative={initiative} />;
}
