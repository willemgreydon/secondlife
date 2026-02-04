import { defineType, defineField } from "sanity";
import { FileText } from "lucide-react";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: FileText,

  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: r => r.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: r => r.required(),
    }),

    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),

    // ✅ PAGEBUILDER CONTENT (FULL SUPPORT)
    defineField({
      name: "content",
      title: "Content (Sections)",
      type: "array",
      options: { sortable: true },
      of: [
        { type: "heroSection" },
        { type: "splitSection" },
        { type: "statsSection" },
        { type: "textBlock" },
        { type: "videoSection" },
        { type: "imageBlock" },
        { type: "gallerySection" },
        { type: "quoteSection" },
        { type: "accordionSection" },
        { type: "contactSection" },
      ],
    }),
  ],

  preview: {
    select: { title: "title" },
  },
});
