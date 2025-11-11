import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { deskStructure } from './deskStructure'
import schemas from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Second Life e.V.',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-08-01',
  useCdn: false,

  schema: { types: schemas },

  plugins: [
    deskTool({ structure: deskStructure }),
    visionTool(),
  ],

  document: {
    newDocumentOptions: (prev, { schemaType }) => {
      const singletons = new Set([
        'homePage','tidePage','operationsPage','joinUsPage','contactPage','organisationPage',
      ])
      return singletons.has(schemaType) ? [] : prev
    },
    actions: (prev, { schemaType }) => {
      const singletons = new Set([
        'homePage','tidePage','operationsPage','joinUsPage','contactPage','organisationPage',
      ])
      if (!singletons.has(schemaType)) return prev
      return prev.filter(({ action }) => action !== 'delete' && action !== 'duplicate')
    },
  },
})
