import { defineType, defineField } from "sanity"
import { Handshake } from "lucide-react"

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  icon: Handshake,

  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: r => r.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: r => r.required(),
    }),

    defineField({
      name: "logo",
      title: "Logo (Light mode)",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: r => r.required(),
        },
      ],
    }),

    defineField({
      name: "logoDark",
      title: "Logo (Dark mode)",
      description: "Optional white/optimized logo for dark backgrounds",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
        },
      ],
    }),

    defineField({
      name: "website",
      type: "url",
    }),

    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "content",
      title: "Content (Sections)",
      type: "array",
      of: [
        { type: "heroSection" },
        { type: "splitSection" },
        { type: "textBlock" },
        { type: "imageBlock" },
        { type: "gallerySection" },
        { type: "quoteSection" },
      ],
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
})