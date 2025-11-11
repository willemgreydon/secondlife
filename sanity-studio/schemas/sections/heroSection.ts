import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', type: 'string', title: 'Eyebrow'}),
    defineField({name: 'title', type: 'string', validation: r => r.required()}),
    defineField({name: 'subtitle', type: 'text', rows: 3}),
    defineField({name: 'ctaText', type: 'string', title: 'CTA Text'}),
    defineField({
      name: 'ctaHref',
      type: 'url',
      validation: r => r.uri({allowRelative: true, scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    }),
    defineField({name: 'align', type: 'string', options: {list: ['left','center','right']}, initialValue: 'left'}),
  ],
  preview: {select: {title: 'title', subtitle: 'eyebrow'}},
})
