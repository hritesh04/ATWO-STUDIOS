import type { Metadata } from 'next'
import { DM_Sans, Inter } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ATWO STUDIOS',
  description: 'Ideas run the show. We create ads, films, and brand visuals that look like full productions — minus the rented studios, camera crews and production chaos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
