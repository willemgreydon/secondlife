"use client";

type ContactProps = {
  title?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export default function Contact({
  title,
  email,
  phone,
  address,
}: ContactProps) {
  if (!email && !phone && !address) return null;

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      {title && (
        <h2 className="mb-4 text-3xl font-semibold">
          {title}
        </h2>
      )}

      <div className="rounded-2xl border p-6 space-y-2">
        {email && (
          <p>
            <span className="font-semibold">Email:</span>{" "}
            <a
              className="hover:underline"
              href={`mailto:${email}`}
            >
              {email}
            </a>
          </p>
        )}

        {phone && (
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            <a
              className="hover:underline"
              href={`tel:${phone}`}
            >
              {phone}
            </a>
          </p>
        )}

        {address && (
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {address}
          </p>
        )}
      </div>
    </section>
  );
}
