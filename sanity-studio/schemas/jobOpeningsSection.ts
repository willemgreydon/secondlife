import { defineType, defineField } from "sanity";

export default defineType({
  name: "jobOpeningsSection",
  title: "Job Openings Section",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      type: "string",
      initialValue: "Open Positions",
    }),
    defineField({
      name: "showOnlyOpen",
      type: "boolean",
      initialValue: true,
    }),
  ],
});