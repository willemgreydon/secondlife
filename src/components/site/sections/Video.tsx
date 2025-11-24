"use client";

export default function Video({
  url,
  title,
  autoplay,
  loop,
}: {
  url?: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
}) {

  if (!url) return null;

  // Extract the video ID from the YouTube URL
  const videoID = url.split('be/')[1];

  // Render the youtube video section
  return (
    <section className="mx-auto max-w-5xl px-4">
      {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
      <div className="aspect-video overflow-hidden rounded-2xl">
        <iframe
          width="auto"
          height="auto"
          src={`https://www.youtube.com/embed/${videoID}&autoplay=${autoplay ? '1' : '0'}&loop=${loop ? '1' : '0'}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </section>
  );
}
