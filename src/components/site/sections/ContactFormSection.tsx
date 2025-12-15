"use client";

import { useState } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  variant?: "contact" | "join";
};

export default function ContactFormSection({
  title,
  subtitle,
  variant = "contact",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const raw = Object.fromEntries(new FormData(e.currentTarget));

    // 🔁 NORMALIZE PAYLOAD FOR BACKEND
    let payload: Record<string, any> = {
      type: variant, // 👈 IMPORTANT (backend expects `type`)
      email: raw.email,
    };

    if (variant === "contact") {
      payload = {
        ...payload,
        name: raw.name,
        message:
          "Subject: " +
          raw.subject +
          "\n\n" +
          raw.message,
      };
    }

    if (variant === "join") {
      payload = {
        ...payload,
        name: `${raw.firstName} ${raw.lastName}`.trim(),
        role: raw.experience,
        country: raw.countries,
        phone: raw.phone,
        motivation: raw.about,
        message: raw.about,
      };
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (res.ok) setSuccess(true);
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-10 text-center">
        {title && (
          <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
        )}
        {subtitle && (
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {success ? (
        <p className="text-center text-lg font-medium text-green-600">
          Thank you — we’ll be in touch shortly.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 rounded-xl bg-card p-8 shadow"
        >
          {variant === "contact" ? (
            <>
              <Input name="name" label="Name" required />
              <Input name="email" label="Email" type="email" required />
              <Input name="subject" label="Subject" required />
              <Textarea name="message" label="Message" required />
            </>
          ) : (
            <>
              <Input
                name="experience"
                label="Field of Experience"
                required
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input name="firstName" label="First Name" required />
                <Input name="lastName" label="Last Name" required />
              </div>
              <Input name="phone" label="Phone" />
              <Input
                name="countries"
                label="Countries / Areas you want to volunteer"
              />
              <Input name="email" label="Email" type="email" required />
              <Textarea
                name="about"
                label="Tell us a little more about yourself"
                required
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Sending…" : "Submit"}
          </button>
        </form>
      )}
    </section>
  );
}

function Input({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-1 text-sm">
      <span>{label}</span>
      <input
        {...props}
        className="rounded-md border bg-background px-3 py-2"
      />
    </label>
  );
}

function Textarea({
  label,
  ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="grid gap-1 text-sm">
      <span>{label}</span>
      <textarea
        {...props}
        rows={4}
        className="rounded-md border bg-background px-3 py-2"
      />
    </label>
  );
}
