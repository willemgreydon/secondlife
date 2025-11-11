import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({name: 'align', type: 'string', options: {list: ['left','center','right']}, initialValue: 'left'}),
    defineField({name: 'width', type: 'string', options: {list: ['prose','wide','full']}, initialValue: 'prose'}),
  ],
  preview: {select: {title: 'title'}},
})
