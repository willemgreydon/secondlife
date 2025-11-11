// src/lib/sanity.client.ts
import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-05-01',
  useCdn: false,                // frische Reads
  perspective: 'published',     // nur veröffentlichte Inhalte
  stega: { enabled: false },
})

// Optionaler Preview-Client (nur wenn du Drafts anzeigen willst)
export const previewClient = process.env.SANITY_READ_TOKEN
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-05-01',
      useCdn: false,
      token: process.env.SANITY_READ_TOKEN,
      perspective: 'previewDrafts',
    })
  : null
