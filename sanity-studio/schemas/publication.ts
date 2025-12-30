// /sanity/schemas/publication.ts

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
      description:
        'Short abstract explaining the focus and relevance of this publication.',
    }),

    defineField({
      name: 'pdf',
      title: 'Publication PDF',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Optional tags such as Circular Economy, Plastic Pollution, Marine Protection, Policy.',
    }),

    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'German', value: 'de' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'radio',
      },
      initialValue: 'en',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      date: 'publishedAt',
    },
    prepare({ title, date }) {
      return {
        title,
        subtitle: date ? `Published ${date}` : 'No date set',
      }
    },
  },
})
