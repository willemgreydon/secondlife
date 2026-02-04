import { defineType, defineField } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
  name: "blogPostsGridSection",
  title: "Blog Posts Grid",
  type: "object",
  icon: Newspaper,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section title",
    }),
    defineField({
      name: "intro",
      type: "text",
      title: "Intro text",
      rows: 3,
    }),
    defineField({
      name: "limit",
      type: "number",
      title: "Number of posts",
      initialValue: 6,
      validation: r => r.min(1).max(24),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "Blog Posts Grid",
        subtitle: "Latest blog posts",
      };
    },
  },
});
