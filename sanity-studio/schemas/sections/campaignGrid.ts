import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'campaignGrid',
  title: 'Campaigns Grid',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'onlyStatus',
      title: 'Filter by status (optional)',
      type: 'string',
      options: { list: ['active', 'planned', 'archived'] },
    }),
  ],
})
