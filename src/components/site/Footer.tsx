'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 text-gray-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-100 transition-colors">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Second Life e.V.</h3>
            <p className="mt-2 text-sm opacity-80">
              Revolutionizing coastal cleanup with drones, AI, and volunteers.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide">Quick Links</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link href="/tide" className="hover:underline">TIDE</Link></li>
              <li><Link href="/missions" className="hover:underline">Missions</Link></li>
              <li><Link href="/operations" className="hover:underline">Operations</Link></li>
              <li><Link href="/our-team" className="hover:underline">Our Team</Link></li>
              <li><Link href="/code-of-conduct" className="hover:underline">Code of Conduct</Link></li>
              <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/data-access-portability" className="hover:underline">Data Access & Portability</Link></li>
              <li><Link href="/accessibility" className="hover:underline">Accessibility</Link></li>
              <li><Link href="/imprint" className="hover:underline">Imprint</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide">Connect</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href="mailto:media.secondlife.ev@gmail.com" className="hover:underline">Email Us</a></li>
              <li><a href="https://www.linkedin.com/company/second-life42" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/secondlife.ngo" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a></li>
              <li><a href="https://www.youtube.com/@SecondLifeE.V" target="_blank" rel="noreferrer" className="hover:underline">Youtube</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t pt-4 text-center text-xs opacity-70">
          © {new Date().getFullYear()} Second Life e.V. – All rights reserved.
        </div>
      </div>
    </footer>
  )
}
