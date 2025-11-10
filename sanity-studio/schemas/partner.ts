import { defineType, defineField } from "sanity";

export default defineType({
  name: "partner",
  type: "document",
  title: "Partner",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "url", type: "url" }),
  ],
});