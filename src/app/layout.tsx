import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-white text-gray-900 transition-colors
                   dark:bg-black dark:text-gray-100"
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