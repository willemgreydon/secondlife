"use client";
import Portable from "@/components/cms/Portable";

type TextBlockProps = {
  title?: string;
  body?: any[];
};

export default function TextBlock(props: TextBlockProps) {
  const { title, body } = props;

  return (
    <section className="mx-auto max-w-3xl px-4">
      {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
      {Array.isArray(body) && body.length > 0 && <Portable value={body} />}
    </section>
  );
}
