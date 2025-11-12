import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'missionsSection',
  title: 'Missions Grid (legacy name)',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'status', title: 'Filter by Status', type: 'string',
      options: { list: ['planned','active','successful','all'] }}),
    defineField({ name: 'limit', title: 'Limit', type: 'number' }),
    defineField({ name: 'showMetrics', title: 'Show metrics on cards', type: 'boolean', initialValue: true }),
    defineField({
      name: 'missions', title: 'Missions (optional manual pick)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'mission' }] }],
    }),
  ],
})
