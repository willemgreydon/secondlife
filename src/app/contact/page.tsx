import ContactPage from "@/components/templates/ContactPage"
import { getContactPage } from "@/lib/queries/contact"

export default async function Page() {
  const doc = await getContactPage()
  return <ContactPage doc={doc} />
}
