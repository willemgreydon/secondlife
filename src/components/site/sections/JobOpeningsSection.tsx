"use client";

import Link from "next/link";

type Job = {
  _id: string;
  title: string;
  slug?: string;
  department?: string;
  location?: string;
  engagementType?: string;
  shortDescription?: string;
  isOpen?: boolean;
};

type Props = {
  headline?: string;
  showOnlyOpen?: boolean;
  jobs?: Job[];
};

export default function JobOpeningsSection({
  headline = "Open Positions",
  jobs = [],
}: Props) {
  if (!jobs.length) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-3xl font-bold mb-4">{headline}</h2>
        <p className="opacity-80">
          We currently do not have active openings, but we are always looking for aligned
          contributors.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">{headline}</h2>

      <div className="space-y-4">
        {jobs.map((job) => {
          const href = job.slug ? `/careers/${job.slug}` : "/careers";

          return (
            <div
              key={job._id}
              className="rounded-xl border p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>

                  <div className="mt-2 flex flex-wrap gap-2 text-sm opacity-80">
                    {job.department ? (
                      <span className="rounded-full border px-3 py-1">
                        Department: {job.department}
                      </span>
                    ) : null}
                    {job.location ? (
                      <span className="rounded-full border px-3 py-1">
                        Location: {job.location}
                      </span>
                    ) : null}
                    {job.engagementType ? (
                      <span className="rounded-full border px-3 py-1">
                        Engagement: {job.engagementType}
                      </span>
                    ) : null}
                  </div>

                  {job.shortDescription ? (
                    <p className="mt-3 opacity-90">{job.shortDescription}</p>
                  ) : null}
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-6 flex shrink-0">
                  <Link
                    href={href}
                    className="inline-flex items-center justify-center rounded-md bg-black px-5 py-2.5 text-white font-medium hover:opacity-90"
                  >
                    View Details / Apply
                  </Link>
                </div>
              </div>

              {!job.slug ? (
                <p className="mt-3 text-xs text-red-600">
                  Missing slug for this job. Please generate a slug in Sanity Studio.
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}