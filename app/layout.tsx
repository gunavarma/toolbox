/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
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
  maximumScale: 5,
  userScalable: true,
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
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
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-6J85BLV3GJ" />
    </html>
  );
}
