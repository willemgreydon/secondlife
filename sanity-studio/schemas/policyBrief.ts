// /sanity/schemas/policyBrief.ts

import { defineType, defineField } from "sanity";

export default defineType({
  name: "policyBrief",
  title: "Policy Brief",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "summary",
      title: "Executive Summary",
      type: "text",
      rows: 4,
      description:
        "Short, decision-oriented summary for policymakers and institutions.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "pdf",
      title: "Policy Brief PDF",
      type: "file",
      options: {
        accept: "application/pdf",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "publishedAt",
      title: "Publication Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "region",
      title: "Geographic Scope",
      type: "string",
      description: "e.g. EU, Mediterranean, Global",
    }),

    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Policy areas such as Circular Economy, Plastic Pollution, Marine Protection.",
    }),

    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "German", value: "de" },
          { title: "Other", value: "other" },
        ],
        layout: "radio",
      },
      initialValue: "en",
    }),
  ],

  preview: {
    select: {
      title: "title",
      date: "publishedAt",
      region: "region",
    },
    prepare({ title, date, region }) {
      return {
        title,
        subtitle: [
          region,
          date ? `Published ${date}` : null,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
