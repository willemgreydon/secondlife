// sanity-studio/schemas/sections/splitSection.ts
import {defineType, defineField} from 'sanity'

const sideFields = [
  defineField({
    name: 'kind',
    type: 'string',
    options: {
      list: [
        {title: 'Text', value: 'text'},
        {title: 'Image', value: 'image'},
        {title: 'None', value: 'none'},
      ],
      layout: 'radio',
    },
    initialValue: 'text',
  }),
  defineField({
    name: 'text',
    title: 'Text (Portable Text)',
    type: 'array',
    of: [{type: 'block'}],
    hidden: ({parent}) => parent?.kind !== 'text',
  }),
  defineField({
    name: 'image',
    title: 'Image',
    type: 'image',
    options: {hotspot: true},
    fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    hidden: ({parent}) => parent?.kind !== 'image',
  }),
]

export default defineType({
  name: 'splitSection',
  title: 'Split',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'layout',
      type: 'string',
      options: {
        list: [
          {title: '50 / 50', value: '50-50'},
          {title: '60 / 40', value: '60-40'},
          {title: '40 / 60', value: '40-60'},
        ],
        layout: 'radio',
      },
      initialValue: '50-50',
    }),
    defineField({name: 'reversed', type: 'boolean', initialValue: false}),
    defineField({name: 'left', type: 'object', fields: sideFields}),
    defineField({name: 'right', type: 'object', fields: sideFields}),

    // ---- LEGACY (versteckt): altes Schema mit main/side Arrays ----
    defineField({
      name: 'main',
      title: 'LEGACY: Main (Portable Text)',
      type: 'array',
      of: [{type: 'block'}],
      hidden: true,
    }),
    defineField({
      name: 'side',
      title: 'LEGACY: Side (Portable Text)',
      type: 'array',
      of: [{type: 'block'}],
      hidden: true,
    }),
    defineField({
      name: 'images',
      title: 'LEGACY: Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      hidden: true,
    }),
    defineField({
      name: 'reverse',
      title: 'LEGACY: reverse',
      type: 'boolean',
      hidden: true,
    }),
  ],
  preview: {
    select: {title: 'title', layout: 'layout'},
    prepare: ({title, layout}) => ({
      title: title || 'Split',
      subtitle: layout || '50-50',
    }),
  },
})
