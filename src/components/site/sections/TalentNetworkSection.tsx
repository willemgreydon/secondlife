"use client";

import { useState } from "react";

export default function TalentNetworkSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/talent-network", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      e.currentTarget.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="text-3xl font-bold mb-4">
        Join Our Talent Network
      </h2>

      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Interested in working with Second Life but don’t see a suitable role?
        Submit your profile to our Talent Network. We review all submissions
        and reach out when relevant opportunities arise.
      </p>

      {success && (
        <div className="mb-6 rounded-md bg-green-100 p-4 text-green-800">
          Thank you. We will review your profile and reach out if aligned.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            name="fullName"
            required
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Country of Residence
          </label>
          <input
            name="country"
            required
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Area of Expertise
          </label>
          <select
            name="expertise"
            required
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="">Select</option>
            <option>AI</option>
            <option>Drones</option>
            <option>GIS</option>
            <option>Operations</option>
            <option>Public Affairs</option>
            <option>Research</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            LinkedIn Profile
          </label>
          <input
            name="linkedin"
            type="url"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Resume (PDF)
          </label>
          <input
            name="resume"
            type="file"
            accept=".pdf"
            required
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Short Motivation Statement (Optional)
          </label>
          <textarea
            name="motivation"
            rows={4}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-black px-6 py-3 text-white font-medium hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>

        <p className="text-xs text-gray-500 mt-4">
          By submitting your information, you agree to be contacted regarding
          future opportunities aligned with your profile.
        </p>
      </form>
    </section>
  );
}