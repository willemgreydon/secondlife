import GenericPage from "@/components/templates/GenericPage"
import { getPageBySlug } from "@/lib/queries/page"

export default async function Page() {
  const doc = await getPageBySlug("blog")
  return <GenericPage doc={doc} />
}
