import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const SITE_URL = 'https://deducia.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Deducia Inc.',
    template: '%s — Deducia Inc.',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  description:
    'Deducia builds intelligent software infrastructure — AI, communication, cloud and business systems — engineered in India for a global scale.',
  keywords: [
    'Deducia',
    'infrastructure',
    'AI',
    'email infrastructure',
    'cloud',
    'developer tools',
    'India technology company',
  ],
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Deducia — Infrastructure for what comes next',
    description:
      'Intelligent software infrastructure for businesses, developers and creators. Built in India, designed for the world.',
    siteName: 'Deducia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deducia — Infrastructure for what comes next',
    description:
      'Intelligent software infrastructure for businesses, developers and creators.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
