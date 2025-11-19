type InitiativeDetailProps = {
  initiative: any;
};

export default function InitiativeDetail({ initiative }: InitiativeDetailProps) {
  return (
    <div>
      <h1>{initiative.title}</h1>
      <p>{initiative.excerpt}</p>
    </div>
  );
}
