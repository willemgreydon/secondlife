// sanity-studio/sanity.config.ts
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import deskStructure from './deskStructure'
import schemas from './schemas'  // <— default export (Array von Types)

// Studio-ENV (separat vom Next-Frontend)
const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

if (!projectId) {
  throw new Error(
    'Missing SANITY_STUDIO_PROJECT_ID. Create sanity-studio/.env.local with:\n' +
    'SANITY_STUDIO_PROJECT_ID=igkzac8h\nSANITY_STUDIO_DATASET=production'
  )
}

export default defineConfig({
  name: 'default',
  title: 'Second Life e.V.',
  projectId,
  dataset,
  apiVersion: '2024-08-01',
  useCdn: false,

  schema: { types: schemas },

  plugins: [
    deskTool({ structure: deskStructure }),
    visionTool(),
  ],

  // Nichts an den Aktionen blocken – Singletons steuerst du über deskStructure
  document: {
    newDocumentOptions: (prev) => prev,
    actions: (prev) => prev,
  },
})
