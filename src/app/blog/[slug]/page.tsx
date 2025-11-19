import BlogPost from "@/components/templates/BlogPost";
import { getPostBySlug } from "@/lib/queries/blog-post";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: PageProps) {
  const { slug } = await props.params;

  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  return <BlogPost post={post} />;
}
