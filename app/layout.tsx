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
    'Frontend-deep full-stack engineer. Five years shipping production web apps in fintech, healthcare, adtech, and internal tooling. React, Next.js, TypeScript, Node.js, PostgreSQL.',
  keywords: ['software engineer', 'full-stack engineer', 'frontend engineer', 'react', 'next.js', 'typescript', 'node.js', 'postgresql', 'react native'],
  authors: [{ name: 'Meliha Karac' }],
  openGraph: {
    title: 'Meliha Karac — Software Engineer',
    description: 'I ship features end-to-end. Frontend-deep, full-stack capable, comfortable in regulated production.',
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
