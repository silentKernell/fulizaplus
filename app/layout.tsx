import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Fuliza plus',
    default: "Fuliza Instant Upgrade - Boost Your Limit Now",
  },
  description: "Get instant Fuliza limit upgrades and financial flexibility in seconds.",
  keywords: ['Fuliza', 'M-Pesa', 'Credit Limit', 'Instant Loan', 'Kenya Finance'],
  openGraph: {
    title: 'Fuliza Instant Upgrade',
    description: 'Stop getting declined. Upgrade your Fuliza limit today.',
    url: 'https://fulizaplus.netlify.app',
    siteName: 'Fuliza Plus',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
