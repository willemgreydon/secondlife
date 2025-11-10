// sanity-studio/sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import { schema } from './schemas'
import deskStructure from './deskStructure'
import { projectId, dataset, apiVersion } from './env'
import { pageFixedSlugTemplate } from './templates/pageFixedSlug'

export default defineConfig({
  name: 'secondlife-studio',
  title: 'Second Life Studio',
  projectId,
  dataset,
  basePath: '/', // runs at http://localhost:3333/
  plugins: [
    deskTool({ structure: deskStructure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema,
  templates: (prev) => [pageFixedSlugTemplate, ...prev],
})