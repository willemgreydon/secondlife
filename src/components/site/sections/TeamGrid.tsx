"use client";
import Image from "next/image";

type member = {
  _id: string;
  name: string;
  role?: string;
  image?: string;
  linkedin?: string;
  bio?: string;
};

type TeamGridProps = {
  title?: string;
  layout?: "grid" | "list";
  members?: member[];
};

export default function TeamGrid(props: TeamGridProps) {
  const { title, layout, members = [] } = props;

  if (!Array.isArray(members) || members.length === 0 || !members[0]._id) return null;
  return (
    <section className="mx-auto max-w-6xl px-4">
      {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <div key={`member-${m._id}`} className="rounded-2xl border p-4">
            {m.image && (
              <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
                <Image src={m.image} alt={m.name} fill sizes="33vw" className="object-cover" />
              </div>
            )}
            <div className="text-lg font-semibold">{m.name}</div>
            {m.role && <div className="text-sm opacity-70">{m.role}</div>}
            {m.linkedin && (
              <a className="mt-2 inline-block text-sm text-sky-600 hover:underline" href={m.linkedin} target="_blank">
                LinkedIn
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
