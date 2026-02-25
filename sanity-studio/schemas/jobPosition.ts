import { defineType, defineField } from "sanity";
import { Briefcase } from "lucide-react";

export default defineType({
  name: "jobPosition",
  title: "Job Position",
  type: "document",
  icon: Briefcase,

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: "department",
      title: "Department",
      type: "string",
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Remote",
    }),

    defineField({
      name: "engagementType",
      title: "Engagement Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "Full-time" },
          { title: "Part-time", value: "Part-time" },
          { title: "Volunteer", value: "Volunteer" },
          { title: "Internship", value: "Internship" },
          { title: "Contract", value: "Contract" },
        ],
      },
    }),

    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "isOpen",
      title: "Is Open?",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "order",
      title: "Order (optional)",
      type: "number",
      description: "Used for custom sorting in listings.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "department",
    },
  },
});