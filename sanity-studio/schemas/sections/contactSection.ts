import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Contact',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'email', type: 'string'}),
    defineField({name: 'phone', type: 'string'}),
    defineField({name: 'address', type: 'text', rows: 2}),
  ],
  preview: {select: {title: 'title', subtitle: 'email'}},
})
