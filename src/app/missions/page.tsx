import MissionsIndexPage from "@/components/templates/MissionsIndexPage";
import { getAllMissions } from "@/lib/queries/missions-index";

export default async function Page() {
  const missions = await getAllMissions();
  return <MissionsIndexPage missions={missions} />;
}
