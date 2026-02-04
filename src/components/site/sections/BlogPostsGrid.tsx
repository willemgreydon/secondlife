import Link from "next/link";

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverUrl?: string;
  publishedAt?: string;
};

type Props = {
  title?: string;
  intro?: string;
  posts: BlogPost[];
};

export default function BlogPostsGrid({ title, intro, posts }: Props) {
  if (!posts?.length) return null;

  return (
    <section className="container mx-auto px-4 mb-16">
      {(title || intro) && (
        <header className="mb-8 max-w-2xl">
          {title && <h2 className="text-3xl font-semibold">{title}</h2>}
          {intro && <p className="mt-2 text-gray-600">{intro}</p>}
        </header>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl overflow-hidden border hover:shadow-lg transition"
          >
            {post.coverUrl && (
              <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                <img
                  src={post.coverUrl}
                  alt={post.title}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              </div>
            )}

            <div className="p-5">
              <h3 className="text-lg font-medium">{post.title}</h3>
              {post.excerpt && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
