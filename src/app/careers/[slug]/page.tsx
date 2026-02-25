import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

import { getServerClient } from "@/lib/sanity.preview";
import { jobBySlugQuery } from "@/lib/sanity.queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function JobDetailPage(props: PageProps) {
  const { slug } = await props.params;

  const client = await getServerClient();
  const job = await client.fetch(jobBySlugQuery, { slug });

  if (!job) return notFound();

  return (
    <div className="bg-white text-gray-900 dark:bg-black dark:text-gray-100 transition-colors">
      <section className="mx-auto max-w-3xl px-4 py-16">
        <Link href="/careers" className="text-sm hover:underline opacity-80">
          ← Back to Careers
        </Link>

        <h1 className="mt-4 text-4xl font-bold">{job.title}</h1>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {job.department ? (
            <span className="rounded-full border px-3 py-1 opacity-90">
              Department: {job.department}
            </span>
          ) : null}
          {job.location ? (
            <span className="rounded-full border px-3 py-1 opacity-90">
              Location: {job.location}
            </span>
          ) : null}
          {job.engagementType ? (
            <span className="rounded-full border px-3 py-1 opacity-90">
              Engagement: {job.engagementType}
            </span>
          ) : null}
          {typeof job.isOpen === "boolean" ? (
            <span className="rounded-full border px-3 py-1 opacity-90">
              Status: {job.isOpen ? "Open" : "Closed"}
            </span>
          ) : null}
        </div>

        {job.shortDescription ? (
          <p className="mt-6 text-lg opacity-90">{job.shortDescription}</p>
        ) : null}

        {Array.isArray(job.description) && job.description.length ? (
          <div className="prose prose-lg dark:prose-invert mt-10 max-w-none">
            <PortableText value={job.description} />
          </div>
        ) : null}

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <a
            href="mailto:hr@secondlife.ngo?subject=Application%20-%20{job.title}"
            className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-white font-medium hover:opacity-90"
          >
            Apply via Email (hr@secondlife.ngo)
          </a>

          <Link
            href="/careers"
            className="inline-flex items-center justify-center rounded-md border px-6 py-3 font-medium hover:bg-gray-50 dark:hover:bg-zinc-900"
          >
            View all roles
          </Link>
        </div>

        <p className="mt-6 text-xs opacity-70">
          Tip: include a link to your LinkedIn and attach your resume as PDF.
        </p>
      </section>
    </div>
  );
}