import BlogPost from "@/components/templates/BlogPost";
import { getPostBySlug } from "@/lib/queries/blog-post";
import { notFound } from "next/navigation";

type PageProps = { params: { slug: string } };

export default async function Page({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return <BlogPost post={post} />;
}
