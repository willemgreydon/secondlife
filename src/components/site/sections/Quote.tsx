"use client";

type QuoteProps = {
  quote?: string;
  author?: string;
};

export default function Quote(props: QuoteProps) {
  const { quote, author } = props;

  if (!quote) return null;
  return (
    <section className="mx-auto max-w-3xl px-4">
      <blockquote className="rounded-2xl bg-neutral-100 p-6 text-xl italic dark:bg-neutral-900">
        “{quote}”{author && <footer className="mt-3 text-right text-base not-italic opacity-70">— {author}</footer>}
      </blockquote>
    </section>
  );
}
