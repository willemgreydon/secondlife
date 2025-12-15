import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactFormSection",
  title: "Contact / Join Form",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Form Type",
      type: "string",
      initialValue: "contact",
      options: {
        list: [
          { title: "Contact Form", value: "contact" },
          { title: "Join Mission Form", value: "join" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Get in touch",
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", variant: "variant" },
    prepare({ title, variant }) {
      return {
        title: title || "Contact Form",
        subtitle:
          variant === "join" ? "Join Mission Form" : "Contact Form",
      };
    },
  },
});
