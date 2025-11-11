import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'splitSection',
  title: 'Split',
  type: 'object',
  fields: [
    defineField({
      name: 'main',
      title: 'Main Block',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'side',
      title: 'Side Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{
        type: 'image',
        options: {hotspot: true},
        fields: [{name: 'alt', type: 'string'}],
      }],
    }),
    defineField({name: 'reverse', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'main.0.children.0.text'}},
})
