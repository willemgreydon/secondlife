import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'gallerySection',
  title: 'Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      of: [{
        type: 'image',
        options: {hotspot: true},
        fields: [
          {name: 'alt', type: 'string'},
          {name: 'caption', type: 'string'},
        ],
      }],
      validation: r => r.min(1),
    }),
    defineField({name: 'columns', type: 'number', initialValue: 3}),
  ],
  preview: {select: {title: 'images.0.alt', media: 'images.0'}},
})
