import { defineType, defineField } from 'sanity'
export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name' }),
    defineField({ name: 'role', type: 'string', title: 'Role' }),
    defineField({ name: 'bio', type: 'text', title: 'Bio' }),
    defineField({ name: 'photo', type: 'image', title: 'Photo', options: { hotspot: true } }),
    defineField({ name: 'socials', type: 'array', title: 'Socials', of: [{ type: 'url' }] }),
    defineField({ name: 'order', type: 'number', title: 'Order' })
  ]
})