// sanity-studio/schemas/page.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: r => r.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'splitSection' },
        { type: 'richTextSection' },
        { type: 'imageBlock' },
        { type: 'gallerySection' },
        { type: 'quoteSection' },
        { type: 'accordionSection' },
        { type: 'contactSection' },
        { type: 'eventsGrid' },
        { type: 'team' },
        { type: 'campaignGrid' },
        { type: 'initiativesGrid' },
      ],
    }),
  ],
  initialValue: (_params, ctx) => {
    const id = (ctx as any)?.documentId
    const preset = (title: string) => ({ title, slug: { current: title.toLowerCase().replace(/\s+/g, '-') } })
    if (id === 'home') return preset('Home')
    if (id === 'missions') return preset('Missions')
    if (id === 'tide') return preset('TIDE')
    if (id === 'operations') return preset('Operations')
    if (id === 'join-us') return preset('Join Us')
    if (id === 'contact') return preset('Contact')
    if (id === 'donate') return preset('Donate')
    if (id === 'dana-24-vlc') return preset('DANA 24 VLC')
    if (id === 'revolutionizing-beach-clean-ups') return preset('Revolutionizing Beach Clean-Ups')
    return {}
  },
})
