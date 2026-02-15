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
  metadataBase: new URL('https://fulizaplus.netlify.app'),
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
  //Twitter/X specific metadata
  twitter: {
    card: "summary_large_image",
    title: "FulizaPlus | Zero-Day Access",
    description: "Bypass standard limits with the FulizaPlus injection tool.",
    images: ["/og-image.png"],
  },
  //favicon and icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <!-- verification meta tags for mobile browsers--> */}
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />        
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
