import "./globals.css";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${geistMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-white text-gray-900 transition-colors dark:bg-black dark:text-gray-100"
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
