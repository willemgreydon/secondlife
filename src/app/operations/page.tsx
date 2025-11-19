import OperationsPage from "@/components/templates/OperationsPage"
import { getOperationsPage } from "@/lib/queries/operations"

export default async function Page() {
  const doc = await getOperationsPage()
  return <OperationsPage doc={doc} />
}
