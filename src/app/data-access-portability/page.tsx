import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Access & Portability – Second Life e.V.',
  robots: 'noindex',
}

export default function DataAccessPortabilityPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-semibold">
        Data Access & Portability
      </h1>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          This page provides information on your rights regarding access to,
          portability of, and control over your personal data in accordance with
          the General Data Protection Regulation (GDPR), the EU Data Act, and
          applicable national laws, reflecting the legal state as of 2026.
        </p>

        <h2 className="pt-6 text-xl font-semibold">1. Scope</h2>

        <p>
          These provisions apply to all personal data processed by{' '}
          <strong>Second Life e.V.</strong> through this website, related digital
          services, and direct communications.
        </p>

        <h2 className="pt-6 text-xl font-semibold">2. Right of Access</h2>

        <p>
          You have the right to request confirmation as to whether personal data
          concerning you is being processed. Where this is the case, you have
          the right to access such personal data and the following information
          in accordance with Art. 15 GDPR:
        </p>

        <ul className="list-disc pl-6">
          <li>purposes of processing</li>
          <li>categories of personal data concerned</li>
          <li>recipients or categories of recipients</li>
          <li>envisaged storage period</li>
          <li>existence of your data subject rights</li>
        </ul>

        <h2 className="pt-6 text-xl font-semibold">3. Right to Data Portability</h2>

        <p>
          In accordance with Art. 20 GDPR and the EU Data Act, you have the right
          to receive personal data concerning you, which you have provided to
          us, in a structured, commonly used and machine-readable format, and to
          transmit that data to another controller where technically feasible.
        </p>

        <p>
          This applies where processing is based on consent or on a contract and
          carried out by automated means.
        </p>

        <h2 className="pt-6 text-xl font-semibold">4. Data Formats</h2>

        <p>
          Where applicable, personal data will be provided in standard formats
          such as JSON, CSV or PDF, depending on the nature of the data and the
          technical context.
        </p>

        <h2 className="pt-6 text-xl font-semibold">5. Exercising Your Rights</h2>

        <p>
          To exercise your rights of access or data portability, please contact
          us with a clear description of your request.
        </p>

        <p>
          Contact email:{' '}
          <a
            href="mailto:legal@secondlife.ngo"
            className="underline"
          >
            legal@secondlife.ngo
          </a>
        </p>

        <p>
          We may request additional information to verify your identity. Requests
          will be processed without undue delay and, in any case, within the
          statutory time limits.
        </p>

        <h2 className="pt-6 text-xl font-semibold">6. Limitations</h2>

        <p>
          The right to access and data portability may be restricted where such
          access would adversely affect the rights and freedoms of others or
          where statutory exemptions apply.
        </p>

        <h2 className="pt-6 text-xl font-semibold">7. Supervisory Authority</h2>

        <p>
          If you believe that the processing of your personal data infringes
          applicable data protection laws, you have the right to lodge a
          complaint with a supervisory authority.
        </p>

        <p>
          Responsible supervisory authority:<br />
          Federal Financial Supervisory Authority (BaFin)<br />
          Graurheindorfer Straße 108<br />
          53117 Bonn<br />
          Germany
        </p>

        <p className="pt-8 text-xs text-neutral-500">
          Last updated: January 2026
        </p>
      </section>
    </main>
  )
}
