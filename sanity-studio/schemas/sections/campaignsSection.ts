import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'campaignsSection',
  title: 'Campaigns Grid',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'limit', type: 'number'}),
  ],
  preview: {select: {title: 'title'}},
})
