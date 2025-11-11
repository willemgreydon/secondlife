import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'statsSection',
  title: 'Stats (simple)',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'label', type: 'string', validation: r => r.required()},
        {name: 'value', type: 'string', validation: r => r.required()},
      ]}],
      validation: r => r.min(1),
    }),
  ],
  preview: {select: {title: 'items.0.label', subtitle: 'items.0.value'}},
})
