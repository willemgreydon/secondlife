// sanity-studio/sanity.config.ts
import { defineConfig } from 'sanity'
import type { Template } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import deskStructure from './deskStructure'
import schemas from './schemas'  // default export (Array von Types)
import { pageFixedSlugTemplate } from "./templates/pageFixedSlug"

// Studio-ENV (separat vom Next-Frontend)
const projectId = process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET || 'production'

if (!projectId) {
  throw new Error(
    'Missing SANITY_STUDIO_PROJECT_ID. Create sanity-studio/.env.local with:\n' +
    'SANITY_STUDIO_PROJECT_ID=igkzac8h\nSANITY_STUDIO_DATASET=production'
  )
}

export default defineConfig({
  name: 'default',
  title: 'Second Life e.V.',
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET!,
  apiVersion: '2024-08-01',
  useCdn: false,

  schema: { types: schemas },

  templates: (prev: Template[]) => [
    pageFixedSlugTemplate,
    ...prev,
  ],

  plugins: [
    deskTool({ structure: (S) => deskStructure(S) }),
  ],

  document: {
    newDocumentOptions: (prev) => prev,
    actions: (prev) => prev,
  },
})
