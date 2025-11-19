import InitiativesIndexPage from "@/components/templates/InitiativesIndexPage"
import { getInitiativesIndex } from "@/lib/queries/initiatives-index"

export default async function Page() {
  const doc = await getInitiativesIndex()
  return <InitiativesIndexPage doc={doc} />
}
