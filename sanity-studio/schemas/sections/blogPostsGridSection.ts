import { defineType, defineField } from "sanity"
import { Newspaper } from "lucide-react"

export default defineType({
  name: "blogPostsGridSection",
  title: "Blog Posts Grid",
  type: "object",
  icon: Newspaper,

  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "limit",
      type: "number",
      initialValue: 6,
      validation: (r) => r.min(1).max(24),
    }),
  ],
})
