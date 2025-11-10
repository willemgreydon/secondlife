'use client'

export default function Contact({
  title,
  email,
  phone,
  address,
}: {
  title?: string
  email?: string
  phone?: string
  address?: string
}) {
  return (
    <section className="bg-gray-50 text-gray-900 dark:bg-zinc-900 dark:text-gray-100 transition-colors">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        {title && <h2 className="mb-6 text-3xl font-semibold">{title}</h2>}
        <div className="space-y-3 text-sm">
          {address && <p>{address}</p>}
          {email && (
            <p>
              <a href={`mailto:${email}`} className="underline hover:opacity-80">
                {email}
              </a>
            </p>
          )}
          {phone && (
            <p>
              <a href={`tel:${phone}`} className="underline hover:opacity-80">
                {phone}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}