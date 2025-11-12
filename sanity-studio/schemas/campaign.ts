// sanity-studio/schemas/campaign.ts
import {defineType, defineField} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export default defineType({
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    }),

    // Optional: explicit partner links for this campaign (singular type 'partner')
    defineField({
      name: 'partners',
      title: 'Partners (references)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'partner'}]}],
    }),

    // Page-builder style content
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {type: 'heroSection'},
        {type: 'textBlock'},
        {type: 'imageBlock'},
        {type: 'splitSection'},
        {type: 'videoSection'},
        {type: 'gallerySection'},
        {type: 'quoteSection'},
        {type: 'statsSection'},
        {type: 'accordionSection'},
        {type: 'contactSection'},

        // Grids/Lists you’re using elsewhere
        {type: 'missionsSection'},
        {type: 'eventsSection'},
        {type: 'impactStatsSection'},

        // ✅ use the object section 'partnersSection' – NOT a non-existent 'partners'
        {type: 'partnersSection'},
      ],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'cover'},
  },
})
