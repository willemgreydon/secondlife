// sanity-studio/sanity.config.ts
import { defineConfig } from 'sanity'
import type { Template } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import deskStructure from './deskStructure'
import schemas from './schemas'  // default export (Array von Types)
import { pageFixedSlugTemplate } from "./templates/pageFixedSlug"

// Studio-ENV (separat vom Next-Frontend)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId || !dataset) {
  throw new Error(
    "Missing Sanity environment variables. Please define:\n" +
    "NEXT_PUBLIC_SANITY_PROJECT_ID\n" +
    "NEXT_PUBLIC_SANITY_DATASET\n"
  );
}

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'Second Life e.V.',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
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
