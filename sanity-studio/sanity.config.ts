// sanity-studio/sanity.config.ts
import { defineConfig } from 'sanity'
import type { Template } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import deskStructure from './deskStructure'
import schemas from './schemas'
import { pageFixedSlugTemplate } from "./templates/pageFixedSlug"

// 1) CORRECT universal variable resolution
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||          // local studio dev
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID        // Next.js + Vercel

const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production'

const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  "2024-10-01"

// 2) Hard error if missing
if (!projectId || !dataset) {
  throw new Error(`
Missing Sanity environment variables.

Required:
- SANITY_STUDIO_PROJECT_ID  (for local Sanity Studio dev)
- NEXT_PUBLIC_SANITY_PROJECT_ID (for Next.js + Vercel)

Received:
projectId=${projectId}
dataset=${dataset}
`)
}

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_STUDIO_API_TOKEN,
  useCdn: false,

  name: 'default',
  title: 'Second Life e.V.',

  schema: {
    types: schemas,
    templates: (prev) => [...prev, pageFixedSlugTemplate],
  },
  plugins: [
    deskTool({ structure: (S: any) => deskStructure(S) }),
    visionTool(),
  ],
  // ⬇ Hier typisieren
  templates: (prev: Template[]): Template[] => [
    pageFixedSlugTemplate,
    ...prev,
  ],
  document: {
    newDocumentOptions: (prev) => prev,
    actions: (prev) => prev,
  },
})
