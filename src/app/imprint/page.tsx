import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Imprint – Second Life e.V.',
  robots: 'noindex',
}

export default function ImprintPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-semibold">Imprint</h1>

      <section className="space-y-4 text-sm leading-relaxed">
        <p>
          <strong>Second Life e.V.</strong> is represented by the Chairman of the
          Board, Robin Engelhard, the Vice Chairman Niclas Krebs and the Treasurer
          Tobias Hipp.
        </p>

        <p>
          <strong>Second Life e.V.</strong><br />
          Marktstrasse 46<br />
          88212 Ravensburg<br />
          Germany
        </p>

        <p>
          Email: <a href="mailto:r.engelhard@secondlife.ngo" className="underline">
            r.engelhard@secondlife.ngo
          </a><br />
          Web: <a href="https://www.secondlife.ngo" className="underline">
            www.secondlife.ngo
          </a>
        </p>

        <p>
          Chairman of the Board: Robin Julius Engelhard<br />
          Vice Chairman of the Board: Niclas Joshua Krebs<br />
          Treasurer: Noah Jannis Krebs
        </p>

        <p>
          Registry court: Vereinsregister Ulm<br />
          Register ID: VR 722746
        </p>

        <p>
          Tax office: Weingarten<br />
          Tax ID: 77052/18649
        </p>

        <p>
          Court of jurisdiction: Ravensburg<br />
          Applicable law: Law of the Federal Republic of Germany (BRD)
        </p>

        <p>
          <strong>Responsible Supervisory Authority</strong><br />
          Federal Financial Supervisory Authority (BaFin)<br />
          Graurheindorfer Straße 108<br />
          53117 Bonn<br />
          Germany
        </p>

        <p>
          <strong>Liability</strong><br />
          Second Life e.V. may, at its own discretion and without assumption of
          liability, change or discontinue this online offering in whole or in
          part at any time and without notice. By linking to third-party content
          ("hyperlinks"), Second Life e.V. does not adopt the content of those
          external sites.
        </p>

        <p>
          <strong>Copyright</strong><br />
          All rights reserved. Texts, images and graphics, as well as their
          arrangement, are subject to copyright and other protective laws. The
          content may not be copied, distributed or modified for commercial
          purposes.
        </p>

        <p>
          <strong>Copyright picture sources</strong><br />
          Tobias Michael Hipp<br />
          Cooper Tweedy<br />
          Yasser Rojas<br />
          NASA<br />
          Shutterstock<br />
          Niclas Krebs
        </p>

        <p>
          <strong>Copyright web design</strong><br />
          Niclas Joshua Krebs<br />
          Nazlı Duru Güngör
        </p>
      </section>
    </main>
  )
}
