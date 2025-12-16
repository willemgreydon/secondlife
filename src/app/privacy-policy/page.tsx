import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy – Second Life e.V.',
  robots: 'noindex',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-semibold">Privacy Policy</h1>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          The protection of your personal data is important to us. This Privacy
          Policy explains how <strong>Second Life e.V.</strong> processes personal
          data in accordance with the General Data Protection Regulation (GDPR),
          the EU Data Act, the Digital Services Act (DSA), and applicable national
          data protection laws, as of the legal state in 2026.
        </p>

        <p>
          We process personal data lawfully, fairly and transparently, and only
          to the extent necessary for the operation of this website and our
          non-profit activities.
        </p>

        <h2 className="pt-6 text-xl font-semibold">1. Controller</h2>

        <p>
          Controller pursuant to Art. 4(7) GDPR:
        </p>

        <p>
          <strong>Second Life e.V.</strong><br />
          Marktstrasse 46<br />
          88212 Ravensburg<br />
          Germany
        </p>

        <p>
          Email:{' '}
          <a href="mailto:r.engelhard@secondlife.ngo" className="underline">
            r.engelhard@secondlife.ngo
          </a>
        </p>

        <h2 className="pt-6 text-xl font-semibold">2. General Data Processing</h2>

        <p>
          We process personal data only where permitted by law. This includes
          processing based on:
        </p>

        <ul className="list-disc pl-6">
          <li>your consent (Art. 6(1)(a) GDPR)</li>
          <li>performance of a contract (Art. 6(1)(b) GDPR)</li>
          <li>legal obligations (Art. 6(1)(c) GDPR)</li>
          <li>legitimate interests (Art. 6(1)(f) GDPR)</li>
        </ul>

        <p>
          No automated decision-making or profiling within the meaning of Art. 22
          GDPR takes place.
        </p>

        <h2 className="pt-6 text-xl font-semibold">3. Website Access Data</h2>

        <p>
          When visiting this website, technical access data may be processed,
          including:
        </p>

        <ul className="list-disc pl-6">
          <li>IP address (anonymized where possible)</li>
          <li>date and time of access</li>
          <li>requested URL</li>
          <li>browser and operating system information</li>
        </ul>

        <p>
          This data is processed for technical security, stability and abuse
          prevention. The legal basis is Art. 6(1)(f) GDPR.
        </p>

        <h2 className="pt-6 text-xl font-semibold">4. Contact Requests</h2>

        <p>
          If you contact us via email or contact forms, the data you provide will
          be processed solely for the purpose of handling your request.
        </p>

        <p>
          The legal basis is Art. 6(1)(b) GDPR or Art. 6(1)(f) GDPR. Data will not
          be shared with third parties and will be deleted once no longer
          required.
        </p>

        <h2 className="pt-6 text-xl font-semibold">5. Cookies and Tracking</h2>

        <p>
          This website does not use tracking cookies or third-party advertising
          technologies by default.
        </p>

        <p>
          If analytics or third-party services are introduced in the future, they
          will only be activated in compliance with GDPR and, where required,
          based on explicit consent pursuant to Art. 6(1)(a) GDPR.
        </p>

        <h2 className="pt-6 text-xl font-semibold">6. Data Transfers</h2>

        <p>
          Personal data is not transferred to third countries outside the EU or
          EEA unless appropriate safeguards pursuant to Art. 44 et seq. GDPR are
          in place.
        </p>

        <h2 className="pt-6 text-xl font-semibold">7. Data Retention</h2>

        <p>
          Personal data is stored only for as long as necessary to fulfil the
          respective purpose or as required by statutory retention obligations.
        </p>

        <h2 className="pt-6 text-xl font-semibold">8. Your Rights</h2>

        <p>
          You have the following rights under the GDPR:
        </p>

        <ul className="list-disc pl-6">
          <li>Right of access (Art. 15 GDPR)</li>
          <li>Right to rectification (Art. 16 GDPR)</li>
          <li>Right to erasure (Art. 17 GDPR)</li>
          <li>Right to restriction of processing (Art. 18 GDPR)</li>
          <li>Right to data portability (Art. 20 GDPR)</li>
          <li>Right to object (Art. 21 GDPR)</li>
        </ul>

        <p>
          You also have the right to lodge a complaint with a supervisory
          authority.
        </p>

        <h2 className="pt-6 text-xl font-semibold">9. Supervisory Authority</h2>

        <p>
          Responsible supervisory authority:
        </p>

        <p>
          Federal Financial Supervisory Authority (BaFin)<br />
          Graurheindorfer Straße 108<br />
          53117 Bonn<br />
          Germany
        </p>

        <h2 className="pt-6 text-xl font-semibold">10. Changes to this Policy</h2>

        <p>
          We reserve the right to update this Privacy Policy to reflect legal,
          technical or organizational changes. The current version is always
          available on this website.
        </p>

        <p className="pt-8 text-xs text-neutral-500">
          Last updated: January 2026
        </p>
      </section>
    </main>
  )
}
