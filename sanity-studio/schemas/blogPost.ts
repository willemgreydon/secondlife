import { defineType, defineField } from "sanity"
import { FileText } from "lucide-react"

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: FileText,

  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),

    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
    }),

    // ✅ NEW: teaser / cover image
    defineField({
      name: "cover",
      title: "Teaser Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: "content",
      title: "Content (Sections)",
      type: "array",
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
    select: {
      title: "title",
      media: "cover",
    },
  },
})
