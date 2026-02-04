import Link from "next/link"
import PageBuilder from "@/components/site/PageBuilder"

type BlogPostProps = {
  post: {
    _type?: string
    title: string
    excerpt?: string
    content?: any[] | null
  }
}

export default function BlogPost({ post }: BlogPostProps) {
  const content = Array.isArray(post.content) ? post.content : []

  return (
    <article className="bg-white dark:bg-black mb-16">
      {/* Header */}
      <header className="mx-auto max-w-3xl px-6 pt-20 pb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-4 text-base opacity-80">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* Content */}
      {content.length > 0 && (
        <PageBuilder content={content} />
      )}

      {/* Back to overview – secondary action */}
      <div className="mx-auto max-w-3xl px-6 pt-16 pb-4 flex justify-center">
        <Link
          href="/blog"
          className="
            inline-flex items-center gap-2
            rounded-full
            border border-black/15 dark:border-white/20
            px-5 py-2.5
            text-sm font-medium
            text-black/80 dark:text-white/80
            hover:bg-black/5 dark:hover:bg-white/10
            transition
          "
        >
          <span aria-hidden>←</span>
          <span>Back to overview</span>
        </Link>
      </div>
    </article>
  )
}
