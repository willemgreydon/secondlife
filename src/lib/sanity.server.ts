import {createClient} from 'next-sanity'

export const sanityServerClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2024-08-01',
  token: process.env.SANITY_READ_TOKEN, // optional
  useCdn: false,
  perspective: 'published',
})
