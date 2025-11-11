import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'statsSection',
  title: 'Stats Section',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'label', type: 'string', title: 'Label'},
          {name: 'value', type: 'string', title: 'Value'},
        ],
        preview: {select: {title: 'label', subtitle: 'value'}},
      }],
    }),
  ],
  preview: {select: {title: 'title'}, prepare: ({title}) => ({title: title || 'Stats Section'})},
})
