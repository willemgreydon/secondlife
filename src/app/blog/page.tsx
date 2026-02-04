import GenericPage from "@/components/templates/GenericPage";
import { getPageWithContentBySlug } from "@/lib/queries/page";
import { notFound } from "next/navigation";

export default async function Page() {
  const doc = await getPageWithContentBySlug("blog");
  if (!doc) return notFound();

  return <GenericPage doc={doc} />;
}
