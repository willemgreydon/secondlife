import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'videoSection',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'provider', type: 'string', options: {list: ['youtube','vimeo','file']}, initialValue: 'youtube'}),
    defineField({name: 'url', type: 'url', validation: r => r.uri({scheme: ['http','https']})}),
    defineField({
      name: 'file',
      type: 'file',
      options: {accept: 'video/*'},
      hidden: ({parent}) => parent?.provider !== 'file',
    }),
    defineField({name: 'autoplay', type: 'boolean', initialValue: false}),
    defineField({name: 'muted', type: 'boolean', initialValue: true}),
    defineField({name: 'loop', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'title', subtitle: 'provider'}},
})
