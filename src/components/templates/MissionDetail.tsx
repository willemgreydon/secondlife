type MissionDetailProps = {
  mission: any;
};

export default function MissionDetail({ mission }: MissionDetailProps) {
  return (
    <div>
      <h1>{mission.title}</h1>
      <p>{mission.excerpt}</p>
      {/* weitere Felder */}
    </div>
  );
}