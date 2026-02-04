import BlogPost from "@/components/templates/BlogPost";
import { getPostBySlug } from "@/lib/queries/blog-post";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) return notFound();

  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  return <BlogPost post={post} />;
}
