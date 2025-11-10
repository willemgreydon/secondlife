// sanity-studio/schemas/teamMember.ts
import { defineType, defineField } from 'sanity'
import { Users } from 'lucide-react'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: Users,

  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: r => r.required(),
    }),

    defineField({
      name: 'role',
      type: 'string',
    }),

    defineField({
      name: 'photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt text' },
      ],
    }),

    defineField({
      name: 'linkedin',
      type: 'url',
      title: 'LinkedIn Profile',
    }),

    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      validation: Rule =>
        Rule.regex(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/).warning('Should be a valid email'),
    }),

    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'order',
      title: 'Order (for custom sorting)',
      type: 'number',
    }),

    // Optional richer content area (for profile or interviews)
    defineField({
      name: 'content',
      title: 'Content (Sections)',
      type: 'array',
      of: [
        { type: 'textBlock' },
        { type: 'imageBlock' },
        { type: 'quoteSection' },
        { type: 'gallerySection' },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
