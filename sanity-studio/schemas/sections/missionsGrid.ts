import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'missionsGrid',
  title: 'Missions Grid',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Filter by Status',
      options: {
        list: [
          {title: 'All', value: 'all'},
          {title: 'Planned', value: 'planned'},
          {title: 'Active', value: 'active'},
          {title: 'Completed', value: 'completed'},
        ],
        layout: 'radio',
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'limit',
      type: 'number',
      title: 'Max items',
      initialValue: 12,
      validation: (Rule) => Rule.min(1).max(1000),
    }),
    defineField({
      name: 'showMetrics',
      type: 'boolean',
      title: 'Show metrics on cards',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'title', status: 'status', limit: 'limit'},
    prepare: ({title, status, limit}) => ({
      title: title || 'Missions Grid',
      subtitle: `status: ${status ?? 'all'} • limit: ${limit ?? '—'}`,
    }),
  },
})
