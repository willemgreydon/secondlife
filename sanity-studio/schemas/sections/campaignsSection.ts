// sanity-studio/schemas/sections/campaignsSection.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'campaignsSection',
  title: 'Campaigns Grid',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({
      name: 'status',
      title: 'Filter by Status',
      type: 'string',
      options: {
        list: [
          {title: 'All', value: 'all'},
          {title: 'Planned', value: 'planned'},
          {title: 'Active', value: 'active'},
          {title: 'Successful', value: 'successful'},
        ],
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'limit',
      title: 'Limit',
      type: 'number',
      initialValue: 12,
      validation: (Rule) => Rule.min(1).max(100),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Campaigns Grid'}
    },
  },
})
