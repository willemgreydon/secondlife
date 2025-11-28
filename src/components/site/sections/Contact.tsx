"use client";

type ContactProps = {
  title?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export default function Contact(props: ContactProps) {
  const { title, email, phone, address } = props;

  return (
    <section className="mx-auto max-w-3xl px-4">
      {title && <h2 className="mb-4 text-3xl font-semibold">{title}</h2>}
      <div className="rounded-2xl border p-6">
        {email && (
          <p>
            <span className="font-semibold">Email:</span>{" "}
            <a className="hover:underline" href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        )}
        {phone && (
          <p className="mt-2">
            <span className="font-semibold">Phone:</span>{" "}
            <a className="hover:underline" href={`tel:${phone}`}>
              {phone}
            </a>
          </p>
        )}
        {address && (
          <p className="mt-2">
            <span className="font-semibold">Address:</span> {address}
          </p>
        )}
      </div>
    </section>
  );
}
