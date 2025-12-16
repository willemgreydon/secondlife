import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility – Second Life e.V.',
  robots: 'noindex',
}

export default function AccessibilityPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-semibold">Accessibility</h1>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          Second Life e.V. is committed to ensuring digital accessibility for all
          users, including people with disabilities. We continuously work to
          improve the usability and accessibility of our website in accordance
          with applicable legal requirements and recognized standards.
        </p>

        <h2 className="pt-6 text-xl font-semibold">1. Accessibility Standards</h2>

        <p>
          This website aims to conform with:
        </p>

        <ul className="list-disc pl-6">
          <li>EU Accessibility Act (EAA)</li>
          <li>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</li>
          <li>applicable national accessibility regulations</li>
        </ul>

        <h2 className="pt-6 text-xl font-semibold">2. Measures Implemented</h2>

        <p>
          Accessibility is considered throughout design and development. Current
          measures include:
        </p>

        <ul className="list-disc pl-6">
          <li>semantic HTML structure</li>
          <li>keyboard navigability</li>
          <li>sufficient color contrast</li>
          <li>responsive and readable layouts</li>
        </ul>

        <h2 className="pt-6 text-xl font-semibold">3. Limitations</h2>

        <p>
          While we strive for full accessibility, some content or features may
          not yet be fully accessible. We are actively working to identify and
          remove such barriers.
        </p>

        <h2 className="pt-6 text-xl font-semibold">4. Feedback and Contact</h2>

        <p>
          If you encounter accessibility barriers or have suggestions for
          improvement, we welcome your feedback.
        </p>

        <p>
          Contact email:{' '}
          <a href="mailto:legal@secondlife.ngo" className="underline">
            legal@secondlife.ngo
          </a>
        </p>

        <p>
          We will make reasonable efforts to respond and address concerns in a
          timely manner.
        </p>

        <h2 className="pt-6 text-xl font-semibold">5. Continuous Improvement</h2>

        <p>
          Accessibility is an ongoing process. We regularly review our digital
          offerings and update them to align with evolving standards, legal
          requirements and user needs.
        </p>

        <p className="pt-8 text-xs text-neutral-500">
          Last updated: January 2026
        </p>
      </section>
    </main>
  )
}
