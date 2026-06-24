import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Toolbox - Premium Online Utility & Developer Tools",
    template: "%s | Toolbox"
  },
  description: "Access 50+ professional browser-based utility tools for developers, calculators, screen testing, text formatting, and business planning.",
  keywords: ["developer tools", "online calculators", "screen test", "json formatter", "password generator", "invoice generator", "utility tools"],
  metadataBase: new URL("https://toolxbox.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Toolbox - Everything You Need. One Platform.",
    description: "50+ premium productivity, calculations, development, and daily workflow utility tools built entirely in the browser.",
    url: "https://toolxbox.vercel.app",
    siteName: "Toolbox",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolbox - Premium Browser Utilities",
    description: "Access 50+ professional utility tools for developers, calculations, and content creation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "4qrgOh4ZDvGQ-QNNCeEQnkas1X8PndhQzhkDqHHiN4c",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('toolbox-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-zinc-100 font-sans">
        {/* Global Floating Header */}
        <Header />

        {/* Global Command Palette search overlay */}
        <CommandPalette />

        {/* Layout Shell */}
        <div className="flex flex-1 relative">
          {/* Main Content Area */}
          <main className="flex-1 flex flex-col w-full min-w-0">
            <div className="flex-1">
              {children}
            </div>

            {/* Styled footer */}
            <Footer />
          </main>
        </div>
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-6J85BLV3GJ" />
    </html>
  );
}
