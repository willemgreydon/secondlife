type BlogPostProps = {
  post: any;
};

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article>
      <h1>{post.title}</h1>
      {/* content sections */}
    </article>
  );
}
