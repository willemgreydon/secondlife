import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'missionsSection',
  title: 'Missions Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      initialValue: 'all',
      options: {
        list: [
          { title: 'All', value: 'all' },
          { title: 'Planned', value: 'planned' },
          { title: 'Active', value: 'active' },
          { title: 'Successful', value: 'successful' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'limit',
      type: 'number',
      initialValue: 12,
    }),
    defineField({
      name: 'showMetrics',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', status: 'status' },
    prepare({ title, status }) {
      return {
        title: title || 'Missions Grid',
        subtitle: status ? `Filter: ${status}` : 'Filter: all',
      }
    },
  },
})
