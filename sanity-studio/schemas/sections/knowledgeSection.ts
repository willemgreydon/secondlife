import { defineType, defineField } from "sanity";

export default defineType({
  name: "knowledgeSection",
  title: "Knowledge Overview",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Knowledge",
    }),
    defineField({
      name: "intro",
      title: "Intro Text",
      type: "text",
      rows: 3,
    }),
  ],
});
