import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'team',
  title: 'Team Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'members',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'teamMember'}]}],
    }),
    defineField({name: 'limit', type: 'number'}),
  ],
  preview: {select: {title: 'members.0.name'}},
})
