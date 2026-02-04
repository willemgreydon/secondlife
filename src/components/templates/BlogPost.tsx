import PageBuilder from "@/components/site/PageBuilder";

type BlogPostProps = {
  post: {
    _type?: string;
    title: string;
    excerpt?: string;
    content?: any[] | null;
  };
};

export default function BlogPost({ post }: BlogPostProps) {
  const content = Array.isArray(post.content) ? post.content : [];

  return (
    <article className="bg-white dark:bg-black mb-16">
      <header className="mx-auto max-w-3xl px-6 pt-20 pb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        {post.excerpt && (
          <p className="mt-4 text-base opacity-80">{post.excerpt}</p>
        )}
      </header>

      {content.length > 0 && <PageBuilder content={content} />}
    </article>
  );
}
