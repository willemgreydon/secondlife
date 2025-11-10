import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'missionsGrid',
  title: 'Missions Grid',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'limit', title: 'Max items', type: 'number', initialValue: 100 }),
    defineField({
      name: 'onlyStatus',
      title: 'Filter by status (optional)',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Planned', value: 'planned' },
          { title: 'Archived', value: 'archived' },
        ],
      },
    }),
  ],
  preview: { select: { title: 'title' }, prepare: s => ({ title: s.title || 'Missions Grid' }) },
})