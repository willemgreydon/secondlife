import CampaignsIndexPage from "@/components/templates/CampaignsIndexPage"
import { getCampaignsIndex } from "@/lib/queries/campaigns-index"

export default async function Page() {
  const doc = await getCampaignsIndex()
  return <CampaignsIndexPage doc={doc} />
}
