import "./globals.css";
import Script from "next/script";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";

import { Instrument_Sans, Geist_Mono } from "next/font/google";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = {
  title: "Second Life e.V.",
  description:
    "Ocean & River Clean-Ups, Drone Operations, and Sustainability Missions.",
  icons: {
    icon: [
      { url: "/emblem-sl.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: ["/emblem-sl.png"],
    apple: [{ url: "/emblem-sl.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CH7G5M3956"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CH7G5M3956');
          `}
        </Script>

        {/* Cookiebot (App Router safe) */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="7137279f-56e3-49fa-9ecb-35653279a142"
          data-blockingmode="auto"
          strategy="afterInteractive"
        />
      </head>

      <body
        suppressHydrationWarning
        className="min-h-screen bg-white text-gray-900 transition-colors"
      >
        <ThemeProvider>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
