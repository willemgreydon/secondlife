'use client'
export default function Contact({ headline, address, email, phone }: { headline?:string; address?:string; email?:string; phone?:string }) {
  if (!headline && !address && !email && !phone) return null
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      {headline && <h2 className="mb-4 text-2xl font-semibold">{headline}</h2>}
      <div className="space-y-1 text-sm opacity-90">
        {address && <div>📍 {address}</div>}
        {email && <div>✉️ <a className="underline" href={`mailto:${email}`}>{email}</a></div>}
        {phone && <div>☎️ <a className="underline" href={`tel:${phone}`}>{phone}</a></div>}
      </div>
    </section>
  )
}
