"use client";

type VideoProps = {
  url?: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
  provider?: "youtube" | "vimeo" | "file";
};

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.searchParams.has("v")) return u.searchParams.get("v");
    if (u.pathname.startsWith("/embed/"))
      return u.pathname.replace("/embed/", "");
  } catch {}
  return null;
}

function getVimeoId(url: string): string | null {
  try {
    const u = new URL(url);
    return u.pathname.split("/").filter(Boolean)[0] ?? null;
  } catch {}
  return null;
}

export default function Video(props: VideoProps) {
  const { url, title, autoplay, loop, provider } = props;
  if (!url) return null;

  if (provider === "youtube") {
    const id = getYouTubeId(url);
    if (!id) return null;

    return (
      <section className="mx-auto max-w-6xl px-4">
        {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
        <div className="aspect-video overflow-hidden rounded-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&loop=${loop ? 1 : 0}&mute=1`}
            title={title ?? "YouTube video"}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </section>
    );
  }

  if (provider === "vimeo") {
    const id = getVimeoId(url);
    if (!id) return null;

    return (
      <section className="mx-auto max-w-6xl px-4">
        {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
        <div className="aspect-video overflow-hidden rounded-2xl">
          <iframe
            src={`https://player.vimeo.com/video/${id}?autoplay=${autoplay ? 1 : 0}&loop=${loop ? 1 : 0}`}
            title={title ?? "Vimeo video"}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </section>
    );
  }

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
