import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'campaignGrid',
  title: 'Campaigns Grid',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'limit', title: 'Limit', type: 'number' }),
    defineField({
      name: 'campaigns', title: 'Campaigns (optional manual pick)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'campaign' }] }],
    }),
  ],
})
