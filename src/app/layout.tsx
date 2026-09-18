import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Logesh Elavarasan — Portfolio',
  description: 'Computer Science & Engineering student who enjoys turning ideas into real, usable software.',
  keywords: ['portfolio', 'software engineer', 'developer', 'Logesh Elavarasan'],
  authors: [{ name: 'Logesh Elavarasan' }],
  openGraph: {
    title: 'Logesh Elavarasan — Portfolio',
    description: 'Computer Science & Engineering student who enjoys turning ideas into real, usable software.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#050507',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans min-h-screen overflow-x-hidden">{children}</body>
    </html>
  )
}