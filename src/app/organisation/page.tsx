import OrganisationPage from "@/components/templates/OrganisationPage"
import { getOrganisationPage } from "@/lib/queries/organisation"

export default async function Page() {
  const doc = await getOrganisationPage()
  return <OrganisationPage doc={doc} />
}
