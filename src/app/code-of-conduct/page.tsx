import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Code of Conduct – Second Life e.V.',
  robots: 'noindex',
}

export default function CodeOfConductPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-semibold">Code of Conduct</h1>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          Second Life e.V. is committed to creating a respectful, inclusive,
          transparent and safe environment for all individuals involved in its
          activities. This Code of Conduct applies to board members, volunteers,
          contributors, partners and all persons representing or acting on
          behalf of Second Life e.V.
        </p>

        <h2 className="pt-6 text-xl font-semibold">1. Core Principles</h2>

        <p>
          Our work is guided by the following principles:
        </p>

        <ul className="list-disc pl-6">
          <li>respect for human dignity and diversity</li>
          <li>integrity, honesty and accountability</li>
          <li>collaboration based on trust and professionalism</li>
          <li>responsible use of technology and data</li>
        </ul>

        <h2 className="pt-6 text-xl font-semibold">2. Respectful Conduct</h2>

        <p>
          All participants are expected to treat one another with respect.
          Discrimination, harassment, intimidation, hate speech, or abusive
          behavior will not be tolerated under any circumstances.
        </p>

        <p>
          This applies to all forms of interaction, including digital
          communication, written exchanges, meetings, events and online
          platforms.
        </p>

        <h2 className="pt-6 text-xl font-semibold">3. Professional Responsibility</h2>

        <p>
          Individuals acting on behalf of Second Life e.V. are expected to:
        </p>

        <ul className="list-disc pl-6">
          <li>act in good faith and in the best interest of the organization</li>
          <li>respect confidentiality and sensitive information</li>
          <li>avoid conflicts of interest or disclose them transparently</li>
          <li>use resources responsibly and lawfully</li>
        </ul>

        <h2 className="pt-6 text-xl font-semibold">4. Ethical Use of Technology and Data</h2>

        <p>
          Second Life e.V. is committed to ethical, transparent and lawful use of
          technology, including artificial intelligence and data-driven systems.
          Data must be processed responsibly, with respect for privacy, security
          and societal impact.
        </p>

        <h2 className="pt-6 text-xl font-semibold">5. Reporting Concerns</h2>

        <p>
          Any concerns regarding violations of this Code of Conduct should be
          reported promptly and in good faith.
        </p>

        <p>
          Reports can be submitted confidentially to:{' '}
          <a href="mailto:legal@secondlife.ngo" className="underline">
            legal@secondlife.ngo
          </a>
        </p>

        <p>
          Retaliation against individuals who raise concerns in good faith will
          not be tolerated.
        </p>

        <h2 className="pt-6 text-xl font-semibold">6. Enforcement</h2>

        <p>
          Violations of this Code of Conduct may result in appropriate measures,
          including warnings, removal from roles, or termination of cooperation,
          depending on severity and context.
        </p>

        <p className="pt-8 text-xs text-neutral-500">
          Last updated: January 2026
        </p>
      </section>
    </main>
  )
}
