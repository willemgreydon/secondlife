import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01"

// Für Writes MUSST du createClient manuell verwenden.
// client (aus sanity.client.ts) hat KEIN token.
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_READ_TOKEN, // muss Schreibrechte enthalten
  useCdn: false,
  perspective: "previewDrafts",
})

const SINGLETONS: Array<{ id: string; type: string; title: string }> = [
  { id: "home", type: "homePage", title: "Home" },
  { id: "tide", type: "tidePage", title: "TIDE" },
  { id: "operations", type: "operationsPage", title: "Operations" },
  { id: "missions", type: "missionsPage", title: "Missions" },
  { id: "join-us", type: "joinUsPage", title: "Join Us" },
  { id: "contact", type: "contactPage", title: "Contact" },
  { id: "organisation", type: "organisationPage", title: "Organisation" },
]

async function ensure() {
  const tx = writeClient.transaction()

  for (const s of SINGLETONS) {
    tx.createIfNotExists({
      _id: s.id,
      _type: s.type,
      title: s.title,
      content: [],
      contentSections: [],
      sections: [],
    })
  }

  return tx.commit()
}

export async function GET() {
  try {
    const committed = await ensure()
    return NextResponse.json({ ok: true, committed })
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error?.message || String(error),
      },
      { status: 500 }
    )
  }
}

export const dynamic = "force-dynamic"
