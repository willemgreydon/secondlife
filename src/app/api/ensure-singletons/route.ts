import {NextResponse} from 'next/server'
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2024-08-01',
  token: process.env.SANITY_READ_TOKEN, // muss Schreibrechte haben (sk-…)
  useCdn: false,
})

const SINGLETONS: Array<{id: string; type: string; title: string}> = [
  { id: 'home',           type: 'homePage',         title: 'Home' },
  { id: 'tide',           type: 'tidePage',         title: 'TIDE' },
  { id: 'operations',     type: 'operationsPage',   title: 'Operations' },
  { id: 'join-us',        type: 'joinUsPage',       title: 'Join Us' },
  { id: 'contact',        type: 'contactPage',      title: 'Contact' },
  { id: 'organisation',   type: 'organisationPage', title: 'Organisation' },
]

async function ensure() {
  const tx = client.transaction()
  for (const s of SINGLETONS) {
    tx.createIfNotExists({
      _id: s.id,
      _type: s.type,
      title: s.title,
      contentSections: [],
    })
  }
  return tx.commit()
}

export async function GET() {
  try {
    const res = await ensure()
    return NextResponse.json({ ok: true, committed: res })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
