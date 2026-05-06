import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Meliha Karac — Software Engineer',
  description:
    'I work across the stack, but the frontend is where I leave fingerprints. Five years across fintech, healthcare, adtech, and e-commerce.',
  keywords: ['software engineer', 'frontend engineer', 'react', 'next.js', 'typescript', 'node.js', 'aws'],
  authors: [{ name: 'Meliha Karac' }],
  openGraph: {
    title: 'Meliha Karac — Software Engineer',
    description: 'I work across the stack, but the frontend is where I leave fingerprints.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
