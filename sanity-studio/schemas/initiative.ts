import { defineType, defineField } from "sanity";

export default defineType({
  name: "initiative",
  type: "document",
  title: "Initiative",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text" }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 } }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "cover", type: "image", options: { hotspot: true } }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
});