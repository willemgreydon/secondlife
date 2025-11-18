import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'accordionSection',
  title: 'Accordion',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'title', type: 'string', validation: r => r.required()},
        {name: 'content', type: 'array', of: [{type: 'block'}]},
      ]}],
      validation: r => r.min(1),
    }),
  ],
  preview: {select: {title: 'items.0.title'}},
})
