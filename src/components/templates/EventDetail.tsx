type EventDetailProps = {
  event: any;
};

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.excerpt}</p>
    </div>
  );
}
