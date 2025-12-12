import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/queries/page";
import PageBuilder from "@/components/site/PageBuilder";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const page = await getPageBySlug(slug);

  if (!page) {
    return notFound();
  }

  return (
    <PageBuilder content={page.content} />
  );
}
