import JoinUsPage from "@/components/templates/JoinUsPage"
import { getJoinUsPage } from "@/lib/queries/join-us"

export default async function Page() {
  const doc = await getJoinUsPage()
  return <JoinUsPage doc={doc} />
}
