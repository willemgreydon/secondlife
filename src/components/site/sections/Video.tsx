"use client";

type VideoProps = {
  url?: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
  provider?: "youtube" | "vimeo" | "file";
};

export default function Video(props: VideoProps) {
  const { url, title, autoplay, loop, provider } = props;
  if (!url) return null;
  console.log(provider);

  if (provider === "youtube") {
    // Extract the video ID from the YouTube URL
    const videoID = url.split("be/")[1];

    // Render the youtube video section
    return (
      <section className="mx-auto max-w-6xl px-4">
        {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
        <div className="aspect-video overflow-hidden rounded-2xl">
          <iframe
            width="auto"
            height="auto"
            src={`https://www.youtube.com/embed/${videoID}&autoplay=${autoplay ? "1" : "0"}&loop=${loop ? "1" : "0"}`}
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
  if (provider === "vimeo") {
    // Extract the video ID from the Vimeo URL
    const videoID = url.split("com/")[1];

    // Render the vimeo video section
    return (
      <section className="mx-auto max-w-6xl px-4">
        {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
        <div className="aspect-video overflow-hidden rounded-2xl">
          <iframe
            src={`https://player.vimeo.com/video/${videoID}?autoplay=${autoplay ? "1" : "0"}&loop=${loop ? "1" : "0"}`}
            width="auto"
            height="auto"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </section>
    );
  }

  // Fallback for unsupported providers
  return (
    <video
      src={url}
      title={title}
      autoPlay={autoplay}
      loop={loop}
      controls
      className="mx-auto max-w-5xl rounded-2xl"
    />
  );
}
