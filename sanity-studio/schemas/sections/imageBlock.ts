import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alt text'},
        {name: 'caption', type: 'string'},
      ],
      validation: r => r.required(),
    }),
    defineField({name: 'aspect', type: 'string', initialValue: '16/9'}),
    defineField({name: 'rounded', type: 'boolean', initialValue: true}),
  ],
  preview: {select: {title: 'image.alt', media: 'image'}},
})
