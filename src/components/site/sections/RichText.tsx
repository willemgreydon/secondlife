"use client";
import { PortableText } from "@portabletext/react";

type RichTextProps = {
  title?: string;
  body?: any[];
};

export default function RichText(props: RichTextProps) {
  const { title, body } = props;

  if (!title && !body?.length) return null;

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      {title && (
        <h2 className="mb-6 text-2xl font-semibold">
          {title}
        </h2>
      )}

      {body?.length ? (
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <PortableText
            value={body}
            components={{
              list: {
                bullet: ({ children }) => (
                  <ul className="list-disc ml-6 space-y-2 mb-6">
                    {children}
                  </ul>
                ),
                number: ({ children }) => (
                  <ol className="list-decimal ml-6 space-y-2 mb-6">
                    {children}
                  </ol>
                ),
              },
              listItem: {
                bullet: ({ children }) => <li>{children}</li>,
                number: ({ children }) => <li>{children}</li>,
              },
            }}
          />
        </div>
      ) : null}
    </section>
  );
}